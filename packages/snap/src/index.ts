import {
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snap-types';
import {
  add0x,
  bytesToHex,
  hasProperty,
  isObject,
  Json,
  remove0x,
} from '@metamask/utils';
import { decode } from '@metamask/abi-utils';

const API_ENDPOINT =
  'https://www.4byte.directory/api/v1/signatures/?hex_signature=';

/* eslint-disable camelcase */
type FourByteSignature = {
  id: number;
  created_at: string;
  text_signature: string;
  hex_signature: string;
  bytes_signature: string;
};
/* eslint-enable camelcase */

/**
 * Get a message from the origin. For demonstration purposes only.
 *
 * @param originString - The origin string.
 * @returns A message based on the origin.
 */

export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_confirm` call failed.
 */

const BACKEND_URL = 'http://localhost:3000';

// stores transaction origin site
let originGlobal: string;

// origin, request, transaction
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      // store origin
      originGlobal = origin;
      return Promise.resolve();
    default:
      throw new Error('Method not found.');
  }
};

// Transaction handler
export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}) => {
  const insights: {
    type: string;
    params?: Json;
    status?: string;
    origin?: string;
    gasPrice?: string;
    gas?: string;
    to?: string;
    from?: string;
    value?: string;
    data?: string;
    chainId?: string;
    db_status?: string;
  } = { type: 'Unknow tx type' };
  if (
    !isObject(transaction) ||
    !hasProperty(transaction, 'data') ||
    typeof transaction.data !== 'string'
  ) {
    console.warn('Unknown tx type');
    return { insights };
  }
  // 0xa456ui97...
  const txData = remove0x(transaction.data);
  const funcSig = txData.slice(0, 8);

  const res = await fetch(`${API_ENDPOINT}${add0x(funcSig)}`, {
    method: 'get',
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Unable to fetch func call data');
  }

  const { results } = (await res.json()) as {
    results: FourByteSignature[];
  };

  const [functionTextSignature] = results
    .sort((a, b) => a.created_at.localeCompare(b.created_at))
    .map((val) => val.text_signature);

  if (!functionTextSignature) {
    console.warn('No defined function signature in registry');
    return { insights };
  }

  insights.type = functionTextSignature;

  const paramTypes = functionTextSignature
    .slice(
      functionTextSignature.indexOf('(') + 1,
      functionTextSignature.indexOf(')'),
    )
    .split(',');
  const decoded = decode(paramTypes, add0x(txData.slice(8)));
  insights.params = decoded.map(normalizeAbiValue);
  insights.origin = originGlobal;
  insights.chainId = chainId;
  insights.to = transaction.to as string;
  insights.from = transaction.from as string;
  insights.gas = transaction.gas as string;
  insights.value = transaction.value as string;
  insights.data = transaction.data as string;
  insights.nonce = '-';
  insights.gasPrice = '-';

  // function to request backend and send transaction insights
  const storeInsights = async () => {
    try {
      await fetch(`${BACKEND_URL}/save_insights`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(insights),
      });
    } catch (e) {
      console.error(e);
    }
  };

  await storeInsights();

  return { insights };

  /**
   * The ABI decoder returns certain which are not JSON serializable. This
   * function converts them to strings.
   *
   * @param value - The value to convert.
   * @returns The converted value.
   */
  function normalizeAbiValue(value: unknown): Json {
    if (Array.isArray(value)) {
      return value.map(normalizeAbiValue);
    }

    if (value instanceof Uint8Array) {
      return bytesToHex(value);
    }

    if (typeof value === 'bigint') {
      return value.toString();
    }

    return value as Json;
  }
};

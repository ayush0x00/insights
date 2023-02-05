import React from 'react'
import AppHeader from './Header'
import axios from "axios";
import { Button } from 'antd';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Row, Col } from 'antd';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import {
	add0x,
	bytesToHex,
	hasProperty,
	isObject,
	Json,
	remove0x,
} from '@metamask/utils';
import { decode } from '@metamask/abi-utils';

// Global constants
const API_KEY = "FGH2GQRYVUIRNZN9A8X27R4ES4X2Q6AEU9"
const VERIFY_API = "https://api.etherscan.io/api?module=contract&action=getabi&address="
const ADDRESS_TYPE_API = "https://api.etherscan.io/api?module=contract&action=getcontractcreation&contractaddresses="
const FOUR_BYTE_API = 'https://www.4byte.directory/api/v1/signatures/?hex_signature='

type FourByteSignature = {
	id: number;
	created_at: string;
	text_signature: string;
	hex_signature: string;
	bytes_signature: string;
};

const data = {
	"origin": "https://www.abc.net.au",
	"from": "0x2222222222222222",
	"to": "0x1111111111111111",
	"value": "0x0",
	"gas": "0x53573",
	"chainId": "eip155:1",
	"addressType": "contract",
	"whetherVerified": "true",
	"mlData": {
		"vulnarablities": [
			"vul1",
			"vul2"
		],
		"addresses": [
			"0x1111111111111111",
			"0x2222222222222222"
		]
	},
	"data": {
		"type": "function(params...)",
		"params": [
			["param1", "param2"],
			"bool"
		]
	}
}

// const targetDiv = document.getElementById("hiddenData");
// const btn = document.getElementById("toggle");

const Insights = () => {

	// btn.onclick = () => {
	// 	if (targetDiv.style.display !== "none") {
	// 		targetDiv.style.display = "none";
	// 	} else {
	// 		targetDiv.style.display = "block";
	// 	}
	// };

	React.useEffect(() => {
		loadInsights()
	}, [])

	const [insights, setInsights] = React.useState<any>([])



	const loadInsights = async () => {
		const origin = "http://localhost:8000"
		const addr = "0xe53b92bbf7ae51584fd79f89b6f0d4a14b4bcac3"
		try {
			const response = await axios.post('http://localhost:3000/insights', {
				walletAddress: addr,
				origin: origin
			});
			const insightList = response.data.sort((a: any, b: any) => {
				return a._id - b._id
			})
			const InsightObjList = []

			for (let i = 0; i < response.data.length; i++) {
				const funcData = await decodeData(insightList[i].data)
				const verifyAccountVal = await verifyAccount(insightList[i].to)
				const addressTypeVal = await addressType(insightList[i].to)
				let insightObj = await { ...response.data[i] }
				insightObj["funcDat"] = funcData
				insightObj["verifyAccountVal"] = verifyAccountVal
				insightObj["addressTypeVal"] = addressTypeVal
				InsightObjList.push(insightObj)
			}
			setInsights(InsightObjList)
			console.log("done")
		} catch (e) {
			console.log("Error -> " + e)
		}
	}

	const verifyAccount = async (ToAddress: String) => {
		try {
			const res = await axios.post(`${VERIFY_API}${ToAddress}&apikey=${API_KEY}`)
			return res.data.status
		} catch (e) {
			console.log("Error -> " + e)
		}
	}

	const addressType = async (ToAddress: any) => {
		try {
			const res = await axios.post(`${ADDRESS_TYPE_API}${ToAddress}&apikey=${API_KEY}`)
			//console.log(res.data.status)
			return res.data.status
		} catch (e) {
			//console.log("Error -> " + e)
		}
	}

	const decodeData = async (data: any) => {

		const _ret: {
			type?: String,
			params?: Json,
		} = {}

		const txData = remove0x(data);
		const funcSig = txData.slice(0, 8);

		const res = await fetch(`${FOUR_BYTE_API}${add0x(funcSig)}`, {
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
		}

		_ret.type = functionTextSignature;

		const paramTypes = functionTextSignature
			.slice(
				functionTextSignature.indexOf('(') + 1,
				functionTextSignature.indexOf(')'),
			)
			.split(',');
		const decoded = decode(paramTypes, add0x(txData.slice(8)));
		_ret.params = decoded.map(normalizeAbiValue);
		return _ret
	}

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

	const displayInsights = () => {
		console.log(insights)
	}
	

	return (
		<div id="insights" className="block insightBlock">
			<div className="container-fluid">
				<div className="titleHolder">
					<h2>Your Insight Transactions</h2>
					<p>Doorway to An ETH Based crypto-wallet </p>
				</div>
				<div>
					<Button type="primary" size="large" href="#" target="_blank">Demo Transaction</Button>
					<Button type="primary" size="large" target="_blank" onClick={displayInsights}>Show Transactions</Button>
				</div>
				<MDBCard alignment='center' className='insight-card hover-zoom hover-shadow border border-primary'>
					<MDBCardBody>
						<MDBCardTitle>{data.origin}</MDBCardTitle>
						<MDBRow>
							<MDBCol size='md'>
								{data.from}
							</MDBCol>
							<MDBCol size='md'>
								{data.value}
							</MDBCol>
							<MDBCol size='md'>
								{data.to}
								({data.addressType})
							</MDBCol>
						</MDBRow>
						<div id="hiddenData">
							<MDBRow>
								<MDBCol size='md'>
									{data.chainId}
									<br></br>
									{data.gas}
								</MDBCol>
								<MDBCol size='md'>
									{data.mlData.vulnarablities}
								</MDBCol>
								<MDBCol size='md'>
									{data.to}
								</MDBCol>
							</MDBRow>
						</div>
						<MDBBtn href='#' id="toggle">More Details</MDBBtn>
					</MDBCardBody>
				</MDBCard>
				<MDBCard alignment='center' className='insight-card hover-zoom hover-shadow border border-primary'>
					<MDBCardBody>
						<MDBCardTitle>{data.origin}</MDBCardTitle>
						<MDBRow>
							<MDBCol size='md'>
								{data.from}
							</MDBCol>
							<MDBCol size='md'>
								{data.value}
							</MDBCol>
							<MDBCol size='md'>
								{data.to}
								({data.addressType})
							</MDBCol>
						</MDBRow>
						<div>
							<MDBRow>
								<MDBCol size='md'>
									{data.chainId}
									<br></br>
									{data.gas}
								</MDBCol>
								<MDBCol size='md'>
									{data.mlData.vulnarablities}
								</MDBCol>
								<MDBCol size='md'>
									{data.to}
								</MDBCol>
							</MDBRow>
						</div>
						<MDBBtn href='#'>More Details</MDBBtn>
					</MDBCardBody>
				</MDBCard>
			</div>
		</div>
	)
}

export default Insights
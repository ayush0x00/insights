import React, { useContext } from 'react';
import { Button } from 'antd';
import { Carousel } from 'antd';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';

import {
  connectSnap,
  getSnap,
  sendHello,
  shouldDisplayReconnectButton,
} from '../utils';

const items = [
  {
    key: '1',
    title1: 'Doorway to ETH Based crypto.',
    content: 'A snap is a program that we run in an isolated environment that can customize the wallet experience. For example, a snap can add new APIs to MetaMask, add support for different blockchain protocols, or modify existing functionality using internal APIs.',
  },
  {
    key: '2',
    title1: 'Learn and work better together.',
    content: 'MetaMask is the first wallet to offer extensibility. Snaps will boost the rate of innovation not just in Ethereum, but the entire Web3 ecosystem. Now Web3 developers can use the full power of MetaMask and create entirely new types of dapps',
  },
  {
    key: '3',
    title1: 'Increase your skills and productivity .',
    content: 'Another interesting highlight about the Metamask wallet is that it simplifies transactions. You can enter the recipient address and the amount you want to send alongside a transaction fee and click on “Send” to send transactions.',
  },
]

enum TransactionConstants {
  // The address of an arbitrary contract that will reject any transactions it receives
  Address = '0x08A8fDBddc160A7d5b957256b903dCAb1aE512C5',
  // Some example encoded contract transaction data
  UpdateWithdrawalAccount = '0x83ade3dc00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000047170ceae335a9db7e96b72de630389669b334710000000000000000000000006b175474e89094c44da98b954eedeac495271d0f',
  UpdateMigrationMode = '0x2e26065e0000000000000000000000000000000000000000000000000000000000000000',
  UpdateCap = '0x85b2c14a00000000000000000000000047170ceae335a9db7e96b72de630389669b334710000000000000000000000000000000000000000000000000de0b6b3a7640000',
}


function AppHero() {

  const [state, dispatch] = useContext(MetaMaskContext);

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleSendHelloClick = async () => {

    // Send snap RPC request to store "origin" field
    try {
      await sendHello();
    } catch (e) {
      console.log(e)
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }

    // perform transaction 
    try {
      const [from] = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[];

      if (!from) {
        throw new Error('No accounts found');
      }

      const details = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from,
            to: TransactionConstants.Address,
            value: "0x0",
            data: TransactionConstants.UpdateWithdrawalAccount,
          },
        ],
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  return (
    <div id="hero" className="heroBlock ">
      <Carousel>
        {items.map(item => {
          return (
            <div key={item.key} className="container-fluid ">
              <div className="content">
                <div className='hero-content'>
                  <h3>{item.title1}</h3>
                  <p>{item.content}</p>
                  <div className="btnHolder">
                    <MDBRow>
                      <MDBCol size='md'>
                        <button  className='bttn hero-btn' onClick={handleConnectClick}>Connect</button>
                        <a href='/insights'><button  className="bttn hero-btn" >View Transaction</button></a>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
export default AppHero;


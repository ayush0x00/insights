import React from 'react';

import { Collapse, Button } from 'antd';

const { Panel } = Collapse;

function AppFaq() {
  return(
    <div id="faq" className="block faqBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Frequently Asked Questions</h2>
          {/* <p>Quidem reiciendis iure, aperiam blanditiis. Alias esse, nam, ea quam</p> */}
        </div>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="What is metamask?" key="1">
            <p>MetaMask is a browser plugin that serves as an Ethereum wallet, and is installed like any other browser plugin. Once it's installed, it allows users to store Ether and other ERC-20 tokens, enabling them to transact with any Ethereum address.</p>
          </Panel>
          <Panel header="How to get started with Metamask?" key="2">
            <p>MetaMask is one of the simpler Ethereum wallets and dapp browsers to use, and can be set up in a couple of minutes in most cases.To use MetaMask, you will need either Chrome, a Chromium-based browser such as Brave, or Firefox.</p>
          </Panel>
          <Panel header="Why do I need cryptocurrency to use Metamask?" key="3">
            <p>Technically, no. You can accept signature requests from sites without any value in your account. Having cryptocurrencies in your MetaMask account (such as ETH, ERC-20, ERC-721, or ERC-1155 tokens) will allow you to invest, trade, play games, own unique digital items (NFT collectibles), and much more</p>
          </Panel>
          <Panel header="What tokens does metamask support?" key="4">
            <p>ETH and any ETH-based token (ERC-20, ERC-721, and more). You may need to manually import some tokens to see them within MetaMask.</p>
          </Panel>
          <Panel header="How can I change my password?" key="5">
            <p>Usu dolorem ceteros te. Veri exerci ne vix, modo ignota an qui. Ne oblique antiopam quo. Ex quem saepe cum, temporibus comprehensam qui at. Aliquip habemus fierent qui at. No facete omnesque argumentum sea, est tale error nihil ad.</p>
          </Panel>
          <Panel header="How to import wallet into Metamask?" key="6">
            <p>With your wallet’s Secret Recovery Phrase. MetaMask can only load one Secret Recovery Phrase at a time. If you already have a wallet, select the “import Secret Recovery Phrase” option when you set up your wallet</p>
          </Panel>
        </Collapse>
        <div className="quickSupport">
          <h3>Want quick support?</h3>
          <p>MetaMask is the first wallet to offer extensibility. Snaps will boost the rate of innovation not just in Ethereum, but the entire Web3 ecosystem. Now Web3 developers can use the full power of MetaMask and create entirely new types of dapps. Any developer can create a Snap, and users will be able to choose which Snaps to utilize and integrate into their wallet in the future.</p>
          <button className='bttn'><i className="fas fa-envelope"></i> Email your question</button>
        </div>
      </div>
    </div>  
  );
}

export default AppFaq;
import React from 'react';
import { Row, Col } from 'antd';

const items = [
  {
    key: '1',
    icon: <i className="fa-solid fa-book-open"></i>,
    title: 'Open Source',
    content: 'MetaMask software is open source. The wallet does not use two-factor authentication or multisignature access.',
  },
  {
    key: '2',
    icon: <i className="fa-solid fa-file-contract"></i>,
    title: 'Online Contract Analysis',
    content: 'Interact with a smart contract calling a function, MetaMask will initiate the transaction by calling the eth_sendTransaction method',
  },
  {
    key: '3',
    icon: <i className="fa-solid fa-check"></i>,
    title: 'Simplified Workflow',
    content: 'Each step in a workflow has a specific step before it and a specific step after it.',
  },
]

function AppAbout() {
  return (
    <div id="about" className="block aboutBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>About Us</h2>
          <p>Doorway to An ETH Based crypto-wallet </p>
        </div>
        <div className="contentHolder">
          <p> MetaMask focuses on connecting with dApps or smart contracts. You can click on the “Connect to Wallet” button or a similar option on the decentralized app platform you want to use. Once you have clicked on the button, you will discover a prompt asking you for permission to connect the dApp to your wallet. When you connect with a decentralized application, it can view your public addresses. However, they could not access your funds. Interestingly, dApps connect automatically to the Metamask wallet, thereby ensuring a simplified connection process.</p>
        </div>
        <Row gutter={[16, 16]}>   
          {items.map(item => {
            return (
              <Col md={{ span: 8 }} key={item.key}>
                <div className="content">
                  <div className="icon">
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default AppAbout;


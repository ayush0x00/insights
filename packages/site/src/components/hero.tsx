import React from 'react';
import { Button } from 'antd';
import { Carousel } from 'antd';

const items = [
  {
    key: '1',
    title1: 'Doorway to ETH Based crypto.',
    content: 'A snap is a program that we run in an isolated environment that can customize the wallet experience. For example, a snap can add new APIs to MetaMask, add support for different blockchain protocols, or modify existing functionality using internal APIs.',
  },
  {
    key: '2',
    title1: 'Doorway to ETH Based crypto.',
    content: 'MetaMask is the first wallet to offer extensibility. Snaps will boost the rate of innovation not just in Ethereum, but the entire Web3 ecosystem. Now Web3 developers can use the full power of MetaMask and create entirely new types of dapps',
  },
  {
    key: '3',
    title1: 'Doorway to ETH Based crypto.',
    content: 'Another interesting highlight about the Metamask wallet is that it simplifies transactions. You can enter the recipient address and the amount you want to send alongside a transaction fee and click on “Send” to send transactions.',
  },
]

function AppHero() {
  return (
    <div id="hero" className="heroBlock ">
      <Carousel>
        {items.map(item => {
          return (
            <div key={item.key} className="container-fluid ">
              <div className="content ">
                <div className="hero-content">
                  <h3>{item.title1}</h3>

                  <p>{item.content}</p>
                  <div className="btnHolder">
                    <Button type="primary" size="large">Connect</Button>
                    <Button type="primary" size="large" href="/insights" target="_blank">View Transaction</Button>
                    {/* <Button size="large"><i className="fas fa-desktop"></i> Watch a Demo</Button> */}
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


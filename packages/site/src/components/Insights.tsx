import React from 'react'
import AppHeader from './Header'
import axios from "axios";
import { Button } from 'antd';

import { Row, Col } from 'antd';


const Insights = () => {

  const loadInsights = async () => {
		const origin = "http://localhost:8000"
		const addr = "0xe53b92bbf7ae51584fd79f89b6f0d4a14b4bcac3"
		try{
			const response = await axios.post('http://localhost:3000/insights', {
				walletAddress: addr, 
				origin: origin
			});
			//const response = await axios.post('https://interiit-blockchain-trial.onrender.com/insights', {addr, origin})
			// const response = await fetch('https://interiit-blockchain-trial.onrender.com/insights', {
			// const response = await fetch('http://localhost:3000/insights', {
			// 	method: "post",
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({walletAddress: addr, origin: origin}),
			// 	// mode: "no-cors"
			// })
			console.log(response.data.sort((a: any, b: any) => (
				a._id > b._id ? -1:1
			))[0])
		} catch(e){
			console.log("Error -> " + e)
		}
	}

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
	  <Button type="primary" size="large" href="#" target="_blank">Demo Transaction</Button>

	</div>
  </div>
  )
}

export default Insights
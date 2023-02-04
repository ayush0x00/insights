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
    <div>
      <button>Demo transaction</button>

    </div>
  )
}

export default Insights
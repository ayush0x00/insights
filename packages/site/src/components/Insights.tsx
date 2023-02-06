import axios from "axios";
import React, { useState } from 'react';
import { Button } from 'antd';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Data from './insightData.json';
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

console.log(Data.length)

// const toggle= new Array(Data.length).fill(false)


const Insights = () => {
	// const data = ["first", "second", "third"];

	const [toggle, setToggle] = useState([
		{ id: 0, name: false },
		{ id: 1, name: false },
		{ id: 2, name: false },
		{ id: 3, name: false },
		{ id: 4, name: false },
		{ id: 5, name: false },
		{ id: 6, name: false },
		{ id: 7, name: false },
		{ id: 8, name: false },
		{ id: 9, name: false },
		{ id: 10, name: false },
		{ id: 11, name: false },
		{ id: 12, name: false },
		{ id: 13, name: false },
	]);
	console.log("initial", toggle);
	const [showResults1, setShowResults1] = React.useState(false)
	const [showResults2, setShowResults2] = React.useState(false)
	const onClick1 = () => {
		if (showResults1 == false) {
			setShowResults1(true)
		}
		else {
			setShowResults1(false)
		}
	}
	const onClick2 = () => {
		if (showResults2 == false) {
			setShowResults2(true)
		}
		else {
			setShowResults2(false)
		}
	}


	const ToggleItem = ({ discription, id }) => {
		// console.log(discription.origin)
		// const [toggleThisElement, setToggleThisElement] = useState(false);
		function handleOnClick() {
			console.log("hello")
			console.log("before", toggle[id])
			const newToggle = [...toggle];
			newToggle[id].name = !newToggle[id].name;
			setToggle(newToggle);
			// toggle[id] = !toggle[id]
			console.log("after", toggle[id])
		}

		return (
			<div className="single-history" key={id}>
				<MDBCard alignment='center' className='insight-card hover-zoom hover-shadow border border-primary'>
					<MDBCardBody>

						<MDBCardTitle className="CardMainHeading">{discription.origin}</MDBCardTitle>
						<br />
						<MDBRow>
							<MDBCol size='md'>
								<p className="CardMainHeading">From:</p> {discription.from}
							</MDBCol>
							<MDBCol size='md'>
								<p className="CardMainHeading">Value:</p>
								{discription.value}
								{(discription.addressTypeVal == 1) ? " (Contract Address) " : " (Wallet Address)"}

							</MDBCol>
							<MDBCol size='md'>
								<p className="CardMainHeading">To:</p>
								{discription.to}
							</MDBCol>
						</MDBRow>
						<br />
						{(toggle[id].name) ? <div id="hiddenData">
							<MDBRow>
								<MDBCol size='md'>
									<p className="CardMainHeading">ChainId:</p> {discription.chainId}
									<br></br><br />
									<p className="CardMainHeading">Gas:</p> {discription.gas}
								</MDBCol>
								<MDBCol size='md'>
									<p className="CardMainHeading">Function signature:</p> {discription.funcDat.type}<br />

								</MDBCol>
								<MDBCol size='md'>
									<p className="CardMainHeading">Function parameters:</p>
									{discription.funcDat.params[0][0]} <br /> {discription.funcDat.params[0][1]}
									{/* <p className="CardMainHeading">ML Data:</p>    {discription.mlData.vulnarablities} */}
									{/* <p className="CardMainHeading">Your address:</p>   {discription.to} */}
								</MDBCol>
							</MDBRow>
						</div > : null}

						{(toggle[id].name) ?
							<MDBBtn href='#' onClick={handleOnClick}>Less Details</MDBBtn> :
							<MDBBtn href='#' onClick={handleOnClick}>More Details</MDBBtn>
						}

					</MDBCardBody >
				</MDBCard >
			</div >
		);
	};

	React.useEffect(() => {
		// initializeToggle();
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
					<Button type="primary" size="large" href="#" target="_blank" className="bttn">Demo Transaction</Button>
					{/* <Button type="primary" size="large" target="_blank" onClick={displayInsights}>Show Transactions</Button> */}
				</div>

				{Data.map((d, id) => {
					return <ToggleItem id={id} discription={d} />;
				})}

				{/* <MDBCard alignment='center' className='insight-card hover-zoom hover-shadow border border-primary'>
					<MDBCardBody>

						<MDBCardTitle className="CardMainHeading">{data.origin}</MDBCardTitle>
						<br />
						<MDBRow>
							<MDBCol size='md'>
								<p className="CardMainHeading">From:</p> {data.from}
							</MDBCol>
							<MDBCol size='md'>
								<p className="CardMainHeading">Value:</p>
								{data.value}
							</MDBCol>
							<MDBCol size='md'>
								<p className="CardMainHeading">To:</p>
								{data.to}
								({data.addressType})
							</MDBCol>
						</MDBRow>
						<br />
						{showResults1 ?
							<div id="hiddenData">
								<MDBRow>
									<MDBCol size='md'>
										<p className="CardMainHeading">ChainId:</p> {data.chainId}
										<br></br><br />
										<p className="CardMainHeading">Gas:</p> {data.gas}
									</MDBCol>
									<MDBCol size='md'>
										<p className="CardMainHeading">ML Data:</p>    {data.mlData.vulnarablities}
									</MDBCol>
									<MDBCol size='md'>
										<p className="CardMainHeading">To:</p>   {data.to}
									</MDBCol>
								</MDBRow>
							</div> : null}
						{showResults1 ?
							<MDBBtn href='#' onClick={onClick1}>Less Details</MDBBtn> :
							<MDBBtn href='#' onClick={onClick1}>More Details</MDBBtn>
						}
					</MDBCardBody>
				</MDBCard> */}

			</div>
		</div>
	)
}


export default Insights
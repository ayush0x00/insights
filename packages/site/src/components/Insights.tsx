import axios from "axios";
import React, { useState } from 'react';
import {  Spin } from 'antd';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import dData from './insightData.json';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import {
	add0x,
	bytesToHex,
	hasProperty,
	isObject,
	Json,
	remove0x,
} from '@metamask/utils';
import {
	UpCircleOutlined ,
	CloseCircleOutlined,
	CheckCircleOutlined,
	DownCircleOutlined
} from '@ant-design/icons';
import { decode } from '@metamask/abi-utils';
import {ethers} from 'ethers'


// Global constants
const API_KEY = "FGH2GQRYVUIRNZN9A8X27R4ES4X2Q6AEU9"
const VERIFY_API = "https://api.etherscan.io/api?module=contract&action=getabi&address="
const ADDRESS_TYPE_API = "https://api.etherscan.io/api?module=contract&action=getcontractcreation&contractaddresses="
const FOUR_BYTE_API = 'https://www.4byte.directory/api/v1/signatures/?hex_signature='
const ML_API = 'http://localhost:1234'
const ETH_NET = 'mainnet'
const API_KEY_2 = '2eb963ef187f487086ed44e58a0aacf3'

let Data = dData

const provider= new ethers.InfuraProvider(ETH_NET, API_KEY_2);

type FourByteSignature = {
	id: number;
	created_at: string;
	text_signature: string;
	hex_signature: string;
	bytes_signature: string;
};


const Insights = () => {
	// console.log(provider.getCode("0x08a8fdbddc160a7d5b957256b903dcab1ae512c5"))
	const initialToggle = [
		{ id: 0, name: false }
	];

	for (let i = 1; i < Data.length; i++) {
		initialToggle.push({ id: i, name: false });
	}

	const [toggle, setToggle] = useState(initialToggle);

	const ToggleItem = ({ discription, id }) => {
		function handleOnClick() {
			const newToggle = [...toggle];
			newToggle[id].name = !newToggle[id].name;
			setToggle(newToggle);
		}
		const Vulnerabilty =
			<div>
				<div>Access Control: {predRes["access-control"]}</div>
				<div>Arithmetic: {predRes["arithmetic"]}</div>
				<div>Other: {predRes["other"]}</div>
				<div>Safe: {predRes["safe"]}</div>
				<div>Reentrancy: {predRes["reentrancy"]}</div>
				<div>Unchecked Calls: {predRes["unchecked-calls"]}</div>
			</div>
		

		const addresses = ml_addresses.map((item) =>
			<div>{item}</div>
		);
		const parameters = discription.funcDat.params[0].map((item) =>
			<div>{item}</div>
		);
		const fetchBtn=
		<button onClick={()=>printMlData(insights[id].to)} className="bttn" style={{padding:"5px 10px"}} >{loader==false? "Fetch ML Data": "Analyzing..."}</button>

		return (
			<div className="insight-card " key={id}>
				<MDBCard alignment='center' className='hover-zoom'>
					<MDBCardBody>

						<MDBCardTitle className="CardMainHeading">{discription.origin}
							{(discription.verifyAccountVal == 1) ? <CheckCircleOutlined className="Icons" title="Verified account" style={{ color: 'green' }} /> : <CloseCircleOutlined  className="Icons" title="Not verified account"  style={{color: 'red' }} />}
						</MDBCardTitle>
						<br />
						<MDBRow>
							<MDBCol size='md'>
								<p className="CardMainHeading">From:</p> {discription.from}
							</MDBCol>
							<MDBCol size='md'>
								<p className="CardMainHeading">Value:</p>
								{parseInt(discription.value, 16)}
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
									<p className="CardMainHeading">Address type:</p> {(discription.addressTypeVal == 1) ? " (Contract Address) " : " (Wallet Address)"}
									<br></br><br />
									<p className="CardMainHeading">Gas:</p> {parseInt(discription.gas, 16) } Wei<br /><br />
									<p className="CardMainHeading">ChainId:</p> {discription.chainId}
								</MDBCol>
								<MDBCol size='md'>
									<p className="CardMainHeading">Function signature:</p> {discription.funcDat.type + " " +discription.funcDat.params[1]} <br></br><br />
									<p className="CardMainHeading">Function parameters:</p>
									{parameters}

								</MDBCol>
								<MDBCol size='md'>
									{ml_addresses.length==0 ?fetchBtn
									:<div>
										<p className="CardMainHeading">Vulnerabilties:</p>  {Vulnerabilty}<br />
										<p className="CardMainHeading">Found addresses of Contract:</p>   {addresses}
									</div>}
									
								</MDBCol>
							</MDBRow>
						</div > : null}

						{(toggle[id].name) ?
							<button onClick={handleOnClick} className="bttn">Less Details <UpCircleOutlined /></button> :
							<button onClick={handleOnClick} className="bttn">More Details<DownCircleOutlined /></button>
						}
					</MDBCardBody >
				</MDBCard >
			</div >	
		);
	};
	
	const [loader, setLoader] = React.useState(false)

	React.useEffect(() => {
		// initializeToggle();
		loadInsights()
	}, [])

	const [insights, setInsights] = React.useState<any>([])
	const [ml_addresses, setMl_addresses] = React.useState([])
	const [predRes, setPredRes] = React.useState<[]>([])

	const printMlData = async(addr: string) => {
		setLoader(true)
		const response = await loadMlData(addr)
		setMl_addresses(response.addresses_found)
		setPredRes(response.predRes)
		setLoader(false)
		console.log(ml_addresses)
		console.log(response.predRes["access-control"])
	}
	
	const loadInsights = async () => {
		const origin = "http://localhost:8000"

		const [from] = (await window.ethereum.request({
			method: 'eth_requestAccounts',
		  })) as string[];
	
		  if (!from) {
			throw new Error('No accounts found');
		  }
		  const addr = from
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
	
	const loadMlData = async (addr: string) => {
        try {
			const byteAddr = ethers.getAddress(addr)
            const _ret = await provider.getCode(byteAddr)
            const response = await axios.post('http://localhost:1234/', {
                bytecode: _ret
            });
            console.log(response)
			return response.data
        }catch (e) {
            console.error(e)
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
		setLoader(false)
	}

	return (
		<div id="insights" className="block insightBlock">
			<div className="container-fluid">
				<div className="titleHolder">
					<h2>Your Insight Transactions</h2>
					<p>Doorway to An ETH Based crypto-wallet </p>
					{insights.length==0? <div className="container-fluid" style={{padding:"20vh"}}> <Spin tip="Loading" className="spin" size="large">
      </Spin></div>:null}
				</div>
				{insights.length == 0 ?  null:
						insights.map((d, id) => {
						return <ToggleItem id={id} discription={d} />;})
				}

			</div>
		</div>
	)
	
}


export default Insights
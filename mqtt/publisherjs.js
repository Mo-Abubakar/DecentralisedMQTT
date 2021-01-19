// MQTT publisher
var mqtt = require("mqtt");
var Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");
// Show web3 where it needs to look for the Ethereum node
let connected = true;
const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "entity",
        type: "address",
      },
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "adminRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "entity",
        type: "address",
      },
      {
        internalType: "string",
        name: "topic",
        type: "string",
      },
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "assignRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "remove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "valueOfNonce",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddedToWhitelist",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_esp32add",
        type: "address",
      },
    ],
    name: "generateToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "RemovedFromWhitelist",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "generatedToken",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "entity",
        type: "address",
      },
      {
        internalType: "string",
        name: "topic",
        type: "string",
      },
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "unassignRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "verification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "verified",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "authentications",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "entity",
        type: "address",
      },
      {
        internalType: "string",
        name: "topic",
        type: "string",
      },
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "isAssignedRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "isWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "randumNumber",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const addr = "smart contract address";

const send = (userAdd) => {
  // connect to Infura node
  const url = "https://rinkeby.infura.io/v3/your-Infura";

  const addressFrom = "publisher's Ethereum address";
  const privateKey = "Private key";

  const provider = new Provider(privateKey, url);
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(abi, addr);
    contract.methods
      .generateToken(userAdd)
      .send({ from: addressFrom })
      .then((r) => {
        console.log("token sent from broker");
      }).catch(e => {console.log(e)});

};

const event = () => {
    let web3 = new Web3(
      // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
      new Web3.providers.WebsocketProvider(
        "wss://rinkeby.infura.io/ws/v3/your-Infura"
      )
    );
    contract = new web3.eth.Contract(abi, addr);
    // console.log("verify");
    if(connected){
        contract.events.generatedToken((err, events) => {
        console.log("token Recived in publish:", events.returnValues[1]);
        verify(events.returnValues[1]);
        })
    }
  
};
event();

const verify = (number) => {
  // connect to Infura node
    console.log('verify function run')
    const url = "https://rinkeby.infura.io/v3/your-Infura";

    const addressFrom = "publisher's Ethereum address";
    const privateKey = "Private key";

    const provider = new Provider(privateKey, url);
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(abi, addr);
    contract.methods
      .verification(number)
      .send({ from: addressFrom ,gas: 5000000})
      .then((r) => {
        console.log("veirification sent from publish");
        connected = false;
      }).catch(e => {console.log(e)});
  } 

const options = {
  connectTimeout: 4000,

  // Authentication
  clientId: "publish",
  username: "publisher's public address",
  //keepalive: 60,
  clean: true,
};
// WebSocket connect url
const WebSocket_URL = "ws://localhost:3000";

var client = mqtt.connect(WebSocket_URL, options);
var topic = "topic1";
var message = "Hi this message is from a nodejs client (publisher1) to topic1";


// send('publisher's public address')

client.on("connect", () => {
  setInterval(() => {
    console.log("from Publish");
    client.publish(topic, message);
    console.log("Message sent!", message);
    // send('publisher's public address')
  }, 5000);
});

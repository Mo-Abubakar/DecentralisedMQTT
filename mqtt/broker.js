// Require Web3 Module
var Web3 = require("web3");
var Tx = require("ethereumjs-tx").Transaction;
const Provider = require("@truffle/hdwallet-provider");
// Show web3 where it needs to look for the Ethereum node

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
const addr = "Your smart contract address";
let uportAddress;
let conneced = true;
// Write to the console the script will run shortly
//console.log('Connecting .....');

//mosca MQTT broker Websocket

var mosca = require("mosca");
var settings = {
  http: {
    port: 3000,
    bundle: true,
  },
};

// Accepts the connection if the user is authenticated via the smart contract
var authenticate = function (client, username, password, callback) {
  console.log("userName", username, "Client", client.id);
  uportAddress = username;
  send(username);
  try {
    let web3 = new Web3(
      // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
      new Web3.providers.WebsocketProvider(
        "wss://rinkeby.infura.io/ws/v3/Your-Infura"
      )
    );
    contract = new web3.eth.Contract(abi, addr);
    // console.log("verify");

    contract.events.verified((err, events) => {
      console.log("verify");
      // console.log('verify event', events);
      bool = events.returnValues[2];
      if (bool) {
        
        console.log("verified");
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  } catch (e) {
    console.log(e);
  }
  //  clientId.user = username;
  // callback(null, authorized);
};

const send = (userAdd) => {
  // connect to Infura node
  const url = "https://rinkeby.infura.io/v3/Your-Infura";

  const addressFrom = "The broker's Ethereum address";
  const privateKey = "Private key";

  const provider = new Provider(privateKey, url);
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(abi, addr);
    if(conneced){
      conneced = false
      console.log('generating token in broker')
      contract.methods
        .generateToken(userAdd)
        .send({ from: addressFrom })
        .then((r) => {
          console.log("token sent from broker");
          setTimeout(() => {
            conneced = true;    
            console.log('value changed');        
          }, 9000);  
        
        }).catch(e => {console.log(e)});
      }
};

// The publish authorisation process, which is via the smart contract

var authorizePublish = function (client, topic, payload, callback) {
  // console.log('client',client);

    const url = "https://rinkeby.infura.io/v3/Your-Infura";

    const addressFrom = "The broker's Ethereum address";
    const privateKey = "Private key";

    const provider = new Provider(privateKey, url);
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(abi, addr);

    console.log("checking assign role");
    contract.methods
      .isAssignedRole(uportAddress, topic, "publish")
      .then((r) => {
        if (!r) {
          callback(null, true);
        }
      }).catch(e => {console.log(e)})
 
};

// The subscribe authorisation process, which is via the smart contract

var authorizeSubscribe = function (clientId, topic, callback) {
  const url = "https://rinkeby.infura.io/v3/11b4dff1ae1a4556b741e9fe2e81bdf4";

  const addressFrom = "the broker's Ethereum address";
  const privateKey =   "The private key";

  const provider = new Provider(privateKey, url);
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(abi, addr);

  contract.methods.isAssignedRole(uportAddress, topic, "subscribe").then((r) => {
      if (!r) {
        callback(null, true);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};


// here we start mosca
var server = new mosca.Server(settings);
server.on("ready", setup);

// fired when the mqtt server is ready
function setup() {
  server.authenticate = authenticate;
  server.authorizePublish = authorizePublish;
   server.authorizeSubscribe = authorizeSubscribe;
  console.log("Mosca server is up and running");
}

// fired when a client is connected
server.on("clientConnected", function (client) {
  console.log("client connected", client.id);
});

// fired when a message is received
server.on("published", function (packet, client) {
  if (packet.cmd === "publish") {
    //Qui uso mongo DB
    console.log("Published: ", packet.payload.toString("utf8"));
  }
});

// fired when a client subscribes to a topic
server.on("subscribed", function (topic, client) {
  console.log("subscribed : ", topic);
});

// fired when a client unsubscribes to a topic
server.on("unsubscribed", function (topic, client) {
  console.log("unsubscribed : ", topic);
});

// fired when a client is disconnecting
server.on("clientDisconnecting", function (client) {
  console.log("clientDisconnecting : ", client.id);
});

// fired when a client is disconnected
server.on("clientDisconnected", function (client) {
  console.log("clientDisconnected : ", client.id);
});

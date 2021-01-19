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
const addr = "the smart contract address";
let value;
let bool = false;
window.onload = () => {
  let web3 = new Web3(
    // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
    new Web3.providers.WebsocketProvider(
      "wss://rinkeby.infura.io/ws/v3/Your-Infura"
    )
  );
  contract = new web3.eth.Contract(abi, addr);

  contract.events.generatedToken((err, events) => {
    value = events.returnValues[1];
    console.log('token recived in broker', value);
    // if(!bool) {
      connectCOntract(value);
    // }
  });
};

var mqtt;
var reconnectTimeout = 2000;
var host = "192.168.4.107"; //change this
var port = 3000;

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.

  console.log("Connected ");
  mqtt.subscribe("topic1");
  message = new Paho.MQTT.Message("This message from new1.html to topic1");
  message.destinationName = "topic1";
  mqtt.send(message);
}
function MQTTconnect() {
  console.log("connecting to " + host + " " + port);
  mqtt = new Paho.MQTT.Client(host, port, "new1.html");
  console.log("connecting to " + host);
  console.log(clientID);
  var options = {
    //useSSL: true,
    userName: clientID,
    onSuccess: onConnect,
  };

  mqtt.connect(options); //connect
}

function connectCOntract(number) {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "http://rinkeby.infura.io/v3/Your-Infura"
    )
  );

  const Connect = window.uportconnect;
  const uport = new Connect("MyDApp");

  const connect = new Connect("MyDApp", { network: "rinkeby" });
  const provider = connect.getProvider();

  const contract = connect.contract(abi).at(addr);
  const req = "verification";

  console.log('sending verification req.')
  contract.verification(number).then(console.log); 

  connect.onResponse(req).then((payload) => {
    // const address = connect.address
    // const did = connect.did
    console.log(payload);
    txId = payload.payload;
    // console.log(tx);
    // console.log(address,did);
  });
}

//////////////////////////////
//  Configure connect object
/////////////////////////////

const Connect = window.uportconnect;
const uport = new Connect("BIoT");

var user = {};

const reqID = "disclosureReq";

uport.requestDisclosure({ verified: ["BIoT"] });

uport.onResponse("disclosureReq").then((res) => {
  //json = JSON.stringify(res.payload)
  json = res.payload;
  userDID = json.BIoT.DID;
  useradd = json.BIoT.add;
  username = json.BIoT.Name;
  usertopic = json.BIoT.Topic;
  clientID = json.BIoT.UserID;
  pubAdd = json.BIoT.Publisher_Add;
  subAdd = json.BIoT.Subsceriber_Add;
  issuerDID = json.BIoT.Issuer_DID;

  console.log(json);
  //document.querySelector('#msg').innerHTML = "Congratulations you are now `logged in`.  Here is the response:  " + username +
  document.writeln("<p>User DID:  " + userDID + "</p>");
  document.writeln("<p>User Name:  " + username + "</p>");
  document.writeln("<p>Topic:  " + usertopic + "</p>");
  document.writeln("<p>Client: " + clientID + "</p>");
  document.writeln("<p>Publisher Address: " + pubAdd + "</p>");
  document.writeln("<p>Subscriber Address: " + subAdd + "</p>");
  document.writeln("<p>Issuer Address " + issuerDID + "</p>");

  abc();
});

import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [amount,setAmount] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    setAmount(Number(amount) < 0 ? 0 : Number(amount));
    if (atm) {
      let tx = await atm.deposit(amount);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    setAmount(Number(amount) < 0 ? 0 : Number(amount));
    if (atm) {
      let tx = await atm.withdraw(amount);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Account: {account}</p>
        <p>Balance: {balance} ETH</p>
        <form>
      <   label>Enter ether amount:
          <input
            type="text" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          </label>
        </form>
        <button onClick={deposit}>Deposit {amount} ETH</button>
        <button onClick={withdraw}>Withdraw {amount} ETH</button>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header>
        <h1>WELCOME TO Avengers ATM </h1>
        <h1>DONATE TO AVENGERS</h1>
      </header>
      {initUser()}
      <style jsx>
        {`
          .container {
            text-align: center;
            background-color: black;
            background-size: cover;
            color:black ;
            font-family: "Times New Roman", serif;
            border: 1px solid black;
            border-radius: 20px;
            background-image: url("https://c4.wallpaperflare.com/wallpaper/275/717/310/avengers-infinity-war-superheroes-cast-4k-8k-wallpaper-preview.jpg");
            height: 700px;
            width: 1500px;
            opacity: 0.9;
            font-weight: 900
          }

          header {
            padding: 120px;
          }
        `}
      </style>
    </main>
  )
}

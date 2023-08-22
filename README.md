# Smart Contract Management-ETH+  AVAX
It is a React component that allows users to interact with an Ethereum smart contract called `EtherCalculator`. It enables users to connect their MetaMask wallet, `check their balance`, `deposit funds`, and `withdraw funds`. The code utilizes the ethers.js library to interact with the Ethereum blockchain.
## Description
The code defines a React component named App, which contains the logic and UI for the application. It imports the necessary dependencies, including the CSS file, ethers.js library, and the JSON file of the smart contract ABI.  

The component initializes state variables using the `useState` hook to manage the user's balance, deposit amount, and withdrawal amount. It also uses the `useEffect` hook to call the `connectWallet` function when the component mounts. The connectWallet function checks for the presence of the MetaMask extension, enables it, and establishes a connection with the user's wallet. It retrieves the user's balance from the smart contract and updates the state.  

The component defines two functions, `handleDeposit` and `handleWithdraw`, to handle the deposit and withdrawal actions respectively. These functions interact with the EtherCalculator smart contract using ethers.js.
## Geting Started
### Installation
**Step 1:** First, make the clone of the respository by using following command.          +
```
git clone https://github.com/lavanishchaudhary/Smart-Contract-Management---ETH-AVAX.git
```

**Step 2:** Open your terminal or command prompt and navigate to the directory where you want to create your project.

**Step 3:** After the project is created, navigate to the project directory.       

**Step 4:** Install all required dependencies
### Executing program
 **Step 1:** Go to root directory. In terminal, run the following command to install project dependencies.
 ```
npm i
```

**Step 2:** Set up a local blockchain network by using this command.
```
npx hardhat node
```

**Step 3:** Deploy smart contracts to the local Ethereum network.
```
npx hardhat run scripts/deploy.js --network localhost
```

**Step 4:** Update contract address.           

**Step 5:** Go to frontend directory. Install the project dependencies and start development server.
```
npm i
```
```
npm start
```
## Authors
Metacrafter Student   
Navdeep
## License
This project is licensed under the MIT License.

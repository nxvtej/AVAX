// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Donate(uint256 amount,address payable reciever);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        balance += _amount;
        emit Deposit(_amount);
    }

     function donate(uint256 donateAmount , address payable reciever) public payable{    
        balance = balance - donateAmount;
        emit Donate(donateAmount , reciever );
    }
}

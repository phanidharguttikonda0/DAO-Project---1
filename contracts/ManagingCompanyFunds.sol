// SPDX-License-Identifier: MIT
// smart contract Bytecode size -> 15.7kb
pragma solidity ^0.8.21 ;

import "contracts/Company.sol" ;

contract ManagingCompanies {

    mapping (address => address) private EachMemberContractAddress ;


    modifier MinBalance() {
        require(msg.value >= 2 ether, "Min two Ether Funds should be Transferred in order to be an Comapany, one ether for Service") ;
        _ ;
    }

    function setCompany(address[] memory boardMembers,address CEO, uint _acceptance) external payable MinBalance(){
        address contractAddress = address (new Company(boardMembers, CEO, _acceptance)) ;
        EachMemberContractAddress[CEO] = contractAddress ;
        for(uint i = 0 ; i < boardMembers.length ; i++){
           EachMemberContractAddress[ boardMembers[i] ] = contractAddress ;
        }
    }

    // If an address already has the an contractAddress and tries to create another ContractAddress, The old Contract will disappear" 
    function getCompanyAddress(address member) external view returns(address){
        return EachMemberContractAddress[member] ;
    }

}
// SPDX-License-Identifier: MIT
// smart contract Bytecode size -> 15.7kb
pragma solidity ^0.8.21 ;
import "hardhat/console.sol";
import "contracts/Company.sol" ;

contract ManagingCompanies {

    mapping (address => address) private EachMemberContractAddress ;


    modifier MinBalance() {
        require(msg.value >= 2 ether, "Min two Ether Funds should be Transferred in order to be an Comapany, one ether for Service") ;
        _ ;
    }

    function setCompany(address[] memory boardMembers,address CEO, uint _acceptance) external payable MinBalance() {
        address contractAddress = address (new Company{value: (msg.value - 1 ether)}(boardMembers, CEO, _acceptance)) ;
       // (bool success) = payable(contractAddress).send((msg.value - 1 ether)) ;
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

// [0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB, 0x617F2E2fD72FD9D5503197092aC168c91465E7f2, 0x17F6AD8Ef982297579C203069C1DbfFE4348c372]
// [0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB, 0x617F2E2fD72FD9D5503197092aC168c91465E7f2, 0x17F6AD8Ef982297579C203069C1DbfFE4348c372],0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,70
// "phani's bhirthday",1200
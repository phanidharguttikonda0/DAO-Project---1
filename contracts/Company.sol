// SPDX-License-Identifier: MIT
// up to here smart contract byte code -> 19.0 kb
pragma solidity ^0.8.21 ;
// only CEO can set the next newCEO
import "hardhat/console.sol";

contract Company{

    struct Fund{
        string reason ;
        uint amount ;
        uint timestamp ; // raised timestamp
        uint votedMembers ; // how many members voted
        bool isused ; // is fund used
    }


    Fund[] private failedFunds ;
    Fund[] private sucessfulFunds ;
    Fund[] private  pendingFunds ;

    function getlength() external view returns(uint) {
        return pendingFunds.length ;
    }


    // as CEO can be taken from the board or from externally 
    mapping(address => mapping(address => bool)) private  changeceo ;
    mapping(address => uint) private  yesvotestoChangeCEO ; 
    uint private totalVotesToChangeCEO ;

    mapping(uint => mapping(address => bool)) private  votedMembers ;
    mapping(uint => uint) private  yesVotes ; // votes with positive response

    // board memebers list and the CEO
    address[] private boardmembers ;
    address private CEO ;
    uint immutable private acceptance ; // in percentage
    address private nextCEO ;

    constructor(address[] memory _boardmembers, address _CEO, uint _acceptance) payable {
        require(_boardmembers.length >= 5, "Min 5 Board Members") ;
        require(_acceptance >= 40, "min 40% should accept") ;
        boardmembers = _boardmembers ;
        CEO = _CEO ;
        acceptance = _acceptance ;
    }

    receive() external payable {
        
     }

    // events
    event CEOchange(address oldCEO, address newCEO) ;
    event FundRaised(string reason, uint amount, uint timestamp) ;
    event FundAccepted(string reason, uint amount, uint timestamp) ;
    event FundRejected(string reason, uint amount, uint timestamp) ;
    event FundsTransfered(uint amount, uint timestamp, address to) ;

    function getPendingRaiseFunds() external view returns(Fund[] memory){
        // isMember(msg.sender); either member or the CEO can call this function
        if(!isCEO(true)) isMember(msg.sender);
        return pendingFunds ;
    }

    function getSuccesfullFunds() external view returns(Fund[] memory){
        if(!isCEO(true)) isMember(msg.sender);
        return sucessfulFunds ;
    }

    function getFailedFunds() external  view returns(Fund[] memory){
        if(!isCEO(true)) isMember(msg.sender);
        console.log(gasleft()) ;
        return failedFunds ;
    }

    function listofBoardMembers() external view returns(address[] memory){
        if(!isCEO(true)) isMember(msg.sender);
        return boardmembers ;
    }

    // only CEO can raise the funds board members should say yes/no 
    function raiseFund(string memory reason, uint amount) external returns(uint){
        isCEO(false);
        require(amount <= address(this).balance, "insufficient balance") ;
        Fund memory f = Fund(reason, amount, block.timestamp, 1, false) ;
        console.log(f.isused) ;
        pendingFunds.push(f);
        votedMembers[f.timestamp][msg.sender] = true ;
        yesVotes[f.timestamp] = 1 ;
        emit FundRaised(reason, amount, f.timestamp);
        return pendingFunds.length ;
    }
    // another function to be implemented  getting number of votes 
    function voteRaiseFund(uint timestamp, uint index, bool vote) external {
        // CEO can't call 
        isMember(msg.sender) ;
        if(votedMembers[timestamp][msg.sender]) revert("voted!");
        pendingFunds[index].votedMembers += 1; 
        votedMembers[timestamp][msg.sender] = true ;
        if(vote) yesVotes[timestamp] += 1 ;
        console.log((yesVotes[timestamp]*100)/boardmembers.length) ;
        // board members successfully accepts
        if((yesVotes[timestamp]*100)/boardmembers.length >= acceptance) {
            // adding to sucessfulFunds
            sucessfulFunds.push(pendingFunds[index]);
            if(pendingFunds.length - 1 == index) pendingFunds.pop();
            else{
                pendingFunds[index] = pendingFunds[pendingFunds.length - 1] ;
                pendingFunds.pop() ;
            }
            Fund memory f = sucessfulFunds[sucessfulFunds.length - 1 ] ;
            emit FundAccepted(f.reason, f.amount, f.timestamp);
        }
        else{
            // board members rejects
            // if more than (100 - acceptance) are rejected then add to failes Funds
            uint256 noVotes = pendingFunds[index].votedMembers - yesVotes[timestamp] ;
            // note divisible by zero gives us error
            console.log((noVotes*100)/boardmembers.length) ;
            if((noVotes*100)/boardmembers.length >= (100 - acceptance)) {
                 // adding to FailedFunds
                failedFunds.push(pendingFunds[index]);
                if(pendingFunds.length - 1 == index) pendingFunds.pop();
                else{
                    pendingFunds[index] = pendingFunds[pendingFunds.length - 1] ;
                    pendingFunds.pop() ;
                }
                    Fund memory f = failedFunds[failedFunds.length - 1 ] ;
                    emit FundRejected(f.reason, f.amount, f.timestamp);
            }
            
        }

    }


    function withdrawRaisedFund(uint index, address to) external payable {
        require(index < sucessfulFunds.length, "not valid") ;
        require(!sucessfulFunds[index].isused,"already used") ;
        isCEO(false);
        payable(to).transfer(sucessfulFunds[index].amount * 1000000000000000000) ;
        sucessfulFunds[index].isused = true ; // funds are successfully transfered
        emit FundsTransfered(sucessfulFunds[index].amount, sucessfulFunds[index].timestamp, to);
    }

    function getCEO() public view returns(address) {
        return CEO ;
    }


    function changeCEO(bool vote) external {
        if(isCEO(true)) revert("CEO can't vote"); // CEO can't call
        if(nextCEO == address(0)) revert("please set next CEO");
        isMember(msg.sender);
        if (changeceo[CEO][msg.sender]) revert("already voted");
        changeceo[CEO][msg.sender] = true ;
        if(vote) yesvotestoChangeCEO[CEO] += 1 ;
        totalVotesToChangeCEO += 1 ;
        if((100 * yesvotestoChangeCEO[CEO]) /boardmembers.length >= acceptance){
            emit CEOchange(CEO, nextCEO);
            CEO = nextCEO ;
            nextCEO = address(0) ;
            totalVotesToChangeCEO = 0 ; // as new CEO comes in 
        }else {
            // board members rejects
            // if more than (100 - acceptance) are rejected then CEO continues
            uint noVotes = totalVotesToChangeCEO - yesvotestoChangeCEO[CEO] ;
            if((100 * noVotes) / boardmembers.length >= (100 - acceptance)) {
                nextCEO = address(0) ; // present CEO continues
                totalVotesToChangeCEO = 0 ;
            }
        }
    }


    function setnextCEO(address member) external {
        if(address(0) != nextCEO) revert("nextCEO setted") ;
        isMember(msg.sender) ;
        if(!isCEO(false)) revert("CEO can't call this"); // we know CEO can also be a board member
        nextCEO = member ; // once nextCEO is setted then we can't set again only after he became CEO
    }

    function getBalance() external view returns(uint){
        if(!isCEO(true)) isMember(msg.sender) ;
        return address(this).balance ;
    }

    function isCEO(bool norevert) private view returns (bool) {
        if(norevert) return msg.sender == CEO ;
        if(msg.sender != CEO) revert("only callable by CEO");
        return true ;
    }

    function isMember(address member) public view returns(bool){
        for(uint i = 0 ; i < boardmembers.length ; i++){
            if(boardmembers[i] == member) return true ;
        }
        
        revert("not a member"); // may be CEO but not a board member
    }
}
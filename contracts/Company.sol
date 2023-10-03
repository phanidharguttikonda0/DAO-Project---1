// SPDX-License-Identifier: MIT
// up to here smart contract byte code -> 12.9 kb
pragma solidity ^0.8.21 ;

contract Company{

    struct Fund{
        string reason ;
        uint amount ;
        uint timestamp ; // raised timestamp
        uint votedMembers ; // how many members voted
    }


    Fund[] private failedFunds ;
    Fund[] private sucessfulFunds ;
    Fund[] private pendingFunds ;

    // as CEO can be taken from the board or from externally 
    mapping(address => mapping(address => bool)) private changeceo ;
    mapping(address => uint) private yesvotestoChangeCEO ; 
    uint private totalVotesToChangeCEO ;

    mapping(uint => mapping(address => bool)) private votedMembers ;
    mapping(uint => uint) private yesVotes ; // votes with positive response

    // board memebers list and the CEO
    address[] boardmembers ;
    address CEO ;
    uint immutable acceptance ; // in percentage
    address private nextCEO ;

    constructor(address[] memory _boardmembers, address _CEO, uint _acceptance) {
        require(_boardmembers.length > 5, "Min 5 Board Members") ;
        require(_acceptance > 40, "min 40% should accept") ;
        boardmembers = _boardmembers ;
        CEO = _CEO ;
        acceptance = _acceptance ;
    }

    // events
    event CEOchange(address oldCEO, address newCEO) ;
    event FundRaised(string reason, uint amount, uint timestamp) ;
    event FundAccepted(string reason, uint amount, uint timestamp) ;
    event FundRejected(string reason, uint amount, uint timestamp) ;

    // only CEO can raise the funds board members should say yes/no 
    function raiseFund(string memory reason, uint amount) external {
        isCEO();
        require(amount <= address(this).balance, "insufficient balance") ;
        pendingFunds.push(Fund(reason, amount, block.timestamp, 1));
        votedMembers[pendingFunds[pendingFunds.length - 1].timestamp][msg.sender] = true ;
        yesVotes[pendingFunds[pendingFunds.length - 1].timestamp] += 1 ;
        emit FundRaised(reason, amount, pendingFunds[pendingFunds.length - 1].timestamp);
    }

    function voteRaiseFund(uint timestamp, uint index, bool vote) external {
        // CEO can't call 
        isMember(msg.sender) ;
        if(votedMembers[timestamp][msg.sender]) revert("voted!");
        pendingFunds[timestamp].votedMembers += 1; 
        votedMembers[timestamp][msg.sender] = true ;
        if(vote) yesVotes[timestamp] += 1 ;
        // board members successfully accepts
        if((boardmembers.length * yesVotes[timestamp]) /100 >= acceptance) {
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
            uint noVotes = failedFunds[index].votedMembers - yesVotes[index] ;
            if((boardmembers.length * noVotes) / 100 >= (100 - acceptance)) {
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


    function changeCEO() external {
        if(nextCEO == address(0)) revert("please set next CEO");
        isMember(msg.sender);
        if (changeceo[CEO][msg.sender]) revert("already voted");
        changeceo[CEO][msg.sender] = true ;
        yesvotestoChangeCEO[CEO] += 1 ;
        totalVotesToChangeCEO += 1 ;
        if((boardmembers.length * yesvotestoChangeCEO[CEO]) /100 >= acceptance){
            emit CEOchange(CEO, nextCEO);
            CEO = nextCEO ;
            nextCEO = address(0) ;
            totalVotesToChangeCEO = 0 ; // as new CEO comes in 
        }else {
            // board members rejects
            // if more than (100 - acceptance) are rejected then CEO continues
            uint noVotes = totalVotesToChangeCEO - yesvotestoChangeCEO[CEO] ;
            if((boardmembers.length * noVotes) / 100 >= (100 - acceptance)) {
                nextCEO = address(0) ; // present CEO continues
                totalVotesToChangeCEO = 0 ;
            }
        }
    }


    function setnextCEO(address member) external {
        if(address(0) != nextCEO) revert("nextCEO setted") ;
        isMember(msg.sender);
        if(!isCEO()) revert("CEO can't call this"); // we know CEO can also be a board member
        nextCEO = member ; // once nextCEO is setted then we can't set again only after he became CEO
    }


    function isCEO() private view returns (bool) {
        if(msg.sender != CEO) revert();
        return true ;
    }

    function isMember(address member) public view returns(bool){
        for(uint i = 0 ; i < boardmembers.length ; i++){
            if(boardmembers[i] == member) return true ;
        }
        revert("not a member"); // may be CEO but not a board member
    }
}
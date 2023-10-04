// scripts/deploy.js
async function main() {
  const MyContract1 = await ethers.getContractFactory("ManagingCompanies");
  const myContract1 = await MyContract1.deploy();

  console.log(myContract1) ;
  console.log("Managing Company ", myContract1.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

// Deploy.js Contract -> 0x1DC1cb67d3206708A35e38303a2952D37Cd90d18

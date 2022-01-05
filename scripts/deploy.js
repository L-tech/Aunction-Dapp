const main = async () => {
    const AuctionRepository = await hre.ethers.getContractFactory('AuctionRepository');
    const auction = await AuctionRepository.deploy();
  
    await auction.deployed();
  
    const DeedRepository = await hre.ethers.getContractFactory('DeedRepository');
    const deed = await DeedRepository.deploy("Arnen", "ARN");
  
    await deed.deployed();

    console.log('AuctionRepository address: ', auction.address);
    console.log('DeedRepository address: ', deed.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();
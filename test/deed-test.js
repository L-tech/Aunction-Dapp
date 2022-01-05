const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Deed", function () {
  // Create a new Deed with a given name and symbol
  it("It should create a new Deed - Aunction", async function () {
    const DeedRepository = await ethers.getContractFactory("DeedRepository");
    const deed = await DeedRepository.deploy("Oppo Reno 5", "OPPR");
    await deed.deployed();

    expect(await deed.symbol()).to.equal("OPPR");

    
    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
  it("Should check the Owner of the Deed", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const DeedRepository = await ethers.getContractFactory("DeedRepository");
    const deed = await DeedRepository.deploy("Oppo Reno 5", "OPPR");
    await deed.deployed();

    // console.log(deed.address);
    // console.log(owner.address);
    // console.log(addr1);

    const registerDeed = await deed.connect(addr1).registerDeed("Aunction");
    await registerDeed.wait();
    let ownerOfDeed = await deed.ownerOf(1);
    expect(await ownerOfDeed.valueOf()).to.equal(addr1.address);

  });
  it("check for the total suply of deeds", async function () {
    const DeedRepository = await ethers.getContractFactory("DeedRepository");
    const deed = await DeedRepository.deploy("Oppo Reno 5", "OPPR");
    await deed.deployed();

    const registerDeed = await deed.registerDeed("Aunction");
    await registerDeed.wait();

    const registerDeedTwo = await deed.registerDeed("Aunction Two");
    await registerDeedTwo.wait();

    expect(await deed.getDeedCount()).to.equal(2);

  });
});



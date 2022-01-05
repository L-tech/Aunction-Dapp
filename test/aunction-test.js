const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("auction", function(){
    it("It should check if the auction Repository Contract is deployed", async function() {
        const AuctionRepository = await ethers.getContractFactory("AuctionRepository");
        const auction = await AuctionRepository.deploy();
        await auction.deployed();
        expect(await auction.address).to.be.a("string");
    });

    it("should checks the total number of bid", async function() {
        const auctionRepository = await ethers.getContractFactory("AuctionRepository");
        const auction = await auctionRepository.deploy();
        await auction.deployed();
        expect(await auction.getBidsCount(0)).to.equal(0);
    });


    it("it should create an auction and also a deed", async function() {
        const [owner, addr1] = await ethers.getSigners();
    
        const auctionRepository = await ethers.getContractFactory("AuctionRepository");
        const auction = await auctionRepository.deploy();
        await auction.deployed();
        
        const DeedRepository = await ethers.getContractFactory("DeedRepository");
        const deed = await DeedRepository.deploy("Oppo Reno 5", "OPPR");
        await deed.deployed();
        const registerDeed = await deed.connect(addr1).registerDeed("auction");
        await registerDeed.wait();

        const registerauction = await auction.connect(addr1).createAuction(deed.address, 1, "First auction", "meta://", 200, 1617273120);
        await registerauction.wait();

        expect(await auction.getCount()).to.equal(1);

    });

    it("it should return the total auctions created by owner", async function() {
        const [owner, addr1] = await ethers.getSigners();
    
        const auctionRepository = await ethers.getContractFactory("AuctionRepository");
        const auction = await auctionRepository.deploy();
        await auction.deployed();
        
        const DeedRepository = await ethers.getContractFactory("DeedRepository");
        const deed = await DeedRepository.deploy("Oppo Reno 5", "OPPR");
        await deed.deployed();
        const registerDeed = await deed.connect(addr1).registerDeed("auction");
        await registerDeed.wait();

        const registerauction = await auction.connect(addr1).createAuction(deed.address, 1, "First auction", "meta://", 200, 1617273120);
        await registerauction.wait();

        expect(await auction.getAuctionsCountOfOwner(addr1.address)).to.equal(1);

    });

    it("it should return the total bids of an auction", async function() {
        const [owner, addr1] = await ethers.getSigners();
    
        const auctionRepository = await ethers.getContractFactory("AuctionRepository");
        const auction = await auctionRepository.deploy();
        await auction.deployed();
        
        const DeedRepository = await ethers.getContractFactory("DeedRepository");
        const deed = await DeedRepository.deploy("Oppo Reno 5", "OPPR");
        await deed.deployed();
        const registerDeed = await deed.connect(addr1).registerDeed("auction");
        await registerDeed.wait();

        const registerauction = await auction.connect(addr1).createAuction(deed.address, 1, "First auction", "meta://", 200, 1617273120);
        await registerauction.wait();

        expect(await auction.getBidsCount(0)).to.equal(0);

    });
});
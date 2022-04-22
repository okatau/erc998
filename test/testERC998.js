const { expect, assert } = require("chai");
const { Contract } = require("ethers");
const { ethers, artifacts } = require("hardhat");
const web3Utils = require('web3-utils');


describe("ERC998 composable tests", () => {

    let SampleERC721;
    let samplenft;
    let ERC998ERC721TopDown;
    let composable;
    let name1;
    let name2;
    let temp;

    const bytes1 = web3Utils.padLeft(web3Utils.toHex(1), 32);
    const bytes2 = web3Utils.padLeft(web3Utils.toHex(2), 32);
    const bytes3 = web3Utils.padLeft(web3Utils.toHex(3), 32);

    beforeEach(async () => {
        [name1, name2] = await ethers.getSigners();

        SampleERC721 = await ethers.getContractFactory("SampleERC721");
        samplenft = await SampleERC721.deploy("name", "nm");
        // await samplenft.deplyed();

        ERC998ERC721TopDown = await ethers.getContractFactory("ERC998ERC721TopDown");
        composable = await ERC998ERC721TopDown.deploy();
        // await composable.deaployed();
    });

    describe("minting ERC721 and ERC998 to name1", async () => {
        it("Mint erc721 and composable", async () => {
            // console.log("ERC721", samplenft.address);
            // console.log("ERC998", composable.address);
            // console.log("name1", name1.address);
            // console.log("name2", name2.address);

            temp = await samplenft.mint721(name1.address);
            assert(temp != undefined, "mint erc721 fail");

            temp = await composable.mint(name1.address);
            assert(temp != undefined, "mint erc998 fail");
        });

        it("Transfering NFT1 to composable", async () => {
            temp = await samplenft.mint721(name1.address);
            temp = await composable.mint(name1.address);

            let tx = await samplenft['safeTransferFrom(address,address,uint256,bytes)'](name1.address, composable.address, 1, bytes1);
            assert(tx != undefined, "safeTransferFrom function fails");

            let owned = await composable.childExists(samplenft.address, 1);
            assert(owned, "composable don't own sample nft");
        });

        it("mint 2-nd composable and nft to name1", async () => {
            temp = await samplenft.mint721(name1.address);
            temp = await composable.mint(name1.address);

            temp = await samplenft.mint721(name1.address);
            temp = await composable.mint(name1.address);

            assert(await composable.ownerOf(1) == name1.address && await composable.ownerOf(2) == name1.address, "name1 isn't owner of composables");
        });

        it("transfer nft2 to composable2", async () => {
            console.log("ERC721", samplenft.address);
            console.log("ERC998", composable.address);
            console.log("name1", name1.address);
            console.log("name2", name2.address);
            temp = await samplenft.mint721(name1.address);
            temp = await composable.mint(name1.address);
            temp = await samplenft.mint721(name1.address);
            temp = await composable.mint(name1.address);

            let tx = await samplenft['safeTransferFrom(address,address,uint256,bytes)'](name1.address, composable.address, 1, bytes1);
            tx = await samplenft['safeTransferFrom(address,address,uint256,bytes)'](name1.address, composable.address, 2, bytes2);
            assert(tx != undefined, "no tx");

            temp = await composable.childContractByIndex(2, 0);
            assert(temp == samplenft.address, "composable 2 does not have samplenft contract");

            temp = await composable.childExists(samplenft.address, 2);
            assert(temp, "composable not own NFT2");

            temp = await composable['safeTransferFrom(address,address,uint256,bytes)'](name1.address, composable.address, 1, bytes1);
            assert(temp, 'no tx');

            temp = await composable.ownerOf(1);
            console.log(temp);
        });
    });
});
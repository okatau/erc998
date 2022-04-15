const { expect, assert } = require("chai");
const { ethers } = require("hardhat");


describe("ERC998 composable tests", () => {

    let SampleERC721;
    let samplenft;
    let ERC998ERC721TopDown;
    let composable;
    let name1;
    let name2;

    beforeEach(async () => {
        [name1, name2] = await ethers.getSigners();

        SampleERC721 = await ethers.getContractFactory("SampleERC721");
        samplenft = await SampleERC721.deploy("name", "nm");

        ERC998ERC721TopDown = await ethers.getContractFactory("ERC998ERC721TopDown");
        composable = await ERC998ERC721TopDown.deploy();
    });

    describe("minting ERC721 and ERC998 to name1", async () => {
        it("Mint erc721", async () => {
            console.log("ERC721", samplenft.address);
            console.log("ERC998", composable.address);
            console.log("name1", name1.address);
            console.log("name2", name2.address);

            let temp = await samplenft.mint721(name1.address);
            assert(temp != undefined, "mint erc721 fail");

            temp = await composable.mint(name1.address);
            assert(temp != undefined, "mint erc998 fail");

            let tx = await samplenft['safeTransferFrom(address,address,uint256,bytes)'](name1.address, composable.address, 1, 1);
            assert(tx != undefined, "safeTransferFrom function fails");

            let owned = await composable.childExists(samplenft.address, 1);
            assert(owned, "composable don't own sample nft");

            let result = await composable.ownerOfChild(samplenft.address, 1);
        });
    });
});
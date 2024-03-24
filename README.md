<p align="center">
   <br/>
   <a href="#" target="_blank"><img width="150px" src="https://fardrops-v1.vercel.app/logo.png" /></a>
   <h1 align="center">Fardrops</h1>
   <h4 align="left">
   Fardrops gives creators easy to use tools that enable them to curate rewards and airdrop them to their biggest fans
   </h4>
</p>

## Overview

   <br/>
   <p align="left">
“We are inspired by Optimism and seek to continue the work they’ve started with RPGF by rewarding people for the impact they make to their communities.” - Humpty Calderon
</p>
   <p align="left">
We believe creators add tremendous value to web3 and for them to succeed we need to create better systems for them to engage and reward their most valuable fans. Using Fardrops, creators can easily provide an inframe minting experience to distinct fan groups. By targeting smaller groups of people rather than rewarding everyone through one massive airdrop provides the creator with a unique opportunity to engage with fans on a more personal level and create stronger relationships. These rewards can also serve as incentives for other fans to participate in ways that the creator deems important and valuable to their growth.
</p>
   <p align="left">
For example, a creator who wishes to retroactively reward a segment of their fanbase that owns one of their podcast NFTs can do so easily with Fardrops. They can also create an entirely different reward schema for fans who join their channels, are actively commenting and adding value to the conversations happening there. Lastly, creators may also reward fans of different communities that they deem value aligned and use these new assets as an onboarding tool to their own community. A fun experiment that creators at Crypto Sapiens have proposed is to then use Fardrops NFTs as a fun governance tool using Jokerace.
</p>
<h3 align="center">How it works</h3>
   <p align="left">
Creators sign in to Fardrops using their Farcaster accounts. They upload the NFTs they wish to reward their fans to Zora and create a campaign, or several, on Fardrops. Each campaign will have a unique link that creators can share on Farcaster that eligible fans can use to mint inframe. 
</p>
   <p align="left">
Fardrops will create an initial set of rewards criterias using Dune, Airstack to aggregate fan data and model rewards. Future versions will query Farcaster Hubs and merge the results with Dune, Airstack data.
</p>
   <p align="left">
This will give creators the power to create multiple lists using different input parameters and run many campaigns concurrently.

   </p>

## APIS and Frameworks

### Base Network

 - **allow creator deploy with no-code a nft contract on base network (create an nft contract)**

### Airstack.xyz

- **Farcaster users who casted in a given channel**

https://github.com/MosaicFun/fardrops/blob/22ba207f634c708fe45f475997794aadee48bff3/app/api/airstack/route.ts#L1

- **Farcaster Users Who Participates In A Channel And Following The Host**

https://github.com/MosaicFun/fardrops/blob/22ba207f634c708fe45f475997794aadee48bff3/app/api/airstack/

- **Farcaster Followers of Farcaster User(s) that Hold ERC20 Token(s)**

https://github.com/MosaicFun/fardrops/blob/22ba207f634c708fe45f475997794aadee48bff3/app/api/airstack/

- **Farcaster Followers of Farcaster User(s) that Hold ERC721/1155 NFT(s)**

https://github.com/MosaicFun/fardrops/blob/e0bfa628f5b79d742905e00cabc1fa2d2d0a570f/app/api/airstack/erc20holder/route.ts#L1

- **Farcaster Users that have a certain amount of Followers**

https://github.com/MosaicFun/fardrops/blob/22ba207f634c708fe45f475997794aadee48bff3/app/api/airstack/

### Privy

https://github.com/MosaicFun/fardrops/blob/22ba207f634c708fe45f475997794aadee48bff3/components/user-button.tsx#L17


## License

MIT

import { init, fetchQuery } from "@airstack/node";
import { toJSON } from "@/lib/query-utils"
import * as dotenv from "dotenv";
dotenv.config();

//export const POST = auth( async (req) => {
    export const POST = async (req: any) => {
        const airstackApiKey = process.env.AIRSTACK_API_KEY
        init(airstackApiKey ?? "");
            
        if (!req.body) {
          const errorResponse = 'No query info provided';
          return Response.json({ message: errorResponse }, { status: 500 })
        }

        const body = await toJSON(req.body) ?? {};

        try {
          const query = `query MyQuery {
            SocialFollowers(
              input: {
                filter: {
                  identity: {
                    _in: [
                      "${body?.identity}"
                    ]
                  }
                  dappName: { _eq: farcaster }
                }
                blockchain: ALL
                limit: 200
              }
            ) {
              Follower {
                followerAddress {
                  addresses
                  socials(input: { filter: { dappName: { _eq: farcaster } } }) {
                    profileName
                    userId
                    userAssociatedAddresses
                  }
                  tokenBalances(
                    input: {
                      filter: {
                        tokenAddress: {
                          _in: ["0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"]
                        }
                        tokenType: { _in: [ERC721, ERC1155] }
                      }
                    }
                  ) {
                    formattedAmount
                  }
                }
                followerProfileId
                followerTokenId
                followingAddress {
                  addresses
                  socials(input: { filter: { dappName: { _eq: farcaster } } }) {
                    profileName
                    userId
                    userAssociatedAddresses
                  }
                }
                followingProfileId
              }
            }
          }`; 
                         
          const { data, error } = await fetchQuery(query);
          
          //console.log("data:", JSON.stringify(data?.FarcasterChannelParticipants?.FarcasterChannelParticipant));
          //console.log("error:", error);
          return Response.json({ data: data?.SocialFollowers?.Follower })
  

        } catch (error: any) {
          return Response.json({ message: error }, { status: 500 })
        }

      }
      //) as any // TODO: Fix `auth()` return type
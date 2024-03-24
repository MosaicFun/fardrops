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
                          _in: ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"]
                        }
                        tokenType: { _eq: ERC20 }
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
                  domains {
                    name
                  }
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
          
          console.log("data:", JSON.stringify(data?.FarcasterChannelParticipants?.FarcasterChannelParticipant));
          //console.log("error:", error);
          return Response.json({ data: data?.FarcasterChannelParticipants?.FarcasterChannelParticipant })
  

        } catch (error: any) {
          return Response.json({ message: error }, { status: 500 })
        }

      }
      //) as any // TODO: Fix `auth()` return type
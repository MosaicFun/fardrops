import { init, fetchQuery } from "@airstack/node";
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
      
        const body = req.body;
      
        console.log('body ', body)
      
        const query = `query FcChannelParticipants {
  FarcasterChannelParticipants(
    input: {
      filter: {
        channelActions: {_eq: cast}, # Filter only for those who casted
        channelId: {_eq: "warpcast"}, # Search in /warpcast channel
      },
      blockchain: ALL
    }
  ) {
    FarcasterChannelParticipant {
      participant {
        userAddress
        profileName
        fid: userId
      }
    }
  }
}`; 
// Replace with GraphQL Query
        
        const { data, error } = await fetchQuery(query);
        
        console.log("data:", data);
        //console.log("error:", error);
        return data;

      }
      //) as any // TODO: Fix `auth()` return type
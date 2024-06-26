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
            FarcasterChannels(
              input: { blockchain: ALL, filter: { channelId: { _eq: "${body?.channel}" } } }
            ) {
              FarcasterChannel {
                leadIds
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
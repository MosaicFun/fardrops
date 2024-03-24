import { QueryParameter, DuneClient } from "@cowprotocol/ts-dune-client";
//import { auth } from "auth"
import * as dotenv from "dotenv";
dotenv.config();

async function toJSON(body: any) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const chunks: any[] = [];

  async function read() {
    const { done, value } = await reader.read();

    if (done) {
      return JSON.parse(chunks.join(''));
    }

    const chunk = decoder.decode(value, { stream: true });
    chunks.push(chunk);
    return read();
  }

  return read();
}

//export const POST = auth( async (req) => {
  export const POST = async (req: any) => {
  const duneAPIKey = process.env.DUNE_API_KEY

  if (!req.body) {
    const errorResponse = 'No query info provided';
    return Response.json({ message: errorResponse }, { status: 500 })
  }

  const body = await toJSON(req.body);

  console.log('body ', body)

  const { 
    user_input_channel,  
    user_input_fname,
    user_input_maxfid,
    user_input_mincasts
  } = body as any

  if (!user_input_channel || !user_input_fname || !user_input_maxfid || !user_input_mincasts) {
    const errorResponse = 'An error occurred';
    return Response.json({ message: errorResponse }, { status: 500 })
  }

  //if (req.auth) {
    try {
      const client = new DuneClient(duneAPIKey ?? "")
      const queryID = 3445512
      const parameters = [
        QueryParameter.text("user_input_channel", user_input_channel),
        QueryParameter.text("user_input_fname", user_input_fname),
        QueryParameter.number("user_input_maxfid", user_input_maxfid),
        QueryParameter.number("user_input_mincasts", user_input_mincasts),
      ]
      
      return client
        .refresh(queryID, parameters)
        .then((executionResult) => {
        console.log(executionResult.result?.rows)
        return Response.json({ data: executionResult.result?.rows })
      })

    } catch (error: any) {
      return Response.json({ message: error }, { status: 500 })
    }

  //}
  
  //return Response.json({ message: "Not authenticated" }, { status: 401 })
}
//) as any // TODO: Fix `auth()` return type
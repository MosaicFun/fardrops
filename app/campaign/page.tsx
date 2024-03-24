import {
    FrameButton,
    FrameContainer,
    FrameImage,
    FrameReducer,
    NextServerPageProps,
    getFrameMessage,
    getPreviousFrame,
    useFramesReducer,
  } from "frames.js/next/server"
  import Link from "next/link";
  import { DEBUG_HUB_OPTIONS, DEFAULT_DEBUGGER_HUB_URL } from "@/lib/constants"
  import { extractUserFids } from "@/lib/utils"
  import { getTokenUrl } from "frames.js";
  import { zora } from "viem/chains";
  import { kv } from "@vercel/kv"
  import { currentURL } from "@/lib/frame-utils";
  //import CustomLink from "@/components/custom-link"
  //import SessionData from "@/components/session-data"
  //import { auth } from "auth"
  
  type State =
    | {
        page: "initial";
      }
    | { page: "result" };
  
  const initialState: State = { page: "initial" };
  
  const reducer: FrameReducer<State> = (state, action) => {
    const buttonIndex = action.postBody?.untrustedData.buttonIndex;
  
    switch (state.page) {
      case "initial":
        return buttonIndex === 1 ? { page: "result" } : state;
      case "result":
        return buttonIndex === 1 ? { page: "initial" } : state;
      default:
        return { page: "initial" };
    }
  };
  
  export default async function Page({
    params,
    searchParams,
  }: NextServerPageProps) {
    const url = currentURL("/");
    //const session = await auth()
    console.log('searchParams => ', searchParams)
    const campaignId = 1;
    const people: any = await kv.get(`${campaignId}_allowed_list`) ?? []
    const query_params: any = await kv.get(`${campaignId}_allowed_list_params`) ?? null
    const nft_artwork: any = await kv.get(`${campaignId}_nft_artwork`)
    const nft_token_url: any = getTokenUrl({
      address: nft_artwork.contractaddress,
      chain: zora,
      tokenId: nft_artwork.tokenid,
    })
    const previousFrame = getPreviousFrame<State>(searchParams)
  
    const frameMessage = await getFrameMessage(previousFrame.postBody, {
        hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
    })
  
    console.log("info: frameMessage is:", frameMessage)
  
    if (frameMessage && !frameMessage?.isValid) {
      throw new Error("Invalid frame payload")
    }
  
    const [state, dispatch] = useFramesReducer<State>(
      reducer,
      initialState,
      previousFrame
    )
  
    // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
    // example: load the users credentials & check they have an NFT
    console.log("info: state is:", state)
  
    console.log("info: query params:", query_params)
    console.log("info: artwork:", nft_artwork)
  
    const currentChannel = `${query_params.user_input_channel}`.replace('https://warpcast.com/~/channel','')
  
    const initialPage = [
      <FrameImage key="image" aspectRatio="1:1">
        <div tw="flex flex-col w-full h-full bg-[#6649fb] text-white justify-center items-center">
          <h3 style={{fontSize: "90px"}}>You can mint if...</h3>
            <p style={{fontSize: "50px"}}>You follow @{query_params.user_input_fname ? query_params.user_input_fname : 'humpty.eth'}</p>
            <p style={{fontSize: "50px"}}>Your FID number is under {query_params.user_input_maxfid ? Number(query_params.user_input_maxfid)/1000 : 200}K</p>
            <p style={{fontSize: "50px"}}>You are following the {currentChannel ? currentChannel : '/loyalty'} channel</p>
            <p style={{fontSize: "50px"}}>You has at least {query_params.user_input_mincasts ? query_params.user_input_mincasts : 50} casts</p>
        </div>
      </FrameImage>,
      <FrameButton key="button">Check eligibility</FrameButton>,
    ];
  
    const allowedFids = extractUserFids(people);
  
    //TODO - HACK TO TEST MINTS - REMOVE ASAP
    allowedFids.push(1); 
    allowedFids.push(333278); 
    //TODO - HACK TO TEST MINTS - REMOVE ASAP
  
    const resultPage = [
      allowedFids.includes(frameMessage?.requesterFid ?? 0) ? (
      <FrameImage key="image" aspectRatio="1:1" src={nft_artwork?.thumbnailurl}>
      </FrameImage>
      ) : (
        <FrameImage key="image" aspectRatio="1:1" src="https://i.imgur.com/RZS3Wkr.jpg">
        </FrameImage>     
      ),
      <FrameButton key="back-button">back</FrameButton>,
      allowedFids.includes(frameMessage?.requesterFid ?? 0) ? (
        <FrameButton
          action="mint"
          key="mint-button"
          target={nft_token_url!}
        >
          Mint
        </FrameButton>
      ) : null,
    ];
  
  
    return (
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Fardrops Campaign #{campaignId}</h1>
  
        <div className="pt-16">
        <FrameContainer
          pathname="/"
          postUrl="/frames"
          state={state}
          previousFrame={previousFrame}
        >
          {state.page === "initial" ? initialPage : resultPage}
        </FrameContainer>
      </div>

      </div>
    )
  }
  
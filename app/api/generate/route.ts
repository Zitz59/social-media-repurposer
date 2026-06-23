import {NextResponse} from "next/server";
import {Anthropic} from "@anthropic-ai/sdk";

if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY environment variable is missing');
}
const anthropic = new Anthropic(
    {apiKey: process.env.ANTHROPIC_API_KEY as string},
);


export async function POST(request: Request) {
    try {
        const body = await request.json()

        const {transcript} = body
        if (!transcript?.trim()) {
            return NextResponse.json(
                {error: "Please enter a transcript"}, {status: 422}
            )
        }

        const generatedContent = {
            summary: `Summary for: ${transcript}`,
            linkedinPost: `LinkedIn version:${transcript}`,
            twitterPost: `Twitter version:${transcript}`,
        }

        return NextResponse.json(generatedContent)
    } catch (_error) {
        return NextResponse.json(
            {error: "Something went wrong, please try again."}, {status: 500}
        )
    }
}
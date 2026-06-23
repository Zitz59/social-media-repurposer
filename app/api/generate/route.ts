import {NextResponse} from "next/server";
import {Anthropic} from "@anthropic-ai/sdk";
import {z} from "zod";

if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY environment variable is missing');
}
const anthropic = new Anthropic(
    {apiKey: process.env.ANTHROPIC_API_KEY as string},
);

const dataSchema = z.object({
    summary: z.string().min(10).max(25000),
    linkedinPost: z.string().min(10).max(25000),
    twitterPost: z.string().min(10).max(3000),
})

export type GeneratedContent = z.infer<typeof dataSchema>


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
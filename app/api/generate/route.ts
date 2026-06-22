import {NextResponse} from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const {transcript} = body
        if (!transcript?.trim()) {
            return NextResponse.json(
                {error: "Please enter a transcript"},{status:422}
            )
        }

        const generatedContent  = {
            summary: `Summary for: ${transcript}`,
            linkedinPost:`LinkedIn version:${transcript}`,
            twitterPost:`Twitter version:${transcript}`,
        }

        return NextResponse.json(generatedContent)
    } catch (_error) {
        return NextResponse.json(
            {error: "Something went wrong, please try again."},{status:500}
        )
    }
}
import {NextResponse} from "next/server";
import {Anthropic} from "@anthropic-ai/sdk";
import {ContentBlock, TextBlock} from "@anthropic-ai/sdk/resources/messages/messages";
import {dataSchema} from "@/src/types/generated-content";


function isTextBlock(block: ContentBlock): block is TextBlock {
    return block.type === 'text';
}


export async function POST(request: Request) {
    try {

        if (!process.env.ANTHROPIC_API_KEY) {
            return NextResponse.json({error: 'ANTHROPIC_API_KEY environment variable is missing'}, {status: 500},
            );
        }

        const anthropic = new Anthropic(
            {apiKey: process.env.ANTHROPIC_API_KEY as string},
        );

        const body = await request.json()

        const {transcript} = body
        if (!transcript?.trim()) {
            return NextResponse.json(
                {error: "Please enter a transcript"}, {status: 422}
            )
        }

        const msg = await anthropic.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 4000,
            messages: [
                {
                    role: "user",
                    content: "You are an expert content repurposing assistant.\n" +
                        "Your task is to transform a video transcript into multiple pieces of platform-specific content.\n" +
                        "Generate the following outputs:\n" +
                        "\n" +
                        "Summary\n" +
                        "LinkedIn Post\n" +
                        "X (Twitter) Post\n" +
                        "YouTube Description\n" +
                        "Requirements:\n" +
                        "Summary\n" +
                        "\n" +
                        "Write a concise summary of the transcript.\n" +
                        "Maximum 150 words/1500 characters\n" +
                        "Focus on the key ideas and takeaways.\n" +
                        "Use clear and professional language.\n" +
                        "LinkedIn Post\n" +
                        "\n" +
                        "Professional and engaging tone.\n" +
                        "Focus on insights, lessons, and value.\n" +
                        "Use short paragraphs.\n" +
                        "Include a strong opening hook.\n" +
                        "End with a question or discussion prompt.\n" +
                        "Maximum 300 words/25000 characters\n" +
                        "X (Twitter) Post\n" +
                        "\n" +
                        "Create a single X/Twitter post.\n" +
                        "Concise and engaging.\n" +
                        "Include a strong hook.\n" +
                        "Maximum 3000 characters.\n" +
                        "Use hashtags only if relevant.\n" +
                        "YouTube Description\n" +
                        "Generate a complete YouTube video description.\n" +
                        "Structure\n" +
                        "Hook (First 2 lines)\n" +
                        "\n" +
                        "Under 200 characters.\n" +
                        "Include the primary topic naturally.\n" +
                        "Make viewers want to click \"Show more\".\n" +
                        "Body\n" +
                        "\n" +
                        "Explain what viewers will learn.\n" +
                        "Focus on benefits and outcomes.\n" +
                        "Keep it concise and easy to scan.\n" +
                        "Chapters\n" +
                        "Create logical timestamps in MM:SS format based on the content structure.\n" +
                        "Example:\n" +
                        "00:00 Introduction 01:25 Main Idea 03:40 Key Lesson 06:10 Practical Example 08:45 Final Thoughts\n" +
                        "Resources & CTA\n" +
                        "Include:\n" +
                        "\n" +
                        "Subscribe call-to-action\n" +
                        "Invitation to like/comment\n" +
                        "Placeholder links\n" +
                        "Example:\n" +
                        "🔔 Subscribe for more content like this\n" +
                        "📌 Resources:\n" +
                        "\n" +
                        "Website: [INSERT LINK]\n" +
                        "Newsletter: [INSERT LINK]\n" +
                        "Hashtags\n" +
                        "Add 3–5 relevant hashtags at the bottom.\n" +
                        "Additional Requirements\n" +
                        "\n" +
                        "Professional and friendly tone.\n" +
                        "Use formatting, emojis, and bullet points where appropriate.\n" +
                        "Avoid keyword stuffing.\n" +
                        "Maximum 5000 characters.\n" +
                        "Most important information must appear within the first 200 characters.\n" +
                        "Return ONLY valid JSON NEVER ADD MARKDOWN TO RETURN, NEVER WRAP UP RETURN WITH MARKDOWN using this exact structure:\n" +
                        "  { \"summary\": \"...\", \"linkedinPost\": \"...\", \"twitterPost\": \"...\", \"youtubeDescription\": \"...\" } Transcript:\n" + transcript
                }
            ]
        })
        const firstBlock = msg.content[0]
        if (firstBlock && isTextBlock(firstBlock)) {
            console.log("RAW RESPONSE",firstBlock.text)
            const textObject = JSON.parse(firstBlock.text.replace(/```([\s\S]*?)```/g, ""))
            const validatedData = dataSchema.parse(textObject)
            return NextResponse.json(validatedData)
        } else {
            return NextResponse.json(
                {error: "Validation error"}, {status: 500})
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {error: "Something went wrong, please try again."}, {status: 500},
        )
    }
}
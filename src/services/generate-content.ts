import {GeneratedContent} from "@/app/api/generate/route";

export async function generateContent(transcript: string): Promise<GeneratedContent> {
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({transcript})
    })

    if (!response.ok) {
        const responseMessage = await response.json()
        throw new Error (responseMessage.error)
    }

    return response.json()
}


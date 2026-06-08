import {GeneratedContent} from "@/src/types/generated-content";

export async function generateContent(transcript: string): Promise<GeneratedContent> {
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({transcript})
    })

    if (!response.ok) {
        throw new Error(
            `Request failed with status${response.status}`)
    }

    return response.json()
}
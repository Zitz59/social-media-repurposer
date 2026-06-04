'use client'
import {useState} from "react";
import TranscriptForm from "@/components/TranscriptForm";
import ResultSection from "@/components/ResultSection";

export interface GeneratedContent {
    summary: string,
    linkedinPost: string,
    twitterPost: string
}

export default function Home() {

    const [transcript, setTranscript] = useState("")
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // function delay(ms: number) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    async function handleSubmit() {
        const trimmedTranscript = transcript.trim()
        if (!trimmedTranscript) {
            console.warn('No transcript found.')
            return
        }
        setIsLoading(true);

        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({transcript: trimmedTranscript})
        })

        const data = await response.json()

        console.log(data)

        setGeneratedContent(data)

        setIsLoading(false)
    }

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main
                className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <section>
                    <header>
                        <h1>Social Media Repurposer</h1>
                        <p> Transform transcripts into platform-specific social media content.</p>
                    </header>
                    <TranscriptForm
                        handleSubmit={handleSubmit}
                        transcript={transcript}
                        setTranscript={setTranscript}
                        isLoading={isLoading}/>
                </section>
                {generatedContent && <ResultSection title='Summary' content={generatedContent.summary}/>}
                {generatedContent && <ResultSection title={'LinkedIn Post'} content={generatedContent.linkedinPost}/>}
                {generatedContent && <ResultSection title={'Twitter Post'} content={generatedContent.twitterPost}/>}
            </main>
        </div>
    );
}

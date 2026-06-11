'use client'
import {useState} from "react";
import TranscriptForm from "@/components/TranscriptForm";
import ResultSection from "@/components/ResultSection";
import {GeneratedContent} from "@/src/types/generated-content";
import {generateContent} from "@/src/services/generate-content";

export default function Home() {

    const [transcript, setTranscript] = useState("")
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit() {
        const trimmedTranscript = transcript.trim()
        if (!trimmedTranscript) {
            return
        }

        setError("")
        setGeneratedContent(null)
        setIsLoading(true);

        try {
            const data = await generateContent(trimmedTranscript)
            setGeneratedContent(data)

        } catch (error) {
            console.error(error)
            setGeneratedContent(null)
            setError("Failed to generate new content. Please try again.")
        } finally {
            setIsLoading(false)
        }
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
                        value={transcript}
                        maxLength={500}
                        handleSubmit={handleSubmit}
                        transcript={transcript}
                        setTranscript={setTranscript}
                        isLoading={isLoading}
                        placeholder="Enter yor text here"
                    />
                    {error && (<p className="text-red-600 text-sm">{error}</p>)}
                </section>
                {generatedContent && <ResultSection title='Summary' content={generatedContent.summary}/>}
                {generatedContent && <ResultSection title={'LinkedIn Post'} content={generatedContent.linkedinPost}/>}
                {generatedContent && <ResultSection title={'Twitter Post'} content={generatedContent.twitterPost}/>}
            </main>
        </div>
    );
}
'use client'
import {useState} from "react";
import TranscriptForm from "@/components/TranscriptForm";
import ResultSection from "@/components/ResultSection";

export default function Home() {
    const [transcript, setTranscript] = useState("")
    const [summary, setSummary] = useState("")
    const [linkedinPost, setLinkedinPost] = useState("")
    const [twitterPost, setTwitterPost] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleSubmit() {
        if (!transcript.trim()) {
            console.warn('No transcript found.')
            return
        }
        setIsLoading(true);

        await delay(2000)

        setSummary(`Summary for: ${transcript}`)
        setLinkedinPost(`Linkedin Version: ${transcript}`)
        setTwitterPost(`Twitter Version: ${transcript}`)

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
                {summary && <ResultSection title='Summary' content={summary}/>}
                {linkedinPost && <ResultSection title={'LinkedIn Post'} content={linkedinPost}/>}
                {twitterPost && <ResultSection title={'Twitter Post'} content={twitterPost}/>}
            </main>
        </div>
    );
}

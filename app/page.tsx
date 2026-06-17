'use client'
import {useState} from "react";
import TranscriptForm from "@/components/TranscriptForm";
import {GeneratedContent} from "@/src/types/generated-content";
import {generateContent} from "@/src/services/generate-content";
import Button from "@/components/Button";


export default function Home() {


    const [transcript, setTranscript] = useState("")
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [activeTab, setActiveTab] = useState('Summary')
    const tabsData = [{title:'Summary',content:generatedContent?.summary},
        {title:'LinkedIn Post',content:generatedContent?.linkedinPost},
        {title:'Twitter Post',content:generatedContent?.twitterPost}]

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
                className="flex flex-1 w-full space-y-4 max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <section className="w-full ">
                    <header>
                        <h1>Social Media Repurposer</h1>
                        <p> Transform transcripts into platform-specific social media content.</p>
                    </header>
                    <TranscriptForm
                        maxLength={500}
                        handleSubmit={handleSubmit}
                        transcript={transcript}
                        setTranscript={setTranscript}
                        isLoading={isLoading}
                        placeholder="Enter your text here . . ."
                    />
                    {error && (<p className="text-red-600 text-sm">{error}</p>)}
                </section>
                {generatedContent && (
                    <div className="flex gap-2">
                        {tabsData.map((tab, index) => (
                            <Button
                                key={tab.title}
                                loadingText={"Loading..."}
                                type="button"
                                onClick={()=>{setActiveTab(tab.title)}}
                                className={activeTab === tab.title ? "bg-blue-700" : "bg-gray-500"}>{tab.title}</Button>
                        ))}
                        <p>Current tan : {activeTab}</p>
                    </div>
                )}
            </main>
        </div>
    );
}
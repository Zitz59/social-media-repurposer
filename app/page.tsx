'use client'
import {useState} from "react";
import TranscriptForm from "@/components/TranscriptForm";
import {generateContent} from "@/src/services/generate-content";
import {Tabs} from "@/components/Tabs";
import {Tab, TabItem} from "@/src/types/tabs";
import ResultSection from "@/components/ResultSection";
import {MdSummarize} from "react-icons/md";
import {FaLinkedin} from "react-icons/fa";
import {FaSquareXTwitter, FaSquareYoutube} from "react-icons/fa6";
import {ICON_SIZE} from "@/src/constants/constants";
import {GeneratedContent} from "@/app/api/generate/route";

export default function Home() {

    const [transcript, setTranscript] = useState("")
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [activeTab, setActiveTab] = useState<Tab>("Summary")

    const tabsData: TabItem[] = [{title: 'Summary', content: generatedContent?.summary ?? "", icon: <MdSummarize size={ICON_SIZE}/>},
        {title: 'LinkedIn Post', content: generatedContent?.linkedinPost ?? "", icon: <FaLinkedin size={ICON_SIZE}/>},
        {title: 'Twitter Post', content: generatedContent?.twitterPost ?? "", icon: <FaSquareXTwitter size={ICON_SIZE}/>},{
        title:'Youtube Description',content:generatedContent?.youtubeDescription ?? "", icon:<FaSquareYoutube size={ICON_SIZE}/>
        }]

    const activeContent = tabsData.find(e => e.title === activeTab)

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
            setActiveTab("Summary")

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
                <section className="w-full">
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
                    <Tabs
                        tabs={tabsData}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}/>
                )}
                {generatedContent && activeContent && (
                    <ResultSection
                        title={activeContent.title}
                        content={activeContent.content}
                        icon={activeContent.icon}
                    />
                )}
            </main>
        </div>
    );
}
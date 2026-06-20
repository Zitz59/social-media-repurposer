'use client'

import {useState} from "react";
import Button from "@/components/Button";

type ResultSectionProps = {
    title: string;
    content: string;
}

const ResultSection = ({title, content}: ResultSectionProps) => {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(content)
            setCopied(true)
            console.log("Text copied to clipboard")
            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch (error) {
            console.error("Failed to copy text", error)
        }
    }

    return (
        <section className="rounded-xl p-4 border-1 border-gray-700 w-full transition-all duration-300 ring-2 ring-green-500">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{title}</h2>
                <Button className={copied ? "bg-green-500 hover:bg-green-600" : "bg-gray-800"}
                        onClick={handleCopy}
                        type="button"
                        loadingText={"Loading..."}>
                    {copied ? "✓ Copied" : "Copy"}
                </Button>
            </div>
            <article className="bg-gray-800 rounded-xl mt-6 p-4 whitespace-pre-wrap leading-relaxed transition-all duration-300">{content}</article>
        </section>
    );
};

export default ResultSection;
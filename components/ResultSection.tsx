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
            setTimeout(()=>{
                setCopied(false)
            },2000)
        }catch (error) {
            console.error("Failed to copy text",error)
        }
    }
    return (
            <section>
                <h2>{title}</h2>
                <Button
                    onClick={handleCopy}
                    type="button"
                    loadingText={"Loading..."}>
                    {copied ? "Copied!" : "Copy"}
                </Button>
                <article>{content}</article>
            </section>
    );
};

export default ResultSection;
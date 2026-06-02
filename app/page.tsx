'use client'
import {useState} from "react";

export default function Home() {
    const [transcript, setTranscript] = useState<string>("")
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main
                className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <section>
                    <header>
                        <h1>Social Media Repurposer</h1>
                        <p> Transform transcripts into platform-specific social media content.</p>
                    </header>
                    <form>
                        <label htmlFor="transcript">
                            Transcript
                        </label>
                        <textarea
                            value={transcript}
                            id="transcript"
                            rows={10}
                            onChange={(e) => setTranscript(e.target.value)}
                        />
                        <button type="submit">
                            Generate
                        </button>
                    </form>
                </section>
                <section>
                    <h2>Summary</h2>
                    <article></article>
                </section>
                <section>
                    <h2>Linkedin Post</h2>
                    <article></article>
                </section>
                <section>
                    <h2>Twitter Post</h2>
                    <article></article>
                </section>
            </main>
        </div>
    );
}

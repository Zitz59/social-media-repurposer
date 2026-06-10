'use client'

import Button from "@/components/Button";

type TranscriptFormProps = {
    transcript: string;
    setTranscript: (transcript: string) => void;
    handleSubmit: () => void;
    isLoading: boolean;
}

const TranscriptForm = ({transcript, setTranscript, handleSubmit, isLoading}: TranscriptFormProps,) => (
    <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
    }}>
        <label htmlFor="transcript">
            Transcript
        </label>
        <textarea className="bg-gray-500"
            value={transcript}
            id="transcript"
            rows={10}
            onChange={(e) => setTranscript(e.target.value)}
            disabled={isLoading}
        />
        <Button type="submit"
                disabled={isLoading}
                isLoading={isLoading}
                loadingText={"Loading..."}>
            Generate
        </Button>
    </form>
);

export default TranscriptForm;
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
        <textarea
            value={transcript}
            id="transcript"
            rows={10}
            onChange={(e) => setTranscript(e.target.value)}
        />
        <Button type="submit"
                isLoading={isLoading} loadingText={"Loading..."}>
            Generate
        </Button>
    </form>
);

export default TranscriptForm;
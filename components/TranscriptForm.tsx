'use client'

type TranscriptFormProps = {
    transcript: string;
    setTranscript: (transcript: string) => void;
    handleSubmit:()=>void;
}

const TranscriptForm = ({transcript, setTranscript, handleSubmit}:TranscriptFormProps,) => (
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
        <button type="submit">
            Generate
        </button>
    </form>
);

export default TranscriptForm;
'use client'

import Button from "@/components/Button";

type TranscriptFormProps = {
    value: string;
    maxLength: number;
    handleSubmit: () => void;
    transcript: string;
    setTranscript: (transcript: string) => void;
    isLoading: boolean;
    placeholder: string;
}

const TranscriptForm = ({
                            maxLength,
                            handleSubmit,
                            transcript,
                            setTranscript,
                            isLoading,
                            placeholder
                        }: TranscriptFormProps) => {

    const isButtonDisabled = isLoading || transcript.length >= maxLength;

    const getCounterColor = () => {
        const percentage = (transcript.length / maxLength) * 100
        if (percentage >= 95) return "text-red-500 font-medium"
        if (percentage >= 65) return "text-yellow-500 font-medium"
        return "text-green-500 font-medium"
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
        }}>
            <label htmlFor="transcript">
                Transcript
            </label>
            <textarea className="bg-gray-500"
                      value={transcript}
                      maxLength={maxLength}
                      id="transcript"
                      rows={10}
                      onChange={(e) => setTranscript(e.target.value)}
                      disabled={isLoading}
                      placeholder={placeholder}
            />
            <div className="text-right text-sm mt-1">
                <span className={getCounterColor()}>
                    {transcript.length} / {maxLength}
                </span>
            </div>
            <Button type="submit"
                    disabled={isButtonDisabled}
                    isLoading={isLoading}
                    loadingText={"Loading..."}>
                Generate
            </Button>
        </form>

    )
};

export default TranscriptForm;
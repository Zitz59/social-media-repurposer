'use client'

import Button from "@/components/Button";

type TranscriptFormProps = {
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

    const isButtonDisabled = isLoading || !transcript.trim();

    const getCounterColor = () => {
        const percentage = (transcript.length / maxLength) * 100
        if (percentage >= 95) return "text-red-500 font-medium"
        if (percentage >= 65) return "text-yellow-500 font-medium"
        return "text-green-500 font-medium"
    }

    return (
        <form className="flex flex-col gap-3 p-4 rounded-xl  leading-relaxed "
            onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
        }}>
            <label className="font-medium text-lg mb-1"
                htmlFor="transcript">
                Transcript
            </label>
            <textarea className="placeholder:text-gray-300 resize-none outline-none transition-all bg-gray-500 rounded-xl p-4 focus:ring-2 focus:ring-gray-400 w-full"
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
                    {transcript.length} / {maxLength} characters
                </span>
            </div>
            <Button className="w-fit"
                type="submit"
                    disabled={isButtonDisabled}
                    isLoading={isLoading}
                    loadingText={"Loading..."}>
               Generate
            </Button>
        </form>

    )
};

export default TranscriptForm;
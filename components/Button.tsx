// components/Button.tsx
type ButtonProps = {
    isLoading?: boolean
    disabled?: boolean
    loadingText?: string
    children: React.ReactNode
    type?: "submit" | "button" | "reset"
    onClick?: () => void
    className?: string
}

const Button = ({
                    isLoading = false,
                    disabled = false,
                    loadingText,
                    children,
                    type = "button",
                    onClick,
                    className = "",
                }: ButtonProps) => (
    <button
        type={type}
        disabled={isLoading || disabled}
        onClick={onClick}
        className={`
        relative
        inline-flex items-center justify-center gap-2
        px-6 py-2.5 rounded-lg
         text-white font-medium text-sm
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
    `}
    >
        <span className="invisible flex items-center gap-2">
        <span className="h-4 w-4"/>
            {loadingText}
    </span>
        <span className="absolute inset-0 flex items-center justify-center gap-2">
        {isLoading ? (
            <>
                <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                            stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {loadingText}
            </>
        ) : children}
    </span>
    </button>
)

export default Button
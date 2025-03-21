interface ErrorCardProps {
    error: any | { message: string; };
}

function ErrorCard({ error }: ErrorCardProps) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <p className="font-semibold">{error.message || "Unknown error occurred"}</p>
        </div>
    );
}

export default ErrorCard;
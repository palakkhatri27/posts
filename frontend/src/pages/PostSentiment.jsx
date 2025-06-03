import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../service/ApiService";

const PostSentiment = () => {
    const [text, setText] = useState("");
    const [sentiment, setSentiment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSentiment(null);

        try {
            const result = await ApiService.analyzeSentiment(text);
            setSentiment(result.sentiment);
        } catch (err) {
            setError("Failed to analyze sentiment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-charcoal text-ash py-10 px-4 flex justify-center">
            <div className="w-full max-w-xl bg-slate p-8 rounded-lg shadow-md border border-smoke">
                <h2 className="text-3xl font-bold mb-6 text-white">Analyze Sentiment</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-smoke mb-1">Text</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows="5"
                            className="w-full px-4 py-2 rounded bg-charcoal text-ash border border-smoke focus:outline-none focus:ring-2 focus:ring-electric"
                            placeholder="Type something to analyze..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !text.trim()}
                        className="w-full py-2 px-4 bg-electric text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Analyzing..." : "Analyze"}
                    </button>
                </form>

                {sentiment && (
                    <div className="mt-6 p-4 bg-charcoal border border-electric rounded text-lg">
                        Sentiment: <span className="font-bold text-electric">{sentiment}</span>
                    </div>
                )}

                {error && (
                    <div className="mt-4 text-red-400">
                        {error}
                    </div>
                )}
                <Link
                    to="/"
                    className="text-smoke hover:text-electric transition"
                >
                    ← Back to Posts
                </Link>
            </div>
        </div>
    );
};

export default PostSentiment;
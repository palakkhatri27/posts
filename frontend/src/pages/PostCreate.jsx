import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ApiService from "../service/ApiService";

const PostCreate = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !body || !userId) {
            setError("All fields are required.");
            return;
        }

        try {
            setSaving(true);
            await ApiService.createPost({ title, body, userId: parseInt(userId) });
            navigate("/");
        } catch (err) {
            setError("Failed to create post.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-charcoal text-ash py-10 px-4 flex justify-center">
            <div className="w-full max-w-xl bg-slate p-8 rounded-lg shadow-md border border-smoke">
                <h2 className="text-3xl font-bold mb-6 text-white">Create New Post</h2>

                {error && <p className="text-red-400 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-smoke mb-1">User ID</label>
                        <input
                            type="number"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-charcoal text-ash border border-smoke focus:outline-none focus:ring-2 focus:ring-electric"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-smoke mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-charcoal text-ash border border-smoke focus:outline-none focus:ring-2 focus:ring-electric"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-smoke mb-1">Body</label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows="5"
                            className="w-full px-4 py-2 rounded bg-charcoal text-ash border border-smoke focus:outline-none focus:ring-2 focus:ring-electric"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full py-2 px-4 bg-electric text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {saving ? "Creating..." : "Create Post"}
                    </button>
                </form>

                <div className="mt-6 text-sm">
                    <Link to="/" className="text-smoke hover:text-electric transition">
                        ← Back to Posts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostCreate;
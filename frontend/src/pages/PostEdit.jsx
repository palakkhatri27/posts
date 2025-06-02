import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ApiService from "../service/ApiService";

const PostEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await ApiService.getPostById(id);
                setTitle(data.title);
                setBody(data.body);
            } catch (err) {
                setError("Failed to load post.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await ApiService.updatePost(id, { title, body });
            navigate(`/post/${id}`);
        } catch (err) {
            setError("Failed to update post.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-charcoal text-ash">
                Loading post...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-charcoal text-red-400">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-charcoal text-ash py-10 px-4 flex justify-center">
            <div className="w-full max-w-xl bg-slate p-8 rounded-lg shadow-md border border-smoke">
                <h2 className="text-3xl font-bold mb-6 text-white">Edit Post</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        {saving ? "Saving..." : "Save"}
                    </button>
                </form>

                <div className="mt-6 text-sm">
                    <Link to={`/post/${id}`} className="text-smoke hover:text-electric transition">
                        ← Cancel
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostEdit;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ApiService from "../service/ApiService";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const data = await ApiService.getPostById(id);
                setPost(data);
            } catch (err) {
                setError("Failed to load post.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-charcoal text-ash text-lg">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-charcoal text-red-400 text-lg">
                {error}
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-charcoal text-ash text-lg">
                Post not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-charcoal text-ash py-10 px-4 flex justify-center">
            <div className="max-w-2xl w-full bg-slate p-8 rounded-lg shadow-md border border-smoke">
                <h2 className="text-3xl font-bold mb-6 text-white">Post {post.id}</h2>

                <div className="space-y-4 text-smoke text-lg">
                    <p><span className="font-semibold text-ash">User ID:</span> {post.userId}</p>
                    <p><span className="font-semibold text-ash">Title:</span> {post.title}</p>
                    <p><span className="font-semibold text-ash">Characters in Title:</span> {post.charTitle}</p>
                    <p><span className="font-semibold text-ash">Body:</span> {post.body}</p>
                    <p><span className="font-semibold text-ash">Characters in Body:</span> {post.charBody}</p>
                </div>

                <div className="mt-8 flex items-center space-x-6">
                    <Link
                        to={`/edit/${post.id}`}
                        className="inline-block px-4 py-2 bg-electric text-white rounded hover:bg-blue-700 transition"
                    >
                        ✏️ Edit this Post
                    </Link>

                    <Link
                        to="/"
                        className="text-smoke hover:text-electric transition"
                    >
                        ← Back to Posts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;

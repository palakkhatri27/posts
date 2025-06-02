import React, { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await ApiService.getPosts(page);
                setPosts(data || []);
                setError(null);
            } catch (err) {
                setError("Failed to load posts.");
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    const handleNextPage = () => setPage(prev => prev + 1);
    const handlePrevPage = () => setPage(prev => (prev > 1 ? prev - 1 : 1));
    const handleCardClick = (id) => {navigate(`/post/${id}`);};

    return (
        <div className="bg-charcoal min-h-screen flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-6xl">
                <h2 className="text-4xl font-bold text-ash mb-8 text-center">
                Posts List
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div
                    key={post.id}
                    className="bg-slate p-6 rounded-lg border border-smoke hover:border-electric shadow-sm hover:shadow-lg transition cursor-pointer"
                    onClick={() => handleCardClick(post.id)}
                    >
                    <p className="text-smoke text-sm mb-1">User ID: {post.userId}</p>
                    <h3 className="text-lg font-semibold text-ash mb-2 line-clamp-2">
                        {post.title}
                    </h3>
                    <span className="text-smoke text-xs">Post ID: {post.id}</span>
                    </div>
                ))}
                </div>

                <div className="flex justify-center items-center mt-10 space-x-4">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-slate text-smoke rounded hover:bg-smoke hover:text-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-ash font-medium text-lg">Page {page}</span>
                <button
                    onClick={handleNextPage}
                    className="px-4 py-2 bg-electric text-white rounded hover:bg-blue-700 transition"
                >
                    Next
                </button>
                </div>
            </div>
        </div>
    );
};

export default PostList;

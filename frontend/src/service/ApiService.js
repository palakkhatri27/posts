import axios from "axios";

export default class ApiService {
    static API_BASE_URL  = "https://postsbackend-csln.onrender.com";

    static async getPosts(page = 1) {
        try {
            const response = await axios.get(`${this.API_BASE_URL}?page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    }

    static async getPostById(id) {
        try {
            const response = await axios.get(`${this.API_BASE_URL}/post/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch post with id ${id}:`, error);
        }
    }

    static async updatePost(postId, postData) {
        try {
            const response = await axios.put(`${this.API_BASE_URL}/post/${postId}`, postData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            return response.data;
        } catch (error) {
            console.error(`Failed to update post with id ${postId}:`, error);
        }
    }
}
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Update as needed

const ApiService = {
  getUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  },

  getPosts: async () => {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  },

  getComments: async () => {
    const response = await axios.get(`${API_BASE_URL}/comments`);
    return response.data;
  }
};

export default ApiService;

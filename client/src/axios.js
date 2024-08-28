import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true, 
});

// Function for user login
export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function for user signup
export const signupUser = async (name, email, password) => {
    try {
        const response = await axiosInstance.post('/signup', { name, email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function for editing profile
export const editProfile = async (name, file, id) => {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);
        formData.append('id', id);

        const response = await axiosInstance.post('/editProfile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function for logout
export const logoutUser = async () => {
    try {
        const response = await axiosInstance.get('/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function for authenticate
export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get('/checkAuth');
    return response.data; // Return data from the response
  } catch (error) {
    console.error('Authentication check failed:', error);
    throw error; // Re-throw error to handle it in the calling component
  }
};


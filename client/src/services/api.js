import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const officerAPI = {
  getAvailableOfficers: async (date, location) => {
    try {
      console.log('API Request:', { date, location }); // Add this log
      const response = await axios.get(`${API_URL}/officers/available`, {
        params: { date, location }
      });
      console.log('API Response:', response.data); // Add this log
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  
    bookAppointment: async (bookingData) => {
      try {
        const response = await axios.post(`${API_URL}/officers/book`, bookingData);
        return response.data;
      } catch (error) {
        console.error('Error booking appointment:', error);
        throw error;
      }
    }
  };

  export const expertAPI = {
    getAllExperts: async (expertType) => {
      const response = await axios.get(`${API_URL}/experts/${expertType}`);
      return response.data;
    },
    
    getExpertById: async (expertType, expertId) => {
      const response = await axios.get(`${API_URL}/experts/${expertType}/${expertId}`);
      return response.data;
    }
  };

  export const authAPI = {
    login: async (credentials) => {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    }
  };
  
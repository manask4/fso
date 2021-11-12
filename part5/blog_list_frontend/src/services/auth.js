import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response;
  }
  catch (error) {
    return error.message;
  }
};

const services = { login };
export default services;

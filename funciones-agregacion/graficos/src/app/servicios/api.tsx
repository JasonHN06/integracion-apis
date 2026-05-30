import axios from "axios";

const API_URL = "http://localhost:5000/";

export const getTotalProductos = async () => {
  const response = await axios.get(`${API_URL}total-productos`);
  return response.data;
};

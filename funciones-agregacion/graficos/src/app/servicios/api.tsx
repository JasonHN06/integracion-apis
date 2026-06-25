import axios from "axios";

const API_URL = "http://localhost:5000/api/graficos";

export const getPromedioProductosCategoria = async () => {
  const response = await axios.get(`${API_URL}/promedio-productos-categoria`);
  return response.data;
};

export const getProductosPorMarca = async () => {
  const response = await axios.get(`${API_URL}/productos-por-marca`);
  return response.data;
};

import axios from "axios";

const API_URL = "http://localhost:5000/";

export const getTotalProductos = async () => {
  const response = await axios.get(`${API_URL}total-productos`);
  return response.data;
};

export const getValorTotalProductosPorTipo = async () => {
  const response = await axios.get(`${API_URL}valor-total-productos-por-tipo`);
  return response.data;
};

export const getValorPromedioProductosPorCategoria = async () => {
    const response = await axios.get(`${API_URL}valor-promedio-productos-por-categoria`);
  return response.data;
}

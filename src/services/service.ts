import axios from "axios";

const BACKEND_URL = "http://192.168.0.106:5000/api/zoho";

export const fetchZohoData = async () => {
  try {
    const response = await axios.get(BACKEND_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching Zoho data:", error);
    throw error;
  }
};

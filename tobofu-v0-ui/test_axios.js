const axios = require('axios');

async function test() {
  try {
    const api = axios.create({ baseURL: "http://127.0.0.1:8000" });
    const response = await api.get('/notifications/2');
    console.log("Response data type:", Array.isArray(response.data) ? "Array" : typeof response.data);
    console.log("Response data:", JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error("Error:", err.message);
  }
}
test();

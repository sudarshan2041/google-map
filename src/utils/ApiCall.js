import axios from "axios";

class APICall {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://maps.googleapis.com/maps/api/",
      timeout: 1000,
    });
  }
  async request(method, url, data, auth) {
    let config = {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
      method,
      url,
    };
    if (data) {
      config.data = data;
    }
    try {
      let res = await this.instance(config);
      if (url) return res;
    } catch (error) {
      throw error;
    }
  }
}
export let apicall = new APICall();

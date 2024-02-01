import { Component } from 'react'
import axios from 'axios'

class ss extends Component {
  static base_url = "http://localhost:8888"

  //http method
  static getMethod = "GET";
  static putMethod = "PUt"
  static deleteMethod = "DELETE"
  static postMethod = "POST"
  //routes
  static getblog = "/getblog";
  static getblogbyid = "/getblogbyid"
  static upblog = "/upblog"
  static deleteblog = "/deleteblog"
  static addblog = "/addblog"


  static callapi = async ({ methodName, api_url, body, params, options }) => {

    api_url = this.base_url + api_url;

    axios.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem("auth");
        if (accessToken) {
          config.headers = {
            accept: "application/json",
            "content-type": "application/json",
            authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
            platform: "web-admin",
            ...options
          };
        } 
        else {
          config.headers = {
            accept: "application/json",
            "content-type": "application/json",
            platform: "web-admin",
            ...options
          };
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    )

    axios.interceptors.response.use((response) => {
      return response;
    },
      async (error) => {
        const originalRequest = error.config;
        let refreshtoken = localStorage.getItem("refreshtoken");
        // console.log("err",error)
        if (refreshtoken && error?.response?.status === 401) {
          if (originalRequest.url.includes("/refreshToken")) {
            return Promise.reject(error);
          }
          originalRequest._retry = true;
          try {

            const response = await axios.post(`${this.base_url}/renewtoken`, { token: JSON.parse(localStorage.getItem("refreshtoken")) })

            if (response.status === 200 && response.data.accesstoken) {

              localStorage.setItem("auth", JSON.stringify(response.data.accesstoken));
              localStorage.setItem("refreshtoken", JSON.stringify(response.data.refreshtoken));

              console.log("Access token refreshed!");
              // console.log("req",originalRequest);
              const res = await axios(originalRequest);
              return res;

            } else {
              console.log("Refresh Token Error", error);
              return Promise.reject(response);
            }
          } catch (e) {
            return Promise.reject(e);
          }
        } else {
          return Promise.reject(error);
        }
      }
    );

    if (methodName === this.getMethod) {
      if (params) {
        api_url = api_url + "/" + params;
      }
      try {
        const response = await axios.get(api_url);
        return response;
      } catch (error) {

        return console.log(error);
      }
    }

    if (methodName === this.deleteMethod) {
      if (params) {
        api_url = api_url + "/" + params;
      }
      try {
        const response = await axios.delete(api_url);
        return response;
      } catch (error) {
        return error.response;
      }
    }



    if (methodName === this.postMethod) {
      if (params) {
        api_url = api_url + "/" + params;
      }
      try {
        const response = await axios.post(api_url, body, options);
        return response;
      } catch (error) {

        return error.response;
      }
    }

    if (methodName === this.putMethod) {
      if (params) {
        api_url = api_url + "/" + params;
      }
      try {
        const response = await axios.put(api_url, body, options);
        return response;
      } catch (error) {

        return error.response;
      }
    }

  }

}

export default ss



// import axios from 'axios';
// import { toast } from 'react-toastify';
// import API_URL from '../../config';

// const axiosInstance = axios.create({
//   baseURL: API_URL,
// });

// // Attach the Authorization header to every request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem('userToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Global error handling for expired sessions
// axiosInstance.interceptors.response.use(
//   (response) => response, // Pass response through
//   (error) => {
//     if (error.response && [401, 403].includes(error.response.status)) {
//       toast.error('Session expired. Please sign in again.');
//       sessionStorage.clear();
//       // Redirect user based on presence of org_id
//       window.location.href = error.config?.params?.org_id
//         ? `/client/${error.config.params.org_id}/login`
//         : '/superadmin/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


// // 1
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from "../../config";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setupAxiosInterceptors = (navigate, params) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        toast.error("Session expired. Please sign in again.");
        sessionStorage.clear();
        const org_id = params?.org_id;
        if (org_id) {
          navigate(`/client/${org_id}/login`);
        } else {
          navigate("/superadmin/login");
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;

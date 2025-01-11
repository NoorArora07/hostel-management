import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { baseUrl } from '@/urls';

export const getFromBackend = async (link) => {
  try {
    const token = localStorage.getItem('token'); // Ensure token is retrieved
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const response = await axios.get(link, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response; // Return the full Axios response object
  } catch (error) {
    console.error('Request Error:', error.response ? error.response.data : error.message);
    throw error; // Rethrow to allow handling at the calling site
  }
};

// export const getFromBackend2 = async (link, params = {}) => {
//   try {
//     const token = localStorage.getItem('token'); // Ensure token is retrieved
//     if (!token) {
//       throw new Error('No token found in localStorage');
//     }

//     const response = await axios.get(link, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//       params: params, // Send data as query parameters
//     });

//     return response; // Return the full Axios response object
//   } catch (error) {
//     console.error('Request Error:', error.response ? error.response.data : error.message);
//     throw error; // Rethrow to allow handling at the calling site
//   }
// };

export const postToBackend = async (link, data) => {
    try {
      const token = localStorage.getItem('token'); // Ensure token is retrieved
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      const response = await axios.post(link, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return response; // Return the full Axios response object
    } catch (error) {
      console.error('Request Error:', error.response ? error.response.data : error.message);
      throw error; // Rethrow to allow handling at the calling site
    }
  };
  
  export const patchToBackend = async (link, data) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await axios.patch(link, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      return response; // Return the full Axios response object
    } catch (error) {
      console.error('Request Error:', error.response ? error.response.data : error.message);
      throw error; // Rethrow to allow handling at the calling site
    }
  };


  export const checkWarden = async () => {
    // const navigate = useNavigate();
    try {
      const result = await getFromBackend(`${baseUrl}/api/check/check-role`);
      console.log(result);
      // if (result.data.message === "access denied") {
      //     navigate("/AccessDenied");
      // }
      const message = await result.data.message;
      return message;
    } catch (error) {
      console.error("error while checking role", error);
      throw error;
    }
  }

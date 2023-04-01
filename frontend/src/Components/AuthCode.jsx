import axios from "axios";

export const verifyUser = async (code) => {
  await axios.get(`/api/auth/${code}`).then((response) => {
    return response.data;
  });
};

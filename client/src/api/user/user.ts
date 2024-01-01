import axios from "../../core/axios";

export const getUserById = async (id: string) => {
  const { data } = await axios.get(`user/getUser/${id}`);
  return data;
};

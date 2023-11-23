import axios from "../../core/axios.ts";
// import { User } from "../../interfaces/Auth.ts";

export const getUserById = async (id: string) => {
  const { data } = await axios.get(`user/getUser/${id}`);
  return data;
};

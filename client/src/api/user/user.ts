import axios from "../../core/axios.ts";
import { User } from "../../interfaces/Auth.ts";

export const getMe = async (): Promise<User> => {
  const { data } = await axios.get("/user/getMe/me");
  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await axios.get(`user/getUser/${id}`);
  return data;
};

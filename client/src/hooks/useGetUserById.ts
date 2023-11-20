import { useEffect, useState } from "react";
import { User } from "../interfaces/Auth.ts";
import * as Api from "../api";

export const useGetUserById = (id: string) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await Api.user.getUserById(id);
        setUser(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, [id]);

  return { user, setUser };
};

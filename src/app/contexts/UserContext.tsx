import { createContext } from "react";



export type User = {
  id: number;
  name: string;
  email: string;
  imageUrl: string;

};

export const UserContext = createContext<User | undefined>(undefined)
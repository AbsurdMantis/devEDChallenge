import { User } from "@prisma/client";
import { UserDTO } from "./userDTO";

type SafeUser = Omit<User, 'password_hash'>;

export const userMapper = (data: SafeUser): UserDTO => {
    const { id, name, email, status, isAdmin } = data;
  
    const userDTO: UserDTO = { id, name, email, status, isAdmin };
    return userDTO;
  };
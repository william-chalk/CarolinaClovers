import { useContext } from "react";
import Auth from "../context/auth";

const useAuth = () => {
  return useContext(Auth);
};

export default useAuth;

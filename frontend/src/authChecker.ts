import jwt_decode from "jwt-decode";
import { DecodedToken } from "./types";


const getCookie = (name: string) => {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return cookieValue ? cookieValue.pop() : "";
};
const checkAuth = async () => {
  const token = getCookie("token");
  if (token) {
    const decodedCookie: DecodedToken = await jwt_decode(token);
    return decodedCookie;
  }
  return false;
};

export default checkAuth;
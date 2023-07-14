import jwt_decode from "jwt-decode";
import { DecodedToken } from "./types";
import Cookies from "universal-cookie";

export const checkAuth = async () => {
  const cookies = new Cookies();
  console.log(cookies.get("token"));
  


  const token = getCookie("token");
  if (token) {
    try {
      const decodedCookie: DecodedToken = jwt_decode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (
        decodedCookie &&
        decodedCookie.exp &&
        decodedCookie.exp > currentTime
      ) {
        return decodedCookie;
      }
    } catch (error) {
      // Handle any errors while decoding the token
      console.error("Error decoding JWT token:", error);
    }
  }
  return false;
};

const getCookie = (name: string) => {
  console.log(document.cookie);
  
  const cookieValue = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));
  return cookieValue ? cookieValue.split("=")[1] : "";
};



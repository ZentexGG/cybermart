import jwt_decode from "jwt-decode";
import { DecodedToken } from "./types";

export const checkAuth = async () => {
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
      console.error("Error decoding JWT token:", error);
    }
  }
  return false;
};

export const getCookie = (name: string) => {
  const cookieValue = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));
  return cookieValue ? cookieValue.split("=")[1] : "";
};



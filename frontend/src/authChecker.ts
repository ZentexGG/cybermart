import jwt_decode from "jwt-decode";

interface DecodedToken {
  [key: string]: any;
}

const getCookie = (name: string) => {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return cookieValue ? cookieValue.pop() : "";
};
const checkAuth = () => {
  const token = getCookie("token");
  if (token) {
    const decodedCookie: DecodedToken = jwt_decode(token);
    return decodedCookie;
  }
  return false;
};

export default checkAuth;
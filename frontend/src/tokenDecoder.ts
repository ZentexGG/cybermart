import jwt_decode from "jwt-decode";

const decodeToken = (token: string) => {
  try {
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default decodeToken;

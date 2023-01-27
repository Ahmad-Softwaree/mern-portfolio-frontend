import request from "../request";
import { LOGIN_URL } from "../url/url.js";
const loginRequest = async (body) => {
  const response = await request(LOGIN_URL, body);
  return response;
};

export default loginRequest;

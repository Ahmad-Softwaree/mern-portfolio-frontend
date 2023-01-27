import axios from "axios";
import Cookies from "js-cookie";

//standard post request function

const request = async (url, data) => {
  try {
    //get cookies
    const cookie = Cookies.get("admin");

    const res = await axios.post(url, data, {
      headers: {
        "x-auth-token": cookie,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export default request;

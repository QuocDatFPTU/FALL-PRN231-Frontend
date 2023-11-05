import axiosClient from "./axiosClient";

type googlePostType = {
  idToken: String;
};

const authApi = {
  loginWithGoogle(data: googlePostType) {
    const url = "/auths/oauth2";
    return axiosClient.post(url, data);
  },
};

export default authApi;

import axios from "axios";
import type { LoginResponse } from "../types/auth";
import { API_BASE_URL } from "../utils/constants";

const API_URL = API_BASE_URL;

export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const formData = new URLSearchParams();

  formData.append("username", username);
  formData.append("password", password);

  const response = await axios.post<LoginResponse>(
    `${API_URL}/users/login`,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};
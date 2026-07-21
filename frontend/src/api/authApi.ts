import axios from "axios";
import type { LoginResponse, AuthUser } from "../types/auth";
import { API_BASE_URL } from "../utils/constants";

const API_URL = API_BASE_URL;

// Login
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

// Register
export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await axios.post(
    `${API_URL}/users/register`,
    userData
  );

  return response.data;
};

// Get Logged-in User
export const getCurrentUser = async (
  token: string
): Promise<AuthUser> => {
  const response = await axios.get<AuthUser>(
    `${API_URL}/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
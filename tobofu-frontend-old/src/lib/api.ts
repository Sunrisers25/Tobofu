import axios from "axios";
import {
  UserCreateRequest,
  ProfileCreateRequest,
  PreferenceCreateRequest,
  SwipeRequest,
  User,
  MatchProfile,
} from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAPI = {
  registerUser: async (data: UserCreateRequest) => {
    const response = await api.post<User>("/user/create", data);
    return response.data;
  },
  getUsers: async () => {
    const response = await api.get<User[]>("/users");
    return response.data;
  },
};

export const onboardingAPI = {
  createProfile: async (data: ProfileCreateRequest) => {
    const response = await api.post("/profile/create", data);
    return response.data;
  },
  createPreference: async (data: PreferenceCreateRequest) => {
    const response = await api.post("/preference/create", data);
    return response.data;
  },
  uploadPhoto: async (userId: number, file: File) => {
    const formData = new FormData();
    formData.append("user_id", userId.toString());
    formData.append("file", file);

    const response = await api.post("/photo/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export const matchAPI = {
  getMatches: async (userId: number) => {
    const response = await api.get(`/matches/${userId}`);
    return response.data;
  },
  swipe: async (data: SwipeRequest) => {
    const response = await api.post("/swipe", data);
    return response.data;
  },
  getMyMatches: async (userId: number) => {
    const response = await api.get<MatchProfile[]>(`/my-matches/${userId}`);
    return response.data;
  },
};

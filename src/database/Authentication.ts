import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { triggerForm } from "@/shared/InternalService";
import { createAccount } from "@/shared/emailSend";
import instance from "../services/baseServices";
import { getFriendlyErrorMessage } from "@/shared/constant";

dayjs.extend(utc);

const normalizeErrorCode = (error: any) => {
  const backendCode = error?.response?.data?.error?.message || error?.response?.data?.message;
  if (backendCode) {
    return String(backendCode).replace(/-/g, "_").toUpperCase();
  }

  const authCode = error?.code;
  if (authCode) {
    return String(authCode)
      .replace(/^auth\//, "")
      .replace(/-/g, "_")
      .toUpperCase();
  }

  const message = String(error?.message || "");
  const firebaseCodeMatch = message.match(/auth\/([a-z0-9-]+)/i);
  if (firebaseCodeMatch?.[1]) {
    return firebaseCodeMatch[1].replace(/-/g, "_").toUpperCase();
  }

  return "UNKNOWN_ERROR";
};

export const registerUser = async (
  userName: string,
  email: string,
  password: string,
  loginCallBack: Function,
  loginCallBackFail: Function,
  otherInfo = {}
) => {
  try {
    const userResponse = await instance.post("/register", {
      password,
      email,
      name: userName,
      displayName: userName,
      date: dayjs().unix(),
      ...otherInfo,
    });

    triggerForm({
      title: "",
      text: `Successfully Registered`,
      icon: "success",
      confirmButtonText: "OK",
    });

    loginCallBack(userResponse.data);

    createAccount(userName, email);

    return userResponse;
  } catch (error: any) {
    loginCallBackFail();
    triggerForm({
      title: "",
      text: getFriendlyErrorMessage(error?.response?.data?.message || "Oops! Something Weng Wrong."),
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

export const loginUser = async (email: string, password: string, loginCallBack: Function, loginCallBackFail: Function) => {
  try {
    const user = await instance.post(`/login`, {
      email,
      password,
      returnSecureToken: true,
    });

    triggerForm({
      title: "",
      text: "Successfully Logged In",
      icon: "success",
      confirmButtonText: "OK",
    });

    loginCallBack(user.data);
    return user;
  } catch (error: any) {
    triggerForm({
      title: "",
      text: getFriendlyErrorMessage(error?.response?.data?.message || error?.response?.data?.error?.message),
      icon: "error",
      confirmButtonText: "OK",
    });

    loginCallBackFail();
  }
};

export const authenticateWithGoogle = async () => {
  try {
    if (typeof window === "undefined") return null;

    const backendBase = `${process.env.NEXT_PUBLIC_BACKEND_URL || ""}`.trim().replace(/\/$/, "");
    const fallbackStartPath = "/api/auth/google/start";
    const redirectUri = window.location.href;
    const authStartUrl = backendBase
      ? `${backendBase}/auth/google/start?redirectUri=${encodeURIComponent(redirectUri)}`
      : `${fallbackStartPath}?redirectUri=${encodeURIComponent(redirectUri)}`;

    window.location.assign(authStartUrl);
    return null;
  } catch (error: any) {
    triggerForm({
      title: "",
      text: getFriendlyErrorMessage(normalizeErrorCode(error)),
      icon: "error",
      confirmButtonText: "OK",
    });

    return null;
  }
};

export const verifyEmail = async () => {
  try {
    const response = await instance.post("/verifyEmail");

    triggerForm({
      title: "",
      text: "Sent the Email",
      icon: "success",
      confirmButtonText: "OK",
    });

    return response;
  } catch (error: any) {
    triggerForm({
      title: "",
      text: error?.response?.data?.message || error?.response?.data?.error?.message,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

export const resetPassword = async (email: string, setResetLoading: Function) => {
  try {
    const response = await instance.post("/resetPassword", { email });

    triggerForm({
      title: "",
      text: "Reset Email Sent",
      icon: "success",
      confirmButtonText: "OK",
    });

    setResetLoading(false);

    return response;
  } catch (error: any) {
    setResetLoading(false);
    triggerForm({
      title: "",
      text: error?.response?.data?.message || error?.response?.data?.error?.message,
      icon: "error",
      confirmButtonText: "OK",
    });

    return error;
  }
};

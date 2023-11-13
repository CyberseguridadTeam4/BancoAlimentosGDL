import { View, Text } from "react-native";
import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext({
  toastContent: null,
  showToast: false,
  toastTime: 0,
  openToast: (content: any, toastTime: number) => {},
  closeToast: () => {},
});

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }: any) => {
  const [toastContent, setToastContent] = useState(null);
  const [toastTime, setToastTime] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const openToast = (content: any, toastTime: number) => {
    if (!showToast) {
      setToastContent(content);
      setToastTime(toastTime);
      setShowToast(true);
    }
  };

  const closeToast = () => {
    setToastContent(null);
    setToastTime(0);
    setShowToast(false);
  };

  return (
    <ToastContext.Provider
      value={{ toastContent, toastTime, showToast, openToast, closeToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

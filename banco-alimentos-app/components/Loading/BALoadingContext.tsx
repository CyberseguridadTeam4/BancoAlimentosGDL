import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
  showLoading: false,
  openLoading: () => {},
  closeLoading: () => {},
});

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }: any) => {
  const [showLoading, setShowLoading] = useState(false);

  const openLoading = () => {
    setShowLoading(true);
  };

  const closeLoading = () => {
    setShowLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        openLoading,
        closeLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

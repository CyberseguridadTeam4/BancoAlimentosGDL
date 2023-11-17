import React from "react";
import { SheetProvider } from "./Sheet/BASheetContext";
import { ModalProvider } from "./Modal/BAModalContext";
import { ToastProvider } from "./Toast/BAToastContext";
import { LoadingProvider } from "./Loading/BALoadingContext";
import { UserProvider } from "./BAUserContext";

export default function BAContextProviderWrapper({ children }: any) {
  return (
    <UserProvider>
      <LoadingProvider>
        <SheetProvider>
          <ToastProvider>
            <ModalProvider>{children}</ModalProvider>
          </ToastProvider>
        </SheetProvider>
      </LoadingProvider>
    </UserProvider>
  );
}

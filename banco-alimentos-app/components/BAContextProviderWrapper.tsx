import React from "react";
import { SheetProvider } from "./Sheet/BASheetContext";
import { ModalProvider } from "./Modal/BAModalContext";
import { ToastProvider } from "./Toast/BAToastContext";
import { LoadingProvider } from "./Loading/BALoadingContext";

export default function BAContextProviderWrapper({ children }: any) {
  return (
    <LoadingProvider>
      <SheetProvider>
        <ToastProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToastProvider>
      </SheetProvider>
    </LoadingProvider>
  );
}

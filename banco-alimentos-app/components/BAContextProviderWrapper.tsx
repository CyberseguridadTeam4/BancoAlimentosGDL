import React from "react";
import { SheetProvider } from "./Sheet/BASheetContext";
import { ModalProvider } from "./Modal/BAModalContext";
import { ToastProvider } from "./Toast/BAToastContext";

export default function BAContextProviderWrapper({ children }: any) {
  return (
    <SheetProvider>
      <ToastProvider>
        <ModalProvider>{children}</ModalProvider>
      </ToastProvider>
    </SheetProvider>
  );
}

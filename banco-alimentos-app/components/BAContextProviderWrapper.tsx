import React from "react";
import { SheetProvider } from "./Sheet/BASheetContext";
import { ModalProvider } from "./Modal/BAModalContext";

export default function BAContextProviderWrapper({ children }: any) {
  return (
    <SheetProvider>
      <ModalProvider>{children}</ModalProvider>
    </SheetProvider>
  );
}

import { View, Text } from "react-native";
import React, { createContext, useContext, useState } from "react";

const SheetContext = createContext({
  sheetContent: null,
  sheetTitle: "Undefined",
  showSheet: false,
  openSheet: (content: any, title: string) => {},
  closeSheet: () => {},
});

export const useSheet = () => {
  return useContext(SheetContext);
};

export const SheetProvider = ({ children }: any) => {
  const [sheetContent, setSheetContent] = useState(null);
  const [sheetTitle, setSheetTitle] = useState("Undefined");
  const [showSheet, setShowSheet] = useState(false);

  const openSheet = (content: any, title: string) => {
    setSheetContent(content);
    setSheetTitle(title);
    setShowSheet(true);
  };

  const closeSheet = () => {
    setSheetContent(null);
    setSheetTitle("");
    setShowSheet(false);
  };

  return (
    <SheetContext.Provider
      value={{ sheetContent, sheetTitle, showSheet, openSheet, closeSheet }}
    >
      {children}
    </SheetContext.Provider>
  );
};

import { View, Text } from "react-native";
import type { BirdData } from "./BABird";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLoading } from "./Loading/BALoadingContext";
import axios from "../axios";

const BirdContext = createContext({
  birdData: null,
  setBird: (data: any) => {},
  getData: async () => {},
  dispatchInteraction: () => {},
  decreaseApples: () => {},
  decreaseEggs: () => {},
});

export const useBird = () => {
  return useContext(BirdContext);
};

export const BirdProvider = ({ children, birdPointer }: any) => {
  const [birdData, setBirdData] = useState(null);
  const [interactedPosts, setInteractedPosts] = useState(null);

  const { openLoading, closeLoading } = useLoading();

  useEffect(() => {
    getData();
  }, []);

  const setBird = (data: any) => {
    setBirdData(data);
  };

  const getData = async () => {
    openLoading();
    await axios
      .get(
        `https://banco-alimentos-api.vercel.app/getPollito/${birdPointer.objectId}`
      )
      .then((res): any => {
        setBirdData(res.data.pollo);
        console.log(res.data.pollo);
        closeLoading();
      })
      .catch((error) => {
        closeLoading();
      });
  };

  const dispatchInteraction = () => {};

  const decreaseApples = () => {};

  const decreaseEggs = () => {};

  return (
    <BirdContext.Provider
      value={{
        birdData,
        setBird,
        getData,
        dispatchInteraction,
        decreaseApples,
        decreaseEggs,
      }}
    >
      {children}
    </BirdContext.Provider>
  );
};

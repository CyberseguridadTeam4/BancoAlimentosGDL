import { View, Text } from "react-native";
import type { BirdData } from "./BABird";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLoading } from "./Loading/BALoadingContext";
import axios from "../axios";
import { useToast } from "./Toast/BAToastContext";
import BAText, { TypeText } from "./BAText";

const BirdContext = createContext({
  birdData: null,
  setBird: (data: any) => {},
  getData: async () => {},
  dispatchInteraction: (postId: string) => {},
  dispatchFeed: () => {},
  decreaseEggs: () => {},
});

export const useBird = () => {
  return useContext(BirdContext);
};

export const BirdProvider = ({ children, birdPointer }: any) => {
  const [birdData, setBirdData] = useState<any>(null);
  const [interactedPosts, setInteractedPosts] = useState<Array<any>>([]);

  const { openLoading, closeLoading } = useLoading();
  const { openToast } = useToast();

  var interactions = 0;

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

  const dispatchInteraction = (postId: string) => {
    if (birdData) {
      setInteractedPosts([...interactedPosts, [...postId]]);
      interactions++;

      if (interactions >= birdData.nextApple) {
        patchNoAples(true);
        const nextApple = Math.floor(Math.random() * 5) + 3;
        openToast(
          <BAText type={TypeText.label3} style={{ textAlign: "center" }}>
            ¡Has obtenido una galleta!
          </BAText>,
          2500
        );

        // TODO: Set path for nextApple
      }
    }
  };

  const patchNoAples = async (increase: boolean) => {
    const nApple = increase ? birdData.nApple + 1 : birdData.nApple - 1;
    await axios
      .patch(
        `https://banco-alimentos-api.vercel.app/patchPollito/${birdData.objectId}`,
        { nApple }
      )
      .then((res): any => {
        setBirdData(res.data.pollo);
      });
  };

  const dispatchFeed = () => {
    patchNoAples(false);
  };

  const decreaseEggs = () => {};

  return (
    <BirdContext.Provider
      value={{
        birdData,
        setBird,
        getData,
        dispatchInteraction,
        dispatchFeed,
        decreaseEggs,
      }}
    >
      {children}
    </BirdContext.Provider>
  );
};

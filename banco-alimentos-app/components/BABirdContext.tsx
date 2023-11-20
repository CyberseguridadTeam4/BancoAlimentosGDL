import { View, Text } from "react-native";
import type { BirdData } from "./BABird";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLoading } from "./Loading/BALoadingContext";
import axios from "../axios";
import { useToast } from "./Toast/BAToastContext";
import BAText, { TypeText } from "./BAText";
import { useUser } from "./BAUserContext";

const BirdContext = createContext({
  birdData: null,
  setBird: (data: any) => {},
  getData: async () => {},
  dispatchInteraction: (postId: string) => {},
  dispatchFeed: () => {},
  dispatchEggs: async (value: boolean) => -1,
  hatchEgg: false,
  setHatchEgg: (value: boolean) => {},
});

export const useBird = () => {
  return useContext(BirdContext);
};

export const BirdProvider = ({ children, birdPointer }: any) => {
  const [birdData, setBirdData] = useState<any>(null);
  const [interactedPosts, setInteractedPosts] = useState<Array<any>>([]);
  const [hatchEgg, setHatchEgg] = useState(false);

  const { openLoading, closeLoading } = useLoading();
  const { setUser } = useUser();
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
    if (birdPointer) {
      await axios
        .get(`/getPollito/${birdPointer.objectId}`)
        .then((res): any => {
          setBirdData(res.data.pollo);
          closeLoading();
        })
        .catch((error) => {
          closeLoading();
        });
    }
    closeLoading();
  };

  const dispatchInteraction = (postId: string) => {
    if (birdData) {
      setInteractedPosts([...interactedPosts, [...postId]]);
      interactions++;

      if (interactions >= birdData.nextApple) {
        patchNoApples(true);
        const nextApple = Math.floor(Math.random() * 5) + 3;
        patchNextApple(nextApple).then(() => {
          openToast(
            <BAText type={TypeText.label3} style={{ textAlign: "center" }}>
              ¡Has obtenido más alimento!
            </BAText>,
            3000
          );
        });
        interactions = 0;
      }
    }
  };

  const patchNoApples = async (increase: boolean) => {
    const nApple = increase ? birdData.nApple + 1 : birdData.nApple - 1;
    await axios
      .patch(`/patchPollito/${birdData.objectId}`, { nApple })
      .then((res): any => {
        setBirdData(res.data.pollo);
      });
  };

  const dispatchFeed = () => {
    patchNoApples(false);
    if (birdData.nextStage - 1 <= 0) {
      patchNextStage().then(() => {
        setHatchEgg(true);
      });
    } else {
      patchNextStage();
    }
  };

  const patchNextApple = async (nextApple: number) => {
    await axios
      .patch(`/nextApple/${birdData.objectId}`, { nextApple })
      .then((res): any => {
        setBirdData(res.data.pollo);
      });
  };

  const patchNextStage = async () => {
    await axios
      .patch(`/nextStagePollito/${birdData.objectId}`, {
        nextStage: birdData.nextStage - 1,
      })
      .then((res): any => {
        setBirdData(res.data.pollo);
      });
  };

  const dispatchEggs = async (increase: boolean) => {
    return await axios
      .patch(`/eggPollito`, {
        nEggs: increase ? birdData.nEggs + 1 : birdData.nEggs - 1,
      })
      .then((res): any => {
        setBirdData(res.data.pollo);
        setUser(res.data.user);

        return res.data.badge;
      });
  };

  return (
    <BirdContext.Provider
      value={{
        birdData,
        setBird,
        getData,
        dispatchInteraction,
        dispatchFeed,
        dispatchEggs,
        hatchEgg,
        setHatchEgg,
      }}
    >
      {children}
    </BirdContext.Provider>
  );
};

import {
  View,
  Animated,
  StyleSheet,
  Easing,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Svg, { Path, Ellipse } from "react-native-svg";
import BAPallete from "../resources/BAPallete";
import BAView from "./BAView";
import BAText, { TypeText } from "./BAText";
import { useModal } from "./Modal/BAModalContext";
import { useToast } from "./Toast/BAToastContext";
import BAEgg from "./BAEgg";
import BAIcons from "../resources/icons/BAIcons";
import BAIcon from "../resources/icons/BAIcon";
import { useBird } from "./BABirdContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BIRD_COLORS: [string, string][] = [
  [BAPallete.SoftRed, BAPallete.WingRed],
  [BAPallete.SoftOrange, BAPallete.WingOrange],
  [BAPallete.SoftYellow, BAPallete.WingYellow],
  [BAPallete.SoftGreen, BAPallete.WingGreen],
  [BAPallete.SoftSky, BAPallete.WingSky],
  [BAPallete.SoftBlue, BAPallete.WingBlue],
  [BAPallete.SoftPurple, BAPallete.WingPurple],
  [BAPallete.SoftPink, BAPallete.WingPink],
];

export type BirdData = {
  birdData: {
    color: number;
    createdAt: string;
    level: number;
    nApple: number;
    nEggs: number;
    name: string;
    nextStage: number;
    objectId: string;
    updatedAt: string;
    xp: number;
    nextApple: number;
  };
};

type BirdBodyProps = {
  eyeClosed: boolean;
  eyeWink: boolean;
  colors: [string, string];
};

type BirdWIngProps = {
  scaleWingRef: Animated.Value;
  colors: [string, string];
};

type BirdFeetProps = {
  leftFootRefRotation: Animated.AnimatedInterpolation<string | number>;
  rightFootRefRotation: Animated.AnimatedInterpolation<string | number>;
};

type HeartReactionProps = {
  setHeartReaction: (v: boolean) => void;
};

export default function BABird({
  birdData,
  schedulePushNotification,
}: BirdData | any) {
  const [animIsPlaying, setAnimIsPlaying] = useState(false);
  const [hatchAnimControl, setHatchAnimControl] = useState(false);
  const [happyEye, setHappyEye] = useState(false);
  const [winkEye, setWinkEye] = useState(false);
  const [heartReaction, setHeartReaction] = useState(false);
  const [openEgg, setOpenEgg] = useState(false);
  const [nextBadge, setNextBadge] = useState(-1);

  const birdPositionRef = useRef(new Animated.Value(0)).current;
  const birdBodyPositionRef = useRef(new Animated.Value(0)).current;
  const bodyRotationRef = useRef(new Animated.Value(0)).current;
  const scaleWingRef = useRef(new Animated.Value(0)).current;

  const leftFootRef = useRef(new Animated.Value(0)).current;
  const rightFootRef = useRef(new Animated.Value(0)).current;
  const feetAnimation = new Animated.ValueXY({
    x: leftFootRef,
    y: rightFootRef,
  });

  const { dispatchFeed, dispatchEggs, hatchEgg, setHatchEgg } = useBird();
  const { openToast } = useToast();

  useEffect(() => {
    if (hatchAnimControl && hatchEgg) {
      HatchAnimation();
    } else {
      setHatchAnimControl(false);
    }

    (async () => {
      await schedulePushNotification(birdData.name);
      await AsyncStorage.setItem("notificationsSet", "true");
    })();
  }, [hatchAnimControl]);

  const FeedAnimation = useCallback(() => {
    setAnimIsPlaying(true);
    Animated.sequence([
      Animated.timing(bodyRotationRef, {
        toValue: 1,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(bodyRotationRef, {
        toValue: 2,
        duration: 150 / 2,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(bodyRotationRef, {
        toValue: 1,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(bodyRotationRef, {
        toValue: 2,
        duration: 150 / 2,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(bodyRotationRef, {
        toValue: 1,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(bodyRotationRef, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.delay(200).start(() => {
        setHappyEye(true);
        setHeartReaction(true);
      });

      Animated.sequence([
        Animated.timing(scaleWingRef, {
          toValue: 0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 1,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 0,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 1,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 0,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 1,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 0,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 1,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 0,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 1,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.sequence([
        Animated.timing(bodyRotationRef, {
          toValue: 0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bodyRotationRef, {
          toValue: -1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bodyRotationRef, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setHappyEye(false);
        setAnimIsPlaying(false);

        Animated.delay(500).start(() => {
          setHatchAnimControl(true);
        });
      });

      Animated.sequence([
        Animated.timing(feetAnimation, {
          toValue: { x: 0, y: 0 },
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(feetAnimation, {
          toValue: { x: 1, y: -1 },
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(feetAnimation, {
          toValue: { x: 1, y: -1 },
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(feetAnimation, {
          toValue: { x: 0, y: 0 },
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.sequence([
        Animated.timing(birdPositionRef, {
          toValue: 0,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(birdPositionRef, {
          toValue: 2,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(birdPositionRef, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(birdPositionRef, {
          toValue: 2,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(birdPositionRef, {
          toValue: 0,
          duration: 250,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const HatchAnimation = useCallback(() => {
    setAnimIsPlaying(true);
    Animated.delay(200).start(() => {
      setWinkEye(true);
    });

    Animated.sequence([
      Animated.timing(birdBodyPositionRef, {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(birdBodyPositionRef, {
        toValue: -1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(birdBodyPositionRef, {
        toValue: -1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.delay(100).start(() => {
        setWinkEye(false);
        setHappyEye(true);
        dispatchEggs(true);
        openToast(
          <BAText type={TypeText.label3} style={{ textAlign: "center" }}>
            ¡Has obtenido un huevo!
          </BAText>,
          3000
        );
      });

      Animated.timing(birdBodyPositionRef, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      Animated.sequence([
        Animated.timing(scaleWingRef, {
          toValue: 0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 1,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleWingRef, {
          toValue: 0,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.sequence([
        Animated.timing(bodyRotationRef, {
          toValue: 0,
          duration: 10,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bodyRotationRef, {
          toValue: -1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bodyRotationRef, {
          toValue: -1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bodyRotationRef, {
          toValue: 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setHatchEgg(false);
        setHappyEye(false);
        setAnimIsPlaying(false);
      });

      Animated.sequence([
        Animated.timing(feetAnimation, {
          toValue: { x: 0, y: 0 },
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(feetAnimation, {
          toValue: { x: 1, y: -1 },
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(feetAnimation, {
          toValue: { x: 1, y: -1 },
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(feetAnimation, {
          toValue: { x: 0, y: 0 },
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.sequence([
        Animated.timing(birdPositionRef, {
          toValue: 0,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(birdPositionRef, {
          toValue: 2,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(birdPositionRef, {
          toValue: 2,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(birdPositionRef, {
          toValue: 0,
          duration: 250,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const BIRD_BODY_ORIGIN = 500 / 2.5;

  const birdPosition = birdPositionRef.interpolate({
    inputRange: [-1, 0, 1, 2],
    outputRange: [30, 0, -30, -60],
    extrapolate: "identity",
  });

  const birdBodyPosition = birdBodyPositionRef.interpolate({
    inputRange: [-1, 0, 1, 2],
    outputRange: [40, 0, -30, -60],
    extrapolate: "identity",
  });

  const bodyRotation = bodyRotationRef.interpolate({
    inputRange: [-1, 0, 1, 2],
    outputRange: ["-15deg", "0deg", "20deg", "50deg"],
    extrapolate: "identity",
  });

  const rightFootRotation = rightFootRef.interpolate({
    inputRange: [-1, 0, 1, 2, 3],
    outputRange: ["-15deg", "0deg", "15deg", "30deg", "60deg"],
    extrapolate: "identity",
  });

  const leftFootRotation = leftFootRef.interpolate({
    inputRange: [-3, -2, -1, 0, 1],
    outputRange: ["-60deg", "-30deg", "-15deg", "0deg", "15deg"],
    extrapolate: "identity",
  });

  const { openModal } = useModal();

  const noApples = () => {
    openModal(
      <BAText>
        Interactua con usuarios en la sección Posts para obtener manzanas y
        alimentar a tu pajarito
      </BAText>,
      "No tienes manzanas"
    );
  };
  const noEggs = () => {
    openModal(
      <BAText>Alimenta a tu pajarito para obtener huevos</BAText>,
      "No tienes huevos"
    );
  };

  return (
    <>
      {openEgg && (
        <BAEgg nextBadge={nextBadge} onClose={() => setOpenEgg(false)} />
      )}
      <BAView
        title={`Cuarto de ${birdData.name}`}
        style={styles.body}
        isScrolling={false}
      >
        <View
          style={{
            transform: [{ scale: 0.7 }],
            flex: 2,
          }}
        >
          {heartReaction && (
            <HeartsReaction setHeartReaction={setHeartReaction} />
          )}

          <Animated.View
            style={[
              styles.birdContainer,
              {
                transform: [{ translateY: birdPosition }],
                flex: 1,
              },
            ]}
          >
            <BirdFeet
              leftFootRefRotation={leftFootRotation}
              rightFootRefRotation={rightFootRotation}
            />
            <Animated.View
              style={{
                transform: [
                  { translateY: BIRD_BODY_ORIGIN },
                  { translateY: birdBodyPosition },
                  { rotate: bodyRotation },
                  { translateY: -BIRD_BODY_ORIGIN },
                ],
              }}
            >
              <BirdBody
                eyeClosed={happyEye}
                eyeWink={winkEye}
                colors={BIRD_COLORS[birdData.color]}
              />
              <BirdWing
                scaleWingRef={scaleWingRef}
                colors={BIRD_COLORS[birdData.color]}
              />
            </Animated.View>
          </Animated.View>
        </View>
        <View style={styles.debugButtons}>
          <TouchableOpacity
            style={styles.birdButtons}
            onPress={() => {
              if (birdData.nApple > 0) {
                dispatchFeed();
                FeedAnimation();
              } else {
                noApples();
              }
            }}
            disabled={animIsPlaying || hatchEgg}
          >
            <View style={styles.buttonWrapper}>
              <BAIcon
                icon={BAIcons.AppleIcon}
                color={BAPallete.Red01}
                size={60}
              />
              <View style={styles.numberCircle}>
                <BAText style={styles.textCircle}>{birdData.nApple}</BAText>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.birdButtons}
            onPress={async () => {
              if (birdData.nEggs > 0) {
                await dispatchEggs(false).then((res) => {
                  setNextBadge(res);
                  setOpenEgg(true);
                });
              } else {
                noEggs();
              }
            }}
            disabled={animIsPlaying || hatchEgg}
          >
            <View style={styles.buttonWrapper}>
              <BAIcon
                icon={BAIcons.EggIcon}
                color={BAPallete.Red01}
                size={60}
              />
              <View style={styles.numberCircle}>
                <BAText style={styles.textCircle}>{birdData.nEggs}</BAText>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </BAView>
    </>
  );
}

const BirdBody = ({
  eyeClosed = false,
  eyeWink = false,
  colors = [BAPallete.SoftRed, BAPallete.WingRed],
}: BirdBodyProps) => {
  return (
    <Animated.View style={[styles.container, styles.absolute]}>
      <Svg viewBox="0 0 500 400" width={"100%"} height={"100%"}>
        {/* Cola */}
        <Path
          d="M274.842 275.517a5.085 5.085 0 0 0-10.091.705c-4.997 148.455-111.265 257.047-181.619 283.461a5.086 5.086 0 0 0 .112 9.561c83.365 29.083 176.634 32.785 231.512-56.91.081-.131.976-1.224.7-3.378-.058-.455-.449-2.818-1.116-6.735-6.472-37.965-39.498-226.704-39.498-226.704Zm-5.009.876c-5.081 150.942-113.381 261.193-184.914 288.05 81.144 28.309 172.083 32.543 225.5-54.763.183-.299-40.586-233.287-40.586-233.287Z"
          fill={colors[1]}
          transform="rotate(11.49 720.808 62.972) scale(.78666)"
        />
        {/* Pico */}
        <Path
          d="m482.361 239.306-2.893-74.94 80.266 41.054-77.373 33.886Z"
          fill={"#ffae00"}
          stroke={"#ffae00"}
          strokeWidth={"10px"}
          strokeLinecap="round"
          transform="rotate(4.041 1448.158 -223.602) scale(.78666)"
        />
        {/* Cuerpo */}
        <Path
          d="M175.896 493.875c18.099-26.147 68.249-70.576 87.314-140.87 15.649-57.699 10.34-108.968 26.802-152.308 21.396-56.327 60.869-84.293 97.413-83.963 71.24.644 100.383 34.004 97.301 86.547-2.953 50.336-10.259 102.811-10.702 159.378-.426 54.44-37.358 106.449-109.306 134.172-51.182 19.721-118.426 30.075-188.822-2.956Z"
          fill={colors[0]}
          stroke={colors[0]}
          transform="rotate(4.041 1559.212 -189.93) scale(.78666)"
        />
        {/* Ojo */}
        {!(eyeClosed || eyeWink) && (
          <Ellipse
            cx={406.496}
            cy={208.964}
            rx={29.685}
            ry={30.342}
            fill={"#fff"}
            transform="matrix(.7933 .05204 -.05091 .77612 -12.388 -114.977)"
          />
        )}
        {/* Ojo Contento */}
        {eyeClosed && (
          <Path
            d="M313.776 323.27c5.192-16.004 31.565-16.24 34.142 3.76"
            stroke={"#fff"}
            strokeWidth={"15px"}
            strokeLinecap="round"
            fill={"none"}
            transform="matrix(1 0 0 1 -31.195 -260.874)"
          />
        )}
        {eyeWink && (
          <Path
            d="M315 315 L350 330 L315 345"
            stroke={"#fff"}
            strokeWidth={"13px"}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={"none"}
            transform="matrix(1 0 0 1 -31.195 -260.874)"
          />
        )}
      </Svg>
    </Animated.View>
  );
};

const BirdFeet = ({
  leftFootRefRotation,
  rightFootRefRotation,
}: BirdFeetProps) => {
  return (
    <Animated.View style={[styles.container, styles.absolute]}>
      <BirdLeftFoot footRotation={leftFootRefRotation} />
      <BirdRightFoot footRotation={rightFootRefRotation} />
    </Animated.View>
  );
};

const BirdLeftFoot = ({ footRotation }: any) => {
  return (
    <Animated.View
      style={[
        styles.container,
        styles.absolute,
        {
          transform: [
            { translateY: -(100 / 2.5) },
            { rotate: footRotation },
            { translateY: 100 / 2.5 },
          ],
        },
      ]}
    >
      <Svg viewBox="0 0 500 400" width={"100%"} height={"100%"}>
        <Path
          d="m443.743 470-1.621 87.986"
          stroke={"#ffae00"}
          strokeWidth={"40px"}
          strokeLinecap="round"
          transform="matrix(.36011 -.01558 .00663 .8459 36.599 -113.346)"
        />
        <Path
          d="M417.597 560.232h58.354"
          stroke={"#ffae00"}
          strokeWidth={"25px"}
          strokeLinecap="round"
          transform="matrix(.67405 0 0 .78666 -101.473 -79.478)"
        />
      </Svg>
    </Animated.View>
  );
};

const BirdRightFoot = ({ footRotation }: any) => {
  return (
    <Animated.View
      style={[
        styles.container,
        styles.absolute,
        {
          transform: [
            { translateY: -(100 / 2.5) },
            { rotate: footRotation },
            { translateY: 100 / 2.5 },
          ],
        },
      ]}
    >
      <Svg viewBox="0 0 500 400" width={"100%"} height={"100%"}>
        {/* Patita izquierda */}
        <Path
          d="m443.743 470-1.621 87.986"
          stroke={"#ffae00"}
          strokeWidth={"40px"}
          strokeLinecap="round"
          transform="matrix(.36011 -.01834 .00663 .9953 95.766 -198.579)"
        />
        <Path
          d="M417.597 560.232h58.354"
          stroke={"#ffae00"}
          strokeWidth={"25px"}
          strokeLinecap="round"
          transform="matrix(.67405 0 0 .9256 -42.307 -158.73)"
        />
      </Svg>
    </Animated.View>
  );
};

const BirdWing = ({
  scaleWingRef = new Animated.Value(1),
  colors,
}: BirdWIngProps) => {
  const scaleWing = scaleWingRef.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -1],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        styles.absolute,
        {
          transform: [
            { translateY: -50 },
            { scaleY: scaleWing },
            { translateY: 50 },
          ],
        },
      ]}
    >
      <Svg viewBox="0 0 500 400" width={"100%"} height={"100%"}>
        {/* Ala */}
        <Path
          d="M125.106 447.01c-23.565-9.529 76.105-26.452 95.453-98.858 9.779-36.594 35.298-106.646 101.082-104.823 64.013 1.773 86.056 52.425 82.977 92.697-7.485 97.884-166.785 156.568-279.512 110.984Z"
          fill={colors[1]}
          stroke={colors[1]}
          transform="rotate(-2.896 -1497.718 1123.72) scale(.78666)"
        />
      </Svg>
    </Animated.View>
  );
};

const HeartsReaction = ({ setHeartReaction }: HeartReactionProps) => {
  const heartPositionRef = useRef(new Animated.Value(0)).current;
  const heartOpacityRef = useRef(new Animated.Value(0)).current;

  const diagonalPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const negDiagonalPosition = useRef(
    new Animated.ValueXY({ x: 0, y: 0 })
  ).current;

  const HEART_ANIMATION_TIME = 1100;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(heartPositionRef, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(heartPositionRef, {
        toValue: 1,
        duration: HEART_ANIMATION_TIME,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setHeartReaction(false);
    });

    Animated.sequence([
      Animated.timing(heartOpacityRef, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(heartOpacityRef, {
        toValue: 1,
        duration: 700,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(heartOpacityRef, {
        toValue: 2,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setHeartReaction(false);
    });

    Animated.sequence([
      Animated.timing(diagonalPosition, {
        toValue: { x: 30, y: 30 },
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(diagonalPosition, {
        toValue: { x: 80, y: -30 },
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(negDiagonalPosition, {
        toValue: { x: -10, y: 30 },
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(negDiagonalPosition, {
        toValue: { x: -60, y: -100 },
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const heartPosition = heartPositionRef.interpolate({
    inputRange: [0, 1],
    outputRange: [25, -80],
    extrapolate: "identity",
  });

  const heartOpacity = heartOpacityRef.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
    extrapolate: "identity",
  });

  const direction = [-1, 0, 1];

  return (
    <View style={styles.heartContainer}>
      {direction.map((item) => {
        return (
          <Animated.View
            style={[
              styles.heart,
              {
                transform: [
                  {
                    translateY: item != 0 ? diagonalPosition.y : heartPosition,
                  },
                  {
                    translateX:
                      item < 0
                        ? negDiagonalPosition.x
                        : item == 0
                        ? 10
                        : diagonalPosition.x,
                  },
                  { rotate: `${45 * item}deg` },
                ],
                opacity: heartOpacity,
              },
            ]}
            key={item}
          >
            <Svg width={40} height={40} viewBox="0 0 24 24">
              <Path
                d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 0 1-.686 0 16.709 16.709 0 0 1-.465-.252 31.147 31.147 0 0 1-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0 1 14 20.408z"
                fill={BAPallete.Red01}
              />
            </Svg>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    position: "relative",
    justifyContent: "space-around",
  },
  absolute: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    aspectRatio: 1 / 1,
    position: "absolute",
  },
  debugButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 100,
    paddingHorizontal: 50,
    marginBottom: 50,
  },
  birdContainer: {
    flex: 1,
  },
  container: {
    width: "auto",
    aspectRatio: 1 / 1,
  },
  birdButtons: {
    width: "40%",
    aspectRatio: 1 / 1,
    backgroundColor: "white",
    borderRadius: 15,
    shadowRadius: 10,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  numberCircle: {
    backgroundColor: BAPallete.Red01,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 4,
    position: "absolute",
    transform: [{ translateY: 10 }, { translateX: 5 }],
  },
  textCircle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonWrapper: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  heartContainer: {
    flex: 1,
    aspectRatio: 1 / 1,
    alignSelf: "center",
    position: "absolute",
  },
  heart: {
    flex: 1,
    alignSelf: "center",
    position: "absolute",
  },
});

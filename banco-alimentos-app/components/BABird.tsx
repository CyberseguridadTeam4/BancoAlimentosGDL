import { Text, View, Animated, StyleSheet, Easing } from "react-native";
import React, {
  Component,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import Svg, { Path, Ellipse, G } from "react-native-svg";
import BAButton, { ButtonState } from "./BAButton";

type BirdBodyProps = {
  eyeClosed: boolean;
};

type BirdWIngProps = {
  scaleWingRef: Animated.Value;
};

export default function BABird() {
  const [feed, setFeed] = useState(false);
  const [happy, setHappy] = useState(false);
  const [happyEye, setHappyEye] = useState(false);

  const rotateValue = useRef(new Animated.Value(0)).current;
  const scaleWingValue = useRef(new Animated.Value(0)).current;
  const FEED_ANIMATION_DURATION = 150;
  const HAPPY_ANIMATION_DURATION = 150;

  useEffect(() => {
    {
      feed
        ? Animated.sequence([
            Animated.timing(rotateValue, {
              toValue: 1,
              duration: FEED_ANIMATION_DURATION,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(rotateValue, {
              toValue: 2,
              duration: FEED_ANIMATION_DURATION / 2,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(rotateValue, {
              toValue: 1,
              duration: FEED_ANIMATION_DURATION,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(rotateValue, {
              toValue: 2,
              duration: FEED_ANIMATION_DURATION / 2,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(rotateValue, {
              toValue: 1,
              duration: FEED_ANIMATION_DURATION,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(rotateValue, {
              toValue: 0,
              duration: FEED_ANIMATION_DURATION,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(() => {
            setFeed(false);
          })
        : Animated.sequence([
            Animated.timing(rotateValue, {
              toValue: 1,
              duration: FEED_ANIMATION_DURATION,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(rotateValue, {
              toValue: 0,
              duration: FEED_ANIMATION_DURATION,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).reset();
    }
    {
      happy
        ? Animated.sequence([
            Animated.timing(scaleWingValue, {
              toValue: 0,
              duration: HAPPY_ANIMATION_DURATION,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(scaleWingValue, {
              toValue: 1,
              duration: HAPPY_ANIMATION_DURATION / 2,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(scaleWingValue, {
              toValue: 0,
              duration: HAPPY_ANIMATION_DURATION / 2,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(scaleWingValue, {
              toValue: 1,
              duration: HAPPY_ANIMATION_DURATION / 2,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(scaleWingValue, {
              toValue: 0,
              duration: HAPPY_ANIMATION_DURATION,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(() => {
            setHappyEye(false);

            setHappy(false);
          })
        : Animated.sequence([
            Animated.timing(scaleWingValue, {
              toValue: 1,
              duration: HAPPY_ANIMATION_DURATION,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(scaleWingValue, {
              toValue: 0,
              duration: HAPPY_ANIMATION_DURATION,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).reset();
    }
  }, [rotateValue, feed, happy]);

  const spin = rotateValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["0deg", "20deg", "50deg"],
  });

  return (
    <View style={styles.body}>
      <View style={styles.birdContainer}>
        <BirdFeet />
        <Animated.View
          style={{
            transform: [
              { translateY: 500 / 2.5 },
              { rotate: spin },
              { translateY: -(500 / 2.5) },
            ],
          }}
        >
          <BirdBody eyeClosed={happyEye} />
          <BirdWing scaleWingRef={scaleWingValue} />
        </Animated.View>
      </View>
      <View style={styles.debugButtons}>
        <BAButton
          state={ButtonState.alert}
          text="Feed"
          onPress={() => {
            setFeed(true);
          }}
        />
        <BAButton
          state={ButtonState.alert}
          text="Happy"
          onPress={() => {
            setHappy(true);
            setHappyEye(true);
          }}
        />
      </View>
    </View>
  );
}

const BirdBody = ({ eyeClosed = false }: BirdBodyProps) => {
  return (
    <Animated.View style={[styles.container, styles.absolute]}>
      <Svg viewBox="0 0 500 400">
        {/* Cola */}
        <Path
          d="M274.842 275.517a5.085 5.085 0 0 0-10.091.705c-4.997 148.455-111.265 257.047-181.619 283.461a5.086 5.086 0 0 0 .112 9.561c83.365 29.083 176.634 32.785 231.512-56.91.081-.131.976-1.224.7-3.378-.058-.455-.449-2.818-1.116-6.735-6.472-37.965-39.498-226.704-39.498-226.704Zm-5.009.876c-5.081 150.942-113.381 261.193-184.914 288.05 81.144 28.309 172.083 32.543 225.5-54.763.183-.299-40.586-233.287-40.586-233.287Z"
          fill={"#b71f1f"}
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
          fill={"#df5959"}
          stroke={"#df5959"}
          transform="rotate(4.041 1559.212 -189.93) scale(.78666)"
        />
        {/* Ojo */}
        {!eyeClosed && (
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
      </Svg>
    </Animated.View>
  );
};

const BirdFeet = () => {
  return (
    <Animated.View style={[styles.container, styles.absolute]}>
      <Svg viewBox="0 0 500 400">
        {/* Patita izquierda */}
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

const BirdWing = ({ scaleWingRef = new Animated.Value(1) }: BirdWIngProps) => {
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
      <Svg viewBox="0 0 500 400">
        {/* Ala */}
        <Path
          d="M125.106 447.01c-23.565-9.529 76.105-26.452 95.453-98.858 9.779-36.594 35.298-106.646 101.082-104.823 64.013 1.773 86.056 52.425 82.977 92.697-7.485 97.884-166.785 156.568-279.512 110.984Z"
          fill={"#b71f1f"}
          stroke={"#b71f1f"}
          transform="rotate(-2.896 -1497.718 1123.72) scale(.78666)"
        />
      </Svg>
    </Animated.View>
  );
};

// Hooks

// export const useFeedAnimation = useCallback(() => {}, []);

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  absolute: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    aspectRatio: 1 / 1,
    position: "absolute",
  },
  debugButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  birdContainer: {
    width: "auto",
    aspectRatio: 1 / 1,
  },
  container: {
    width: "auto",
    aspectRatio: 1 / 1,
  },
});

import {
  Blur,
  Canvas,
  RadialGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { height, width } = Dimensions.get("screen");

const VISUAL_CONFIG = {
  blur: 9,
  center: {
    x: width / 2,
    y: height / 2,
  },
} as const;

export function Gradient() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <RadialGradient
            c={vec(128, 128)}
            r={128}
            colors={[
              Colors.mediumBlue,
              Colors.lightBlue,
              Colors.teal,
              Colors.iceBlue,
              Colors.white,
            ]}
          />
          <Blur blur={VISUAL_CONFIG.blur} mode={"clamp"} />
        </Rect>
      </Canvas>
    </View>
  );
}

const Colors = {
  white: "#fff",
  teal: "#5AC8FA",
  mediumBlue: "#007AFF",
  lightBlue: "#4DA6FF",
  iceBlue: "#E6F3FF",
};

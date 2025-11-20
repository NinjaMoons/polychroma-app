// components/ColorCircle.tsx
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

type ColorCircleProps = {
  color: string;
  onPress: () => void;
};

export default function ColorCircle({ color, onPress }: ColorCircleProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.circle, { borderColor: color }]}>
        <View style={[styles.innerCircle, { backgroundColor: color }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  innerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

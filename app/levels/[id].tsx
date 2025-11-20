// app/levels/[id].tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { useLocalSearchParams } from 'expo-router';
import ColorCircle from '../../components/ColorCircle';
import { mixColors, rgbToStyle, isColorMatch, baseColors, Color } from '../../utils/colorMixer';
import { Audio } from 'expo-av';

export default function LevelScreen() {
  const { id } = useLocalSearchParams();
  const level = Number(id);

  const [colors, setColors] = useState<Color[]>([
    baseColors.red,
    baseColors.green,
    baseColors.blue,
  ]);
  const [mixedColors, setMixedColors] = useState<Color[]>([]);
  const [selected, setSelected] = useState<{ color: Color; index: number }[]>([]);
  const [ratio, setRatio] = useState(0.5);
  const [targetColor, setTargetColor] = useState<Color>(baseColors.red);

  // Звук смешивания
  async function playSound() {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(require('../../assets/sound/mix.wav'));
      await sound.playAsync();
    } catch (e) {
      console.log('Ошибка воспроизведения звука:', e);
    }
  }

  // Сброс массива цветов и генерация targetColor при смене уровня
  useEffect(() => {
    setColors([baseColors.red, baseColors.green, baseColors.blue]);
    setMixedColors([]);
    setSelected([]);
    setRatio(0.5);

    // Генерация targetColor с ростом сложности
    const allColors = [baseColors.red, baseColors.green, baseColors.blue];
    const c1 = allColors[Math.floor(Math.random() * allColors.length)];
    const c2 = allColors[Math.floor(Math.random() * allColors.length)];
    const targetRatio = Math.max(0.3, Math.min(0.7, 0.5 + (level - 1) * 0.05));
    setTargetColor(mixColors(c1, c2, targetRatio));
  }, [level]);

  const handlePress = (index: number) => {
    const color = index < colors.length ? colors[index] : mixedColors[index - colors.length];
    const newSelected = [...selected, { color, index }];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [c1, c2] = newSelected;
      const mixed = mixColors(c1.color, c2.color, ratio);
      setMixedColors([...mixedColors, mixed]);
      setSelected([]);
      playSound();

      if (isColorMatch(mixed, targetColor)) {
        Alert.alert('Поздравляем!', 'Вы получили целевой цвет!');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.level}>Level {level}</Text>

      {/* Целевой цвет */}
      <View style={styles.targetContainer}>
        <Text style={styles.hint}>Цель:</Text>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 3,
            borderColor: '#000',
            backgroundColor: rgbToStyle(targetColor),
            marginLeft: 10,
          }}
        />
      </View>

      {/* Исходные и смешанные цвета */}
      <View style={styles.row}>
        {colors.map((c, i) => (
          <ColorCircle key={i} color={rgbToStyle(c)} onPress={() => handlePress(i)} />
        ))}

        {mixedColors.map((c, i) => (
          <ColorCircle
            key={i + colors.length}
            color={rgbToStyle(c)}
            onPress={() => handlePress(i + colors.length)}
          />
        ))}
      </View>

      <Text>Процент смешивания: {(ratio * 100).toFixed(0)}%</Text>
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={ratio}
        onValueChange={setRatio}
        step={0.05}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', paddingTop: 50, backgroundColor: '#fff' },
  level: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
  hint: { fontSize: 18 },
  row: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  targetContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
});

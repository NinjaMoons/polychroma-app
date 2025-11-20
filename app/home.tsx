import React from 'react';
import { View, Text, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { Link } from 'expo-router';

// Предположим, что файл фонового изображения называется background.jpg
// и лежит в папке assets/images
const backgroundImage = require('../assets/images/main.jpg');

export default function HomeScreen() {
  return (
    <ImageBackground
      source={backgroundImage} // здесь указываем путь к изображению
      style={styles.container} // стиль контейнера
      resizeMode="cover" // изображение будет растянуто, чтобы покрыть весь экран
    >
      <Text style={styles.title}>🎨 PolyChroma</Text>

      <Link href={`/levels/1`} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Начать / Продолжить</Text>
        </Pressable>
      </Link>

      <Link href="/levels" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Выбрать уровень</Text>
        </Pressable>
      </Link>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  title: { 
    fontSize: 36, 
    fontWeight: 'bold', 
    marginBottom: 50, 
    color: '#fff', // текст на фоне лучше сделать белым, чтобы был читаемым
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  button: { 
    backgroundColor: 'rgba(74,144,226,0.8)', // немного прозрачный, чтобы фон просвечивал
    padding: 15, 
    marginVertical: 10, 
    borderRadius: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    textAlign: 'center' 
  },
});

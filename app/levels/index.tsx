import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function LevelSelector() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Выбор уровня</Text>
      {Array.from({ length: 10 }, (_, i) => (
  <Link key={i} href={`/levels/${i + 1}`} asChild>
    <Pressable style={styles.levelButton}>
      <Text style={styles.levelText}>Уровень {i + 1}</Text>
    </Pressable>
  </Link>
))}

  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 40, backgroundColor: '#fafafa' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  levelButton: { width: 240, padding: 15, backgroundColor: '#7ed321', borderRadius: 10, marginVertical: 8 },
  levelText: { color: '#fff', textAlign: 'center', fontSize: 18 },
});

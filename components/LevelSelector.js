// components/LevelSelector.js
import React from 'react';
import { View, Button, FlatList } from 'react-native';

export default function LevelSelector({ navigation, levelsUnlocked = 1 }) {
    const levels = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <FlatList
            data={levels}
            numColumns={2}
            renderItem={({ item }) => (
                <Button
                    title={`Level ${item}`}
                    disabled={item > levelsUnlocked}
                    onPress={() => navigation.navigate('LevelScreen', { level: item })}
                />
            )}
            keyExtractor={item => item.toString()}
        />
    );
}

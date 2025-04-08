import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  type GestureResponderEvent,
  type NativeSyntheticEvent,
  type TargetedEvent,
} from 'react-native';
import { newColors as Colors } from '../constants/colors';

type TilesProps = {
  numHorizontal: number;
  textArray: string[];
  theme: 'light' | 'dark';
};

export const Tiles: React.FC<TilesProps> = ({
  numHorizontal,
  textArray,
  theme,
}) => {
  function handlePress(event: GestureResponderEvent, tileName: string): void {
    if (event) '';
    console.log(
      'Tile pressed: ',
      //   event.nativeEvent.locationX,
      //   event.nativeEvent.locationY,
      tileName
    );
  }
  function handleBlur(event: NativeSyntheticEvent<TargetedEvent>): void {
    if (event) '';
    console.log('Tile lost focus');
  }

  const numVertical = textArray.length / numHorizontal;
  const numbersArray = Array.from(
    { length: numVertical + 1 },
    (_, index) => index + 1
  );

  return (
    <View>
      {numbersArray.map((i) => (
        <View key={i} style={styles.tylesStyleHorizontal}>
          {/* <Text>Row {i}</Text> */}
          {Array(numHorizontal)
            .fill(0)
            .map((_, j) => (
              <Pressable
                key={`${i}.${j}`}
                onPressIn={(e) =>
                  handlePress(e, textArray[j + 2 * (i - 1)] ?? '')
                }
                onBlur={handleBlur}
              >
                {textArray.length > j + 2 * (i - 1) && (
                  <View
                    style={[
                      styles.tylesStyleVertical,
                      {
                        backgroundColor:
                          Colors[theme ? theme : 'dark'].bg_input,
                      },
                    ]}
                  >
                    <Text> {textArray[j + 2 * (i - 1)]}</Text>
                  </View>
                )}
              </Pressable>
            ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tylesStyleHorizontal: {
    flexDirection: 'row',
  },
  tylesStyleVertical: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'red',
    width: 100,
    height: 100,
  },
});

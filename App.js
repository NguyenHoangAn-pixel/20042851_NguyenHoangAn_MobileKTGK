import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing, PanResponder } from 'react-native';

const App = () => {
  const textOpacity = useRef(new Animated.Value(0)).current;
  const ballPosition = useRef(new Animated.Value(-100)).current;
  const squareScale = useRef(new Animated.Value(1)).current;
  const rotatingSquareContinuous = useRef(new Animated.Value(0)).current;
  const rotatingSquareSingle = useRef(new Animated.Value(0)).current;
  const colorChangingCircle = useRef(new Animated.Value(0)).current;
  const circlePan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    Animated.timing(ballPosition, {
      toValue: 200, 
      useNativeDriver: true,
    }).start();

    Animated.spring(squareScale, {
      toValue: 2, 
      friction: 2,
      tension: 40,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(rotatingSquareContinuous, {
        toValue: 10,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(colorChangingCircle, {
        toValue: 4,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const simpleAnimation1 = Animated.timing(rotatingSquareSingle, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    
    const simpleAnimation2 = Animated.timing(rotatingSquareSingle, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    
    const simpleAnimation3 = Animated.timing(rotatingSquareSingle, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    Animated.loop(
      Animated.sequence([
        simpleAnimation1,
        simpleAnimation2,
        simpleAnimation3,
      ])
    ).start();
    
  }, []);

  const rotatingSquareContinuousStyle = {
    transform: [
      {
        rotate: rotatingSquareContinuous.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const circleColor = colorChangingCircle.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['green', 'red', 'purple', 'yellow', 'green'],
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: circlePan.x, dy: circlePan.y },
    ]),
    onPanResponderRelease: () => {
      Animated.spring(circlePan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start();
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Text style={{ opacity: textOpacity }}>
        You are Welcome!
      </Animated.Text>

      <Animated.View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: 'blue',
          marginTop: ballPosition,
        }}
      />

      <Animated.View
        style={[
          {
            width: 50,
            height: 50,
            backgroundColor: 'red',
            marginTop: 20,
          },
          rotatingSquareContinuousStyle,
        ]}
      />

      <Animated.View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: circleColor,
          marginTop: 20,
          transform: [{ translateX: circlePan.x }, { translateY: circlePan.y }],
        }}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

export default App;

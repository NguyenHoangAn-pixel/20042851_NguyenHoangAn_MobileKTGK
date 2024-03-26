import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';

const App = () => {
  const textOpacity = useRef(new Animated.Value(0)).current;
  const ballPosition = useRef(new Animated.Value(-100)).current;
  const squareScale = useRef(new Animated.Value(1)).current;
  const rotatingSquareContinuous = useRef(new Animated.Value(0)).current;
  const rotatingSquareSingle = useRef(new Animated.Value(0)).current;
  const colorChangingCircle = useRef(new Animated.Value(0)).current;

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

    // Hiệu ứng lò xo cho hình vuông
    Animated.spring(squareScale, {
      toValue: 2, 
      friction: 2,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Hiệu ứng xoay liên tục cho hình vuông
    Animated.loop(
      Animated.timing(rotatingSquareContinuous, {
        toValue: 10,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
      // Hiệu ứng đổi màu cho hình tròn
    Animated.loop(
      Animated.timing(colorChangingCircle, {
        toValue: 4,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    
  }, []);

 

  // Tạo hiệu ứng xoay liên tục cho hình vuông
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

// Tạo chuỗi màu cho hình tròn
const circleColor = colorChangingCircle.interpolate({
  inputRange: [0, 0.25, 0.5, 0.75, 1],
  outputRange: ['green', 'red', 'purple', 'yellow', 'green'],
});
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Dòng text */}
      <Animated.Text style={{ opacity: textOpacity }}>
        You are Welcome!
      </Animated.Text>

      {/* Quả bóng */}
      <Animated.View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: 'blue',
          marginTop: ballPosition,
        }}
      />

      {/* Hình vuông với hiệu ứng xoay liên tục */}
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

       {/* Hình tròn */}
       <Animated.View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: circleColor,
          marginTop: 20,
        }}
      />

     
    </View>
  );
};

export default App;

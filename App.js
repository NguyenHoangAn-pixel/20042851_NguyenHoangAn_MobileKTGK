import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

const App = () => {
  const textOpacity = useRef(new Animated.Value(0)).current;
  const ballPosition = useRef(new Animated.Value(-100)).current;
  const squareScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

      // Hiệu ứng di chuyển quả bóng
      Animated.timing(ballPosition, {
        toValue: 200, // vị trí mới của quả bóng
        duration: 3000,
        useNativeDriver: true,
      }).start();
  }, []);

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

     
    </View>
  );
};

export default App;

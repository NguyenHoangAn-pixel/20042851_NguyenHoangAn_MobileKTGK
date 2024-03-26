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
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Dòng text */}
      <Animated.Text style={{ opacity: textOpacity }}>
        You are Welcome!
      </Animated.Text>

     
    </View>
  );
};

export default App;

import React from 'react';
import {LogBox, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/stacks/MainStack.js';
import UserContextProvider from './src/contexts/UserContext';
import {NativeBaseProvider} from 'native-base';
import {nativeBaseTheme} from './src/theme/index';

export default App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <UserContextProvider>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </NativeBaseProvider>
    </UserContextProvider>
  );
};

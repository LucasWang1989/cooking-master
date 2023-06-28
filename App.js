import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigation/Navigator';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux'
import configureStore from "./store/store";
import 'deprecated-react-native-prop-types';
import "./common/global";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function App() {
    const store = configureStore();

  return (
      <Provider store={store}>
              <NavigationContainer>
                  <Navigator/>
              </NavigationContainer>
      </Provider>
  );
}

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { Settings } from 'react-native-fbsdk-next';

Settings.setAppID('128902393487286');
Settings.initializeSDK();

AppRegistry.registerComponent(appName, () => App);

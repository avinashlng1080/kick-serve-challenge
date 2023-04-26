import { AppRegistry } from 'react-native'

import App from './App'
import DBManager from './app/database/manager'
import { name as appName } from './app.json'

// Init Database
DBManager.init()

AppRegistry.registerComponent(appName, () => App)

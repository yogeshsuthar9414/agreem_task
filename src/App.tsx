import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import RootNavigator from './navigation';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './theme/ThemeProvider';
// import Toast from "react-native-toast-message";

function App() {

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </ThemeProvider>

      {/* <Toast /> */}
    </SafeAreaProvider>
  );
}


export default App;

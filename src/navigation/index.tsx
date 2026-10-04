import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import storageService from '../services/storage/storageService'
import { login } from '../store/slices/authSlice'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import { ROUTES } from './routes'
import BottomTabNav from './tabs/BottomNav'
import Splash from '../features/authentication/screens/Splash'

const RootNavigator = () => {

  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator<RootStackParamList>();

  useEffect(() => {
    const initialize = async () => {
      const token = await storageService.provideToken();

      if (token) {
        dispatch(login());
      }
    };

    initialize();
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.SPLASH} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.SPLASH} component={Splash} />
        <Stack.Screen name={ROUTES.MAIN} component={BottomTabNav} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
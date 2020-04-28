import React, { useEffect } from 'react';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import io from 'socket.io-client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
//Components
import Login from './Components/Login';
import Home from './Components/Home';
import Chats from './Components/Chats';
import Signup from './Components/Signup';

const AuthContext = React.createContext();
const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );


  useEffect(() => {
    io('http://192.168.1.82:1400', { forceNode: true });

    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        console.log('An error occured retreiving value...')
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, [])

  let [isLoaded] = useFonts({
    'Orbitron-Medium': require('./assets/fonts/Orbitron-Medium.ttf'),
    'SF-Pro-Display-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
  });

  if (!isLoaded) {
    return <AppLoading />
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.userToken == null ? (
            <>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Signup' component={Signup} />
            </>
          ) : (
              <>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Chats' component={Chats} />
              </>
            )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

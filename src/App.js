// In App.js in a new project
import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserIndex from './views/UserIndex';
import UserStore from './views/UserStore';
import UserUpdate from './views/UserUpdate';
import AppHeaderTitle from './views/components/header/HeaderApp';
import OnboardingScreen from './views/components/screen/OnboardingScreen';

// Constante para o estilo do cabeçalho
const headerStyle = {
  backgroundColor: '#000',
};

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='OnboardingScreen'>
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserIndex"
        component={UserIndex}
        options={{
          headerStyle,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: (props) => <AppHeaderTitle {...props} />,
        }}
      />
      <Stack.Screen name="UserStore" component={UserStore} options={{
        headerStyle,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: (props) => <AppHeaderTitle {...props} />,
      }} />
      <Stack.Screen name="UserUpdate" component={UserUpdate} options={{
        headerStyle,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: (props) => <AppHeaderTitle {...props} />,
      }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

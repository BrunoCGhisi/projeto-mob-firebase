import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Details from './src/pages/Details';
import Login from './src/pages/Login';
import NewTask from './src/pages/NewTask';
import NewUser from './src/pages/Task';
import Task from './src/pages/Task';



export default function App() {
  Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >
      <Stack.Screen 
          name={'Login'} 
          component={Login}
          options={{headerShow:false}}
        />
        <Stack.Screen 
          name={'NewUser'} 
          component={NewUser}
          options={{headerShow:false}}
        />
        <Stack.Screen 
          name={'NewTask'} 
          component={NewTask}
          options={{headerLeft:null}}
        />
        <Stack.Screen 
          name={'Detail'} 
          component={Details}
        />
        <Stack.Screen 
          name={'Task'} 
          component={Task}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



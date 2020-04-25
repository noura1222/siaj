import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ChatScreen from './src/screens/ChatScreen/ChatScreen';




const DetailsScreen = ({ route, navigation }) => {
  /* 2. Get the param */
  const { itemId } = route.params;
  const { homeScreenCounter } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>homeScreenCounter: {JSON.stringify(homeScreenCounter)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Update the title"
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
      />
      <Button title="Reset the title"
        onPress={() => navigation.setOptions({ title: route.params.name })}
      />
      <Button title="chage header title"
        onPress={() => navigation.setOptions({ headerTitle: () => <LogoTitle /> })}
      />
      <Button
        onPress={() => navigation.navigate('MyModal')}
        title="Open Modal"
      />
      <Button title="open chat" onPress={() => navigation.navigate('Chat')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const ModalScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{ uri: "https://static.expo.dev/static/brand/square-512x512.png" }}
    />
  );
}


const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  const [user, setUser] = useState(null);

  const getUserFromLogin = async (user) => {
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    }
  }

  useEffect(() => {
    const getUserFromStorage = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setUser(user)
      }
    }
  }, [user])

  return (
    <MainStack.Navigator initialRouteName={user === null ? "Login" : "Home"}
      screenOptions={{
        headerBackTitle: "come back",
        // headerRight: () => (
        //   <Button
        //     onPress={() => alert('This is a button!')}
        //     title="Info"
        //     color="#fff"
        //   />
        // ),
        headerStyle: {
          backgroundColor: '#2d2d2d',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {user === null ?
        <MainStack.Screen name="Login" component={LoginScreen} initialParams={{ getUser: getUserFromLogin }} />
        : <>
          <MainStack.Screen name="Home" component={HomeScreen} initialParams={{ user }} options={{
            title: 'My home',
            headerStyle: {
              // backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }} />
          <MainStack.Screen options={({ route }) => ({ title: route.params.name })} name="Details" component={DetailsScreen} />
          <MainStack.Screen name="Chat" component={ChatScreen} />
        </>}
    </MainStack.Navigator >
  )
}

const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="MyModal" component={ModalScreen} />
    </RootStack.Navigator>
  );
}

export default App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import locationService from '../utils/locationServeis';

import CountDistance from '../utils/CountDistance';






export default HomeScreen = ({ navigation, route }) => {
    const [distancet, setDistance] = useState(0);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });





    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <View style={{ display: 'none' }}>
    //                 <Button onPress={() => setCount(c => c + 1)} title="Update count" />
    //                 <Button onPress={() => setCount(c => c + 1)} title="Update count" />
    //             </View>
    //         ),
    //     });
    // }, [navigation, setCount]);

    useEffect(() => {
        locationService.subscribersDistance(setDistance)

        locationService.subscribe(setLocation)
        const _getLocationPermission = async () => {

            // ask for permissions.
            const { status } = await Permissions.askAsync(
                Permissions.LOCATION,
                Permissions.USER_FACING_NOTIFICATIONS
            )

            if (status !== 'granted') {
                console.log("Location Permission Denied.");
                setLocation({ error: "Location Permission Denied." });
            };

            console.log("Get Location Permission: ", status);

            // start location task in the background.
            await Location.startLocationUpdatesAsync("background-location-task", { accuracy: Location.Accuracy.Highest })
        }
        _getLocationPermission();

        return () => {
            locationService.unsubscribe(setLocation)
        }
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Text>User: {route.params?.user.userId}</Text>
            {location.latitude !== 0 ?
                <Text>User Location: {JSON.stringify(location)}</Text> : null}
            <Text>Distance from home: {distancet}</Text>
            <Button
                title="Go to Details"
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Details', {
                        itemId: 86,
                        homeScreenCounter: 1,
                    });
                }}
            />
            <Button
                onPress={() => navigation.navigate('MyModal')}
                title="Open Modal"
            />
            <Button
                onPress={() => navigation.navigate('Chat')}
                title="Chat"
            />
            <Button
                onPress={() => {
                    console.log(route.params?.user)
                }}
                title="log user"
            />
        </View>
    );
}



TaskManager.defineTask("background-location-task", async ({ data, error }) => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    console.log("user:: ", user);
    console.log("user.homeLocation:: ", user.homeLocation);

    const isUserInHome = (newLocation) => {

        console.log("user.homeLocation ", user.homeLocation);

        const Distance = CountDistance(newLocation, user.homeLocation, "M")
        console.log("Distance ", Distance);
        locationService.setDistance(Distance)

        if (Distance > user.radiusInMeter) {
            // send vaiolation.
            console.log("user is out of his home");
        } else {
            console.log("User in home");
        }
    }

    if (error) {
        // Error occurred - check `error.message` for more details.
        // setLocation(JSON.stringify(locations))
        console.log("error", error);

        return;
    }
    if (data) {
        // do something with the locations captured in the background
        const { latitude, longitude } = data.locations[0].coords
        isUserInHome({ latitude, longitude })
        locationService.setLocation({
            latitude,
            longitude
        })
    }
});
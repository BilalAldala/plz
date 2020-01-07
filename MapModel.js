import React, { Component } from "react";
import {
    Modal,
    Platform,
    Text,
    View,
    Linking,
    Button,
    StyleSheet,
    AsyncStorage,
    TouchableHighlight, TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal2 from './Modal'
const { Marker } = MapView;
const STORAGE_KEY = "@STHML_PARK_Locations";
let locationData;


class MapModel extends Component {
    constructor() {
        super();
        this.state = {
            testArray: [],
            STHML_PARK_Locations: null,
            allData: null,
            location: null,
            errorMessage: null,
            latitude: null,
            longitude: null,
            locations: [{ longitude: null, latitude: null, distance: null }],
            locationLoaded: false,
            visible: false
        };
    }
    async retrieveData() {
        try {
            const STHML_PARK_Locations = await AsyncStorage.getItem(STORAGE_KEY);
            if (STHML_PARK_Locations !== null) {
                //console.log("111");
                //console.log(STHML_PARK_Locations)
                //this.setState({ STHML_PARK_Locations });
                //console.log(this.state.STHML_PARK_Locations)
                //console.log("111");
                return STHML_PARK_Locations;
            } else {
                console.log("First > Time");
                return this.fetchLocation;
            }
        } catch (e) {
            alert("Failed to load name.");
        }
    }

    save = async STHML_PARK_Locations => {
        try {
            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(STHML_PARK_Locations)
            );
            this.setState({ STHML_PARK_Locations });
        } catch (e) {
            alert("Failed to save f´to file.");
        }
    };

    async fetchParkinLocation() {
        fetch(
            "https://openparking.stockholm.se/LTF-Tolken/v1/ptillaten/within?radius=100&lat=59.32784&lng=18.05306&outputFormat=json&apiKey=f7e487cd-1921-46a3-aaa5-95e38127e6a2"
        )
            .then(response => response.json())
            .then(allData => {
                allData.features.map(location => {
                    const id = location.id;
                    const longitude = location.geometry.coordinates[0][0];
                    const latitude = location.geometry.coordinates[0][1];
                    const title = location.properties.ADDRESS;
                    const description = "description";
                    const a = { id, longitude, latitude, title, description };
                    this.state.testArray.push(a);
                });
                this.save(this.state.testArray);
            });
    }

    getDirection(location) {
        const latitude = location.latitude;
        const longitude = location.longitude;
        //const label = "New York, NY, USA";

        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${latitude},${longitude}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });


        Linking.openURL(url);
    }

    async getDistanceOneToOne(lat1, lng1, lat2, lng2) {
        const Location1Str = lat1 + "," + lng1;
        const Location2Str = lat2 + "," + lng2;
        const GOOGLE_API_KEY = "AIzaSyCdtgipOXd3oNKNmCyouxZuDWINJpZqFNM";
        let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

        let params = `origins=${Location1Str}&destinations=${Location2Str}&key=${GOOGLE_API_KEY}`; // you need to get a key
        let finalApiURL = `${ApiURL}${encodeURI(params)}`;

        let fetchResult = await fetch(finalApiURL); // call API
        let Result = await fetchResult.json(); // extract json

        fetchResult
            .then(response => response.json())
            .then(allData => {
                console.log(allData);
            });

        return Result.rows[0].elements[0].distance;
    }

    async getDistanceOneToOne(lat1, lon1, lat2, lon2, unit) {
        lat1 = 59.341641;
        lon1 = 18.071762;
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        if (unit == "M") {
            dist = dist * 0.8684;
        }
        return dist;
    }

    getCurrentPosition = async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                this.setState({
                    errorMessage: 'Permission to access location was denied',
                });
            }

            let coords = await (await Location.getCurrentPositionAsync({})).coords;
            let location = { longitude: coords.longitude, latitude: coords.latitude };
            //let location = await (await Location.getCurrentPositionAsync({}));

            this.setState({ location });
            return location;
        }
    }

    render() {
        this.getCurrentPosition();
        let text = 'Waiting..';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }
        return (
            <View>
                <Text >{text}</Text>
                <Button
                    title="Press me"
                    onPress={() => this.getDirection(this.state.location)}
                />
            </View>
        );
    }
}
export default MapModel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
});
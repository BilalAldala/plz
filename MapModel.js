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
const STORAGE_KEY_Locations = "@STHML_PARK_Locations";
const STORAGE_KEY_Choosed_Location = "@STHML_PARK_Choosed_Location";
const STORAGE_KEY_Settings = "@STHML_PARK_Settings";

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
            visible: false,
            radius: null
        };
    }
    async retrieveData() { 
        try {
            const STHML_PARK_Locations = await AsyncStorage.getItem(STORAGE_KEY_Locations);
            if (STHML_PARK_Locations !== null) {
                console.log("First > Time");

                //console.log("111");
                //console.log(STHML_PARK_Locations)
                //this.setState({ STHML_PARK_Locations });
                //console.log(this.state.STHML_PARK_Locations)
                //console.log("111");
                this.fetchParkinLocation(59.32784,18.05306);
                return STHML_PARK_Locations;
            } else {
                console.log("First > Time");
                return this.fetchParkinLocation(59.32784,18.05306);
            }
        } catch (e) {
            alert("Failed to load name.");
        }
    }

    save = async STHML_PARK_Locations => {
        try {
            await AsyncStorage.setItem(
                STORAGE_KEY_Locations,
                JSON.stringify(STHML_PARK_Locations)
            );
            this.setState({ STHML_PARK_Locations });
        } catch (e) {
            alert("Failed to save f´to file.");
        }
    };

    async fetchParkinLocation(latitude,longitude) {

        console.log(latitude)
        let radius;
        await AsyncStorage.getItem(STORAGE_KEY_Settings).then(data => {
            //this.setState({ radius: JSON.parse(data).vehicle });
            radius=(JSON.parse(data).distance)
            console.log(radius)
          });;

        const link="https://openparking.stockholm.se/LTF-Tolken/v1/ptillaten/within?radius="+radius+"&lat="+latitude+"&lng="+longitude+"&outputFormat=json&apiKey=f7e487cd-1921-46a3-aaa5-95e38127e6a2";

        fetch(
            link
        )
            .then(response => response.json())
            .then(allData => {
                allData.features.map(location => {
                    const id = location.id;
                    const longitude = location.geometry.coordinates[0][0];
                    const latitude = location.geometry.coordinates[0][1];
                    const ADDRESS = location.properties.ADDRESS;
                    const CITY_DISTRICT = location.properties.CITY_DISTRICT;
                    const OTHER_INFO=location.properties.OTHER_INFO;
                    const DISTANCE=this.getDistanceOneToOne(59.19858,17.83317,59.2000008,17.8999996)
                    const a = { id, longitude, latitude, ADDRESS,CITY_DISTRICT, OTHER_INFO,  DISTANCE};
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
        const GOOGLE_API_KEY = "AIzaSyAg0OKC_z6_2Q9ZO0LWFpu0_44giDXXKFs";
        let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

        let params = `origins=${Location1Str}&destinations=${Location2Str}&key=${GOOGLE_API_KEY}`; // you need to get a key
        let finalApiURL = `${ApiURL}${encodeURI(params)}`;

        let Result;
        let fetchResult = await fetch(finalApiURL).then(response => response.json())
        .then(allData => {
            Result=allData.rows[0].elements[0].distance.value
        }); // call API
        return Result;
    }

    async getDistanceOneToOne2(lat1, lon1, lat2, lon2, unit) {
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
        let text2
        this.getDistanceOneToOne(59.19858,17.83317,59.2000008,17.8999996)
        .then(allData => {
            text2=(allData)
        });;
        return (
            <View>
                <Text >{text2}</Text>
                
                <Button
                    title="Presssss me"
                    onPress={() => {
                        this.getDistanceOneToOne(59.19858,17.83317,59.2000008,17.8999996)}}
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
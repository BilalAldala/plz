import React, { Component } from "react";
import {
    Alert,
    Modal,
    Platform,
    Text,
    View,
    Linking,
    StyleSheet,
    AsyncStorage,
    TouchableHighlight, TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Button } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal2 from './Modal'
const { Marker } = MapView;
const STORAGE_KEY = "@STHML_PARK_Locations";
let locationData;
export default class Maps extends Component {
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

    componentDidMount() {
        this.fetchLocation();
        this.retrieveData().then(data => {
            this.locationData = JSON.parse(data);
            console.log("didMount");
            this.setState({ STHML_PARK_Locations: this.locationData });

            console.log("di dMount");
        });
        //this.openMap();
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

    async fetchLocation() {
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

    componentWillMount() {
        if (Platform.OS === "android" && !Constants.isDevice) {
            this.setState({
                errorMessage:
                    "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            this.setState({
                errorMessage: "Permission to access location was denied"
            });
        }

        let location = await (await Location.getCurrentPositionAsync({})).coords;
        this.setState({ location });
        this.setState({
            latitude: await (await Location.getCurrentPositionAsync({})).coords
                .latitude,
            longitude: await (await Location.getCurrentPositionAsync({})).coords
                .longitude
        });
    };

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

    getDistanceOneToOne(lat1, lon1, lat2, lon2, unit) {
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

    getDirection() {
        const latitude = "40.7127753";
        const longitude = "-74.0059728";
        const label = "New York, NY, USA";

        const url = Platform.select({
            ios: "maps:" + latitude + "," + longitude + "?q=" + label,
            android: "geo:" + latitude + "," + longitude + "?q=" + label
        });
        console.log(
            this.getDistanceOneToOne(59.2025453, 17.7903157, 59.2114643, 17.8628047, "M")
        );
        Linking.openURL(url);
    }

    modal(place) {
        return (
            <Modal
                transparent={true}
                backdropColor={"green"}
                backdropOpacity={1}
                animationType={"slide"}
                visible={this.state.visible}
                onRequestClose={() => {
                    this.setModalVisible(false)
                }}
            >
                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={1}
                    onPressOut={() => { this.setModalVisible(false) }}
                >

                    <View style={styles.containertwo}>


                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'stretch',
                            }}>
                                <View style={{ height: 25, backgroundColor: 'steelblue' }} >
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                        <Icon
                                            name="map-marker"
                                            size={24}
                                            color="white"
                                        />
                                        {' Address'}
                                    </Text>
                                </View>
                                <View style={{ height: 25, backgroundColor: 'steelblue' }} >
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                        CITY_DISTRICT
                                    </Text>
                                </View>
                                <View style={{ height: 25, backgroundColor: 'steelblue' }} >
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                        <Icon
                                            name="timer"
                                            size={24}
                                            color="white"
                                        />
                                        {' Max_Hours'}
                                    </Text>
                                </View>
                                <View style={{ width: 85, backgroundColor: 'steelblue' }} >

                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                        <Icon
                                            name="map-marker-distance"
                                            size={24}
                                            color="white"
                                        />
                                        {' Distance'}
                                    </Text>
                                </View>

                            </View>
                            <View style={{ width: 100, height: 100 }} >
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'stretch',
                                    height: 200,
                                }}><Button
                                        icon={
                                            <Icon
                                                name="directions"
                                                size={24}
                                                color="white"
                                            />
                                        }
                                        title=" Direction"
                                        onPress={() => Alert.alert('Cannot press this one')}
                                    />
                                </View>





                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }

    async setModalVisible(visible) {
        await this.setState({ visible: visible });
    }

    render() {
        if (this.state.STHML_PARK_Locations == null) {
            return (
                <MapView
                    minZoomLevel={10}
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    initialRegion={{
                        latitude: 59.341641,
                        longitude: 18.071762,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }}
                ></MapView>
            );
        } else {
            return (
                <MapView
                    minZoomLevel={10}
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    initialRegion={{
                        latitude: 59.341641,
                        longitude: 18.071762,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }}
                >
                    {this.state.STHML_PARK_Locations.map(location => {
                        const longitude = location.longitude;
                        const latitude = location.latitude;
                        const title = location.title;
                        const description = location.description;

                        return (
                            <MapView.Marker
                                key={location.id}
                                coordinate={{ longitude, latitude }}
                                title={"title"}
                                description={title}
                                pinColor={"blue"}
                                onPress={() => {
                                    this.setModalVisible(true);
                                }}
                            >
                                {this.modal(location)}
                            </MapView.Marker>
                        );
                    })}
                </MapView>
            );
        }
    }
}

const styles = StyleSheet.create({
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 799
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#ecf0f1"
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    containertwo: {
        alignItems: "center",
        alignSelf: 'stretch',
        backgroundColor: 'steelblue',
        justifyContent: "center",
        height: 100
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'green'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: "center"
    }
});
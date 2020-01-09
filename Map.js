import React, { Component } from "react";
import { NavigationEvents } from "react-navigation";

import {
  Alert,
  Modal,
  Platform,
  Text,
  View,
  Linking,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Button } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal2 from "./Modal";
import MapModel from "./MapModel";
const { Marker } = MapView;
const STORAGE_KEY = "@STHML_PARK_Locations";
let locationData;

export default class Maps extends Component {
  constructor() {
    super();
    this.state = {
      STHML_PARK_Locations: null,
      visible: false,
      locationDetailData: null,
      MapModelObj: new MapModel()
    };
    console.log("constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.state.MapModelObj.retrieveData().then(data => {
      this.setState({ STHML_PARK_Locations: JSON.parse(data) });
    });
  }

  modal() {
    if (this.state.locationDetailData == null) {
      return;
    }
    const location = this.state.locationDetailData;
    const longitude = location.longitude;
    const latitude = location.latitude;
    const ADDRESS = location.ADDRESS;
    const CITY_DISTRICT = location.CITY_DISTRICT;
    const OTHER_INFO = location.OTHER_INFO;
    const DISTANCE = location.DISTANCE;

    return (
      <Modal
        transparent={true}
        backdropColor={"green"}
        backdropOpacity={1}
        animationType={"slide"}
        visible={this.state.visible}
        onRequestClose={() => {
          this.setModalVisible(false, null);
        }}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPressOut={() => {
            this.setModalVisible(false, null);
          }}
        >
          <View style={styles.containertwo}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "stretch"
                }}
              >
                <View style={{flexDirection: "row" }}>
                  <Icon name="map-marker" size={24} color="blue" />
                    <Text style={{ fontWeight: "bold" }}>
                      {ADDRESS}
                      {"\n"}
                      {CITY_DISTRICT}
                    </Text>
                </View>
                <View style={{ height: 25 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    <Icon name="timer" size={24} color="blue" />
                    {OTHER_INFO}
                  </Text>
                </View>
                <View style={{ height: 25 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    <Icon name="map-marker-distance" size={24} color="blue" />
                    {" gk"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{ paddingTop: 20 }}
                onPress={() => this.state.MapModelObj.getDirection(location)}
              >
                <View>
                  <Icon name="directions" size={70} color="blue" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  setModalVisible(visible, locationDetailData) {
    this.setState({ locationDetailData });
    this.setState({ visible });
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
        <>
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
              const ADDRESS = location.ADDRESS;
              const CITY_DISTRICT = location.CITY_DISTRICT;
              const OTHER_INFO = location.OTHER_INFO;
              const DISTANCE = location.DISTANCE;
              return (
                <>
                  <MapView.Marker
                    key={location.id}
                    coordinate={{ longitude, latitude }}
                    title={ADDRESS}
                    description={CITY_DISTRICT}
                    pinColor={"blue"}
                    onPress={() => {
                      this.setModalVisible(true, location);
                    }}
                  ></MapView.Marker>
                </>
              );
            })}
          </MapView>
          {this.modal()}
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 799
  },
  btnContainer: {
    fontSize: 24,
    color: "white"
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
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: 90, //Here is the trick
    borderBottomColor: "blue",
    borderBottomWidth: 3
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  }
});

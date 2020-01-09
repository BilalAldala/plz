import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapModel from "./MapModel";

const adresses = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item"
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item"
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item"
  }
];



export default class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      adresses: [],
      STHML_PARK_Locations: null,
      MapModelObj: new MapModel(),
      isLoading: false
    };
  }
  loadAdresses = async () => {
    this.state.MapModelObj.fetchParkinLocation(59.32784, 18.05306);
    this.state.MapModelObj.retrieveData().then(data => {
      this.setState({ STHML_PARK_Locations: JSON.parse(data), isLoading: true })      
    });
console.log(this.state.STHML_PARK_Locations)
    
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    this.state.MapModelObj.retrieveData().then(data => {
      this.setState({ STHML_PARK_Locations: JSON.parse(data) });
    });
  }
  renderItem = ({ item }) => (
    <>
      <View style={{ minHeight: 40, padding: 5 }}>
        <Text>{item.id}</Text>
      </View>
    </>
  );
  showList(data, details) {
    this.loadAdresses();
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: "#2f363c" }} />

        <GooglePlacesAutocomplete
          placeholder="Search for place"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed="false" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            this.showList(data, details);
          }}
          getDefaultValue={() => ""}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: "AIzaSyAg0OKC_z6_2Q9ZO0LWFpu0_44giDXXKFs",
            language: "sv", // language of the results
            types: ""
          }}
          styles={{
            container: {
              zIndex: 10,
              overflow: "visible",
              height: 0,
              flexGrow: 0,
              flexShrink: 0
            },
            textInputContainer: {
              width: "100%"
            },
            description: {
              fontWeight: "bold"
            },
            listView: {
              position: "absolute",
              marginTop: 40,
              backgroundColor: "white",
              elevation: 1
            }
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            types: ["geocode"]
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: "distance",
            type: "cafe"
          }}
          GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: "geometry"
          }}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3"
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
        />
        <FlatList
          style={styles.container}
          data={this.state.STHML_PARK_Locations}
          renderItem={({ item }) => <Item title={item.ADDRESS} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}


function Item({ title }) {
    return (
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
            <View style={{ flexDirection: "row" }}>
              <Icon name="map-marker" size={24} color="blue" />
              <Text style={{ fontWeight: "bold" }}>
                {title}
                {"\n"}
                {title}
              </Text>
            </View>
            <View style={{ height: 25 }}>
              <Text style={{ fontWeight: "bold" }}>
                <Icon name="timer" size={24} color="blue" />
                {title}
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
            style={{ paddingTop: 10, paddingRight: 10 }}
            onPress={() => this.state.MapModelObj.getDirection(location)}
          >
            <View>
              <Icon name="directions" size={70} color="blue" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 85
  },
  containertwo: {
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "blue",
    borderBottomWidth: 3
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  },
  containerStyle: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  inputStyle: {
    marginTop: 20,
    marginBottom: 20,
    height: 35,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 22,
    lineHeight: 35,
    width: "95%",
    borderColor: "gray",
    borderWidth: 1
  },
  buttonStyle: {
    height: 70,
    width: "100%",
    backgroundColor: "#C60000",
    alignItems: "center",
    alignSelf: "flex-end"
  },
  buttonTextStyle: {
    fontSize: 25,
    color: "white",
    lineHeight: 50
  }
});

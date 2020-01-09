import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const adresses = [
  {
    street: "English",
    city: "Sydney",
    country: "Australia"
  }, {
    street: "Estonian",
    city: "Sydney",
    country: "Australia"
  }, {
    street: "Esperanto",
    city: "Sydney",
    country: "Australia"
  },
];
export default class SearchAuto extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],

    };
  }
  loadContacts = async () => {
    this.setState({
      contacts: adresses, inMemoryLocaions: adresses
    })
  }
  componentDidMount() {
  }
  renderItem = ({ item }) => (
    <>
      <View style={{ minHeight: 40, padding: 5 }}>
        <Text>
          {item.street}
        </Text>
      </View>
    </>
  );
  showList(data, details) {
    console.log("show");

    console.log(data, details);

    this.loadContacts()

  }
  jett() {
    console.log("f")

  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: '#2f363c' }} />

        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          this.showList(data, details)  ;
          console.log(data, details);
          }}

          getDefaultValue={() => ''}

          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyAg0OKC_z6_2Q9ZO0LWFpu0_44giDXXKFs',
            language: 'sv', // language of the results
            types: '',
          }}

          styles={{
            textInputContainer: {
              width: '100%'
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}

          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            types: ['geocode']
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            type: 'cafe'
          }}

          GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: 'geometry'
          }}

          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
          
        />
        <View style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: '#2f363c' }} />
        <FlatList
          data={this.state.contacts}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
              <Text style={{ color: '#bad555' }}>Result not found</Text></View>)}
        />
      </View>
      </View>
    );
  }

}
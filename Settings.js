import React from 'react';
import { AsyncStorage, StyleSheet, StatusBar, Alert, Text, View, Slider, TouchableOpacity, Switch, ActivityIndicator, ScrollView, Platform } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const STORAGE_KEY = "@STHML_PARK_Settings";

export default class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeText = this.onChangeText.bind(this);

        this.distanceRef = this.updateRef.bind(this, 'distance');
        this.vehicleRef = this.updateRef.bind(this, 'vehicle');

        this.state = {
            vehicle: 'Car',
            distance: '100',
        }
    }   

    onChangeText(text) {
        ['distance', 'vehicle']
            .map((name) => ({ name, ref: this[name] }))
            .filter(({ ref }) => ref && ref.isFocused())
            .forEach(({ name, ref }) => {
                this.setState({ [name]: text });
            });
    }

    updateRef(name, ref) {
        this[name] = ref;
    }
    async confirmSettings(){
        let { vehicle, distance } = this.state;
        
        const STHML_PARK_Settings = { vehicle, distance };
        console.log(STHML_PARK_Settings)

        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(STHML_PARK_Settings)
        );
        
    }

    render() {
        let { vehicle, distance } = this.state;

        let textStyle = [
            styles[vehicle],
            styles[distance],
        ]
        return (
            <View style={styles.screen}>
                <View style={styles.container}>
                    <Text style={styles.headline}>
                        <Icon
                            name="settings"
                            size={24}
                            color="black"
                        />
                        {' Settings'}
                    </Text>


                    <Dropdown
                        ref={this.vehicleRef}
                        value={vehicle}
                        onChangeText={this.onChangeText}
                        label='Vehicle'
                        data={vehicleData}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Dropdown
                                ref={this.distanceRef}
                                value={distance}
                                onChangeText={this.onChangeText}
                                label='Distance (m)'
                                data={distanceData}
                            />
                        </View>
                    </View>
                </View>

                <Button
                    icon={
                        <Icon
                            name="checkbox-marked-circle"
                            size={24}
                            color="white"
                        />
                    }
                    title=" Confirm"
                    onPress={() => this.confirmSettings()}
                />
            </View>

        );
    }



}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 4,
        paddingTop: 10,
        backgroundColor: 'white',
    },

    container: {
        marginHorizontal: 4,
        marginVertical: 8,
        paddingHorizontal: 8,
    },

    text: {
        textAlign: 'center',
    },
    headline: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 18,
         marginTop: 0,
        width: 200,
    },

    textContainer: {
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 16,
        elevation: 1,
        justifyContent: 'center',

    },


    Headline: { fontSize: 24 },
    Title: { fontSize: 20, fontWeight: '500' },
    Subheading: { fontSize: 16 },
    Body: { fontSize: 14 },
    Caption: { fontSize: 12 },



})

const vehicleData = [
    { value: 'Car' },
    { value: 'Bus' },
    { value: 'Truck' },
];

const distanceData = [
    { value: '100' },
    { value: '200' },
    { value: '300' },
    { value: '400' },
    { value: '500' },

];


import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import MapModel from './MapModel.js'

class AdressList extends Component {
    constructor(props) {
        super(props);
        if (this.props.locations != null) {
            this.state = {
                locations: this.props.locations,
            };
        } else {
            this.state = {
                locations: null,
            };
        }
       
    }

    searchForPlace() {

    }
    alertItemName = (item) => {
        Obj = new MapModel();
        console.log(Obj.retrieveData());
        alert(item.name)
    }
    render() {
        if (this.state.locations == null) {
            return (<View>
                <Text style={styles.text}>
                    Search for place
                </Text>
            </View>
            );
        } else {
            return (
                <View>
                    {
                        this.state.locations.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.container}
                                onPress={() => this.alertItemName(item)}>
                                <Text style={styles.text}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            );
        }
    }
}
export default AdressList

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
    },
    text: {
        color: '#4f603c'
    }
})
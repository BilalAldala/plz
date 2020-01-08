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

export default class Modal2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            location: props
        };
    }
    async setModalVisible(visible) {
        console.log(".....=null " + visible);
        console.log(".....= " + this.state.visible);

        await this.setState({ visible: visible });
        console.log(".....== " + this.state.visible);
    }
    render() {
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
                        <Text style={styles.TextStyle}>
                            {title}
                        </Text>

                        <Button
                            title="Print Tickets"
                            onPress={() => {
                                this.setModalVisible(false);
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>);
    }
}

const styles = StyleSheet.create({
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
        backgroundColor: "grey",
        justifyContent: "center",
        height: 100
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: "center"
    }
});
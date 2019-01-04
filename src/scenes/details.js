import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import {
    deviceHeight, deviceWidth, buttonDiv, buttonText, inputTitle, input, inputBorder, detailsBottomCard,
    qrCodeDiv, detailsTopDiv, detailsBottomDiv
} from '../styling';
import { qr } from '../assets'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import QRCode from 'react-native-qrcode';

import firebaseService from '../utility/firebase';

export default class Details extends Component {

    constructor(props) {
        super(props)
        this.unsubscribe = null
        this.unsubscribe2 = null
        this.state = {
            firstName: "",
            lastName: "",
            birthDay: "",
            text: 'http://facebook.github.io/react-native/',
            isDatePicker: false,
            user: null,
            userData: null,
        }

        this._showDateTimePicker = this._showDateTimePicker.bind(this)
        this._hideDateTimePicker = this._hideDateTimePicker.bind(this)
        this._handleDatePicked = this._handleDatePicked.bind(this)

    }

    componentDidMount() {
        this.unsubscribe = firebaseService.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
                this.unsubscribe2 = firebaseService.database().ref('users').child(user.uid).on('value', (snapshot) => {
                    console.log('database snapshot', snapshot)
                    let val = snapshot.val()
                    if (val) {
                        this.setState({ userData: val, firstName: val.firstName, lastName: val.lastName, birthDay: val.dob })
                    }
                })
            } else {
                this.setState({
                    user: null,
                    firstName: "",
                    lastName: "",
                    birthDay: "",
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
        if (this.unsubscribe2) this.unsubscribe();
        firebaseService.auth().signOut()
    }

    saveDetails = () => {
        const { user, firstName, lastName, birthDay } = this.state;
        console.log('user', user)
        if (user) {
            var status = {
                mobile: user.phoneNumber,
                firstName: firstName,
                lastName: lastName,
                dob: birthDay
            }
            firebaseService.database().ref('users').child(user.uid).set(status, (error) => {
                if (error) {
                    console.log('status changed error', error)
                } else {
                    console.log('status changed successfully')
                }
            })
        } else {
            alert('something went wrong');
        }

    }


    _showDateTimePicker() {
        this.setState({ isDatePicker: true });
    }

    _hideDateTimePicker() {
        this.setState({ isDatePicker: false });
    }

    _handleDatePicked = (date) => {
        this.setState({
            birthDay: date.toString()
        })
        this._hideDateTimePicker();
    };



    render() {

        const { isDatePicker, birthDay, firstName, lastName, userData } = this.state;
        return (
            <KeyboardAwareScrollView>
                <View style={detailsTopDiv}>
                    <View style={qrCodeDiv}>
                        {userData && <QRCode
                            value={this.state.user.uid}
                            size={250}
                            bgColor='rgb(160,54,255)'
                            fgColor='white' />}
                    </View>
                </View>
                <View style={detailsBottomDiv}>
                    <View style={detailsBottomCard}>
                        <Text style={inputTitle}>Personal details</Text>
                        <TextInput
                            value={firstName}
                            onChangeText={(firstName) => this.setState({ firstName })}
                            placeholder={'First name'}
                            underlineColorAndroid="transparent"
                            style={[input, inputBorder, { marginTop: 30, marginBottom: 10 }]}
                        />
                        <TextInput
                            value={lastName}
                            onChangeText={(lastName) => this.setState({ lastName })}
                            placeholder={'Last name'}
                            underlineColorAndroid="transparent"
                            style={[input, inputBorder, { marginBottom: 10 }]}
                        />
                        <TextInput
                            value={birthDay}
                            onFocus={this._showDateTimePicker}
                            placeholder={'Birthday'}
                            underlineColorAndroid="transparent"
                            style={[input, inputBorder, { marginBottom: 20 }]}
                        />
                        <TouchableOpacity
                            onPress={() => this.saveDetails()}
                            style={buttonDiv}>
                            <Text style={buttonText}>Save details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DateTimePicker
                    isVisible={isDatePicker}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
            </KeyboardAwareScrollView>
        )
    }

}

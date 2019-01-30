import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import {
    deviceHeight, deviceWidth, buttonDiv, buttonText, inputTitle, input, inputBorder, detailsBottomCard,
    qrCodeDiv, detailsTopDiv, detailsBottomDiv, logoContainer, logo
} from '../styling';
import { qr, instruction } from '../assets'
import { StackActions, NavigationActions } from 'react-navigation';
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
            timer: null,
            counter: new Date().getTime()
        }

        this._showDateTimePicker = this._showDateTimePicker.bind(this)
        this._hideDateTimePicker = this._hideDateTimePicker.bind(this)
        this._handleDatePicked = this._handleDatePicked.bind(this)
        this.tick = this.tick.bind(this)

    }

    tick() {

        //alert("Current timer : " +this.state.counter)
        this.setState({
            counter: new Date().getTime()
        });
    }

    componentDidMount() {
        let timer = setInterval(this.tick, 5000);
        this.setState({ timer });
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
        clearInterval(this.state.timer);
        if (this.unsubscribe) this.unsubscribe();
        if (this.unsubscribe2) this.unsubscribe();
    }

    saveDetails = () => {
        const { user, firstName, lastName, birthDay } = this.state;
        // console.log('user', user)
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

    logout = () => {
        firebaseService.auth().signOut()
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        this.props.navigation.dispatch(resetAction);
    }


    _showDateTimePicker() {
        this.setState({ isDatePicker: true });
    }

    _hideDateTimePicker() {
        this.setState({ isDatePicker: false });
    }

    _handleDatePicked = (date) => {
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        var finalDate = (monthIndex + 1) + '/' + day + '/' + year;
        this.setState({
            birthDay: finalDate
        })
        this._hideDateTimePicker();
    };



    render() {

        const { isDatePicker, birthDay, firstName, lastName, userData, counter, user } = this.state;
        const qrString = userData ? user.uid + '.' + counter : null
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAwareScrollView>
                    <View style={detailsTopDiv}>
                        <View style={qrCodeDiv}>
                            {userData && <QRCode
                                value={qrString}
                                size={250}
                                bgColor='rgb(160,54,255)'
                                fgColor='white' />}
                            {!userData &&
                                <View style={{ flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                    <Image source={instruction} />
                                    <Text style={inputTitle}>Enter your details below</Text>
                                </View>
                            }
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
                        <View style={{ paddingHorizontal: 20 }}>
                            <TouchableOpacity
                                onPress={() => this.logout()}
                                style={[buttonDiv, { marginTop: 20 }]}>
                                <Text style={buttonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <DateTimePicker
                        isVisible={isDatePicker}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />
                </KeyboardAwareScrollView>
            </SafeAreaView>
        )
    }

}

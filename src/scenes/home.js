import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput,Linking } from 'react-native'
import {
    container, deviceWidth, deviceHeight, buttonDiv, buttonText, logo, logoText, logoContainer, bottomDivLogin,
    inputTitle, bottomCardLogin, inputContainer, input
} from '../styling';
import { appIcon } from '../assets'
import { ScrollView } from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info'

import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal'

import { Countries } from '../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebaseService from '../utility/firebase';
import firebase from 'react-native-firebase';

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.unsubscribe = null;
        let userLocaleCountryCode = DeviceInfo.getDeviceCountry()
        const userCountryData = getAllCountries()
            .filter(country => Countries.includes(country.cca2))
            .filter(country => country.cca2 === userLocaleCountryCode)
            .pop()
        let callingCode = null
        let cca2 = userLocaleCountryCode
        if (!cca2 || !userCountryData) {
            cca2 = 'US'
            callingCode = '1'
        } else {
            callingCode = userCountryData.callingCode
        }

        this.state = {
            user: null,
            cca2,
            callingCode,
            mobile: ""
        }
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        this.unsubscribe = firebaseService.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
            } else {
                this.setState({
                    user: null,
                    confirmResult: null,
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    login() {
        var m = `+${this.state.callingCode} ${this.state.mobile}`;
        if (this.state.mobile) {
            firebaseService.auth()
                .verifyPhoneNumber(m)
                .on('state_changed', (phoneAuthSnapshot) => {
                    console.log("phoneAuthSnapshot", phoneAuthSnapshot)
                    switch (phoneAuthSnapshot.state) {
                        // ------------------------
                        //  IOS AND ANDROID EVENTS
                        // ------------------------
                        case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
                            console.log('code sent');
                            this.props.navigation.navigate('Confirm', { result: phoneAuthSnapshot })
                            break;
                        case firebase.auth.PhoneAuthState.ERROR: // or 'error'
                            console.log('verification error');
                            console.log(phoneAuthSnapshot.error);
                            alert(phoneAuthSnapshot.error)
                            break;

                        // ---------------------
                        // ANDROID ONLY EVENTS
                        // ---------------------
                        case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
                            console.log('auto verify on android timed out');
                            break;
                        case firebase.auth.PhoneAuthState.AUTO_VERIFIED:
                            console.log('auto verified on android');
                            console.log(phoneAuthSnapshot);
                            //alert('Success: Verified Automatically');
                            const { verificationId, code } = phoneAuthSnapshot;
                            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
                            firebaseService.auth().signInWithCredential(credential).then(result => {
                                console.log(result)
                                this.props.navigation.navigate('Details')
                            }).catch(error => {
                                console.log(error)
                            })
                            break;
                    }
                }, (error) => {
                    console.log(error);
                    console.log(error.verificationId);
                    alert(error)
                }, (phoneAuthSnapshot) => {
                    console.log(phoneAuthSnapshot);
                });
        } else {
            alert('Please enter a valid mobile number');
        }

    }
openURL(isPolicy){
 
var url='https://circleparties.com/terms'

if(isPolicy)
url= 'https://circleparties.com/privacy'

    Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
 

}
    render() {

        const { mobile } = this.state;
        return (
            <KeyboardAwareScrollView >
                <View style={logoContainer}>
                    <Image source={appIcon} style={logo} />
                    <Text style={logoText}>CIRCLE</Text>
                </View>
                <View style={bottomDivLogin}>
                    <View style={bottomCardLogin}>
                        <Text style={inputTitle}>Phone Number</Text>
                        <View style={inputContainer}>
                            <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                                <CountryPicker
                                    //countryList={Countries}
                                    onChange={value => {
                                        this.setState({ cca2: value.cca2, callingCode: value.callingCode })
                                    }}
                                    cca2={this.state.cca2}
                                    translation="eng"
                                />
                            </View>
                            <TextInput
                                keyboardType={'number-pad'}
                                onChangeText={(mobile) => this.setState({ mobile })}
                                placeholder={'mobile number'}
                                underlineColorAndroid="transparent"
                                value={mobile}
                                style={[input, { width: '75%' }]} />
                        </View>
                        <TouchableOpacity
                            onPress={this.login}
                            style={buttonDiv}>
                            <Text style={buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 15, marginVertical: 15 }}>By logging in you accept the terms of the <Text onPress={()=>this.openURL(false)} style={{ fontWeight: 'bold',color:'blue' }}>user agreement</Text> and the <Text onPress={()=>this.openURL(true)}  style={{ fontWeight: 'bold' ,color:'blue'}}>privacy statements</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        )
    }

}

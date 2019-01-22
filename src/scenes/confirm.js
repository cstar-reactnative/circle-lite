import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import {
    buttonDiv, buttonText, logo, logoText, logoContainer,
    bottomDivLogin, inputTitle, bottomCardLogin, inputContainer, input
} from '../styling';
import { appIcon,back } from '../assets'
import firebaseService from '../utility/firebase';
import firebase from 'react-native-firebase';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Confirm extends Component {

    constructor(props) {
        super(props)
        this.unsubscribe = null
        this.state = {
            codeInput: "",
            confirmResult: null
        }
        this.confirmCode = this.confirmCode.bind(this)
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        let confirmResult = params ? params.result : null;

        this.unsubscribe = firebaseService.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
                console.log("user", user)
            } else {
                this.setState({
                    user: null,
                });
            }
        });
        this.setState({ confirmResult: confirmResult });
        // console.log("vId", confirmResult.verificationId)
        // console.log("cresult", confirmResult)
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;
        if (codeInput){
            const credential = firebase.auth.PhoneAuthProvider.credential(confirmResult.verificationId, codeInput);
        firebaseService.auth().signInWithCredential(credential).then(result => {
            console.log(result)
            this.props.navigation.navigate('Details')
        }).catch(error => {
            console.log(error)
        })
        }else{
            alert('Please enter Confirmation Code')
        }
    };

    render() {
        const { codeInput } = this.state;

        return (
            <KeyboardAwareScrollView >
                <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{width:65, position:'absolute',top:20, left:15, flexWrap:'wrap', flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                        <Image source={back} style={{width:25, height:25}}/>
                        <Text style={{fontSize:18}}>Back</Text>
                    </TouchableOpacity>
                <View style={logoContainer}>
                    <Image source={appIcon} style={logo} />
                    <Text style={logoText}>CIRCLE</Text>
                </View>
                <View style={bottomDivLogin}>
                    <View style={bottomCardLogin}>
                        <Text style={inputTitle}>Confirmation Code</Text>
                        <View style={inputContainer}>
                            <TextInput
                                keyboardType={'number-pad'}
                                onChangeText={(codeInput) => this.setState({ codeInput })}
                                placeholder={'OTP....'}
                                underlineColorAndroid="transparent"
                                value={codeInput} style={input}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={this.confirmCode}
                            style={buttonDiv}>
                            <Text style={buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }

}

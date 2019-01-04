// import * as firebase from 'firebase'
import firebase from 'react-native-firebase';
import { firebaseConfig } from '../constants';

let instance = null

class FirebaseService {
    constructor() {
        if (!instance) {
            this.app = firebase.initializeApp(firebaseConfig)
            instance = this;
        }
        return instance
    }
}

const firebaseService = new FirebaseService().app
export default firebaseService;

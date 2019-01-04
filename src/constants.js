const apiSource = 'https://api.servoquick.com/'
import { countries as c } from './countries.json';

const Countries = c

// const firebaseConfig = {
//     authDomain: "superble-dev-bb6e0.firebaseapp.com",
//     databaseURL: "https://demoapp-4a53d.firebaseio.com/",
//     projectId: "demoapp-4a53d",
//     storageBucket: "demoapp-4a53d.appspot.com",
//     clientId: '106787013219-cm8gu95pvktpkdbljk8uqskgutsbs11c.apps.googleusercontent.com',
//     appId: '1:106787013219:android:6601b037e8d162d1',
//     apiKey: 'AIzaSyAz_O8-f-651uyBAVmrmWBDbaldW_A7lUM',
//     messagingSenderId: '106787013219',

//     // enable persistence by adding the below flag
//     persistence: true,
// };

const firebaseConfig = {
    apiKey: "AIzaSyDDmeoUG1mXW8JH4b-MH9klf_NqR2Z2AUQ",
    authDomain: "circle-lite.firebaseapp.com",
    databaseURL: "https://circle-lite.firebaseio.com",
    projectId: "circle-lite",
    storageBucket: "circle-lite.appspot.com",
    messagingSenderId: "255834822234",
    persistence: true,
};



export {
    apiSource,
    Countries,
    firebaseConfig
}


// "PT", "PR", "QA", "RE", "RO", "RU", "RW", "SH", "KN", "LC", "PM", "VC", "WS", "SM", "ST"
//,
// "SA", "SN", "CS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "GS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE",
// "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE",
// "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW",
// "AN"
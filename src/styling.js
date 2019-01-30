import { Dimensions } from 'react-native'

// Colors
const primary = '#ffbd00'
const secondary = '#191919'
const backgroundColor = '#f5f5f5'

//Dimensions
const width = Dimensions.get("window")
const deviceWidth = width.width;
const deviceHeight = width.height;

const container = { flex: 1, alignItems: 'center', backgroundColor: 'white' }

const logo = { width: deviceWidth / 3, height: deviceWidth / 3, borderRadius: 30 }
const logoText = { color: "black", fontWeight: '800', fontSize: 45 }
const logoContainer = { height: deviceHeight * 0.35, flexDirection: "column", marginTop: 50, justifyContent: 'center', alignItems: 'center' }
const bottomDivLogin = { height: deviceHeight * 0.65, width: deviceWidth, padding: 20, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }
const bottomCardLogin = {
    elevation: 4, width: deviceWidth - 40, height: 230, padding: 20, borderRadius: 24, backgroundColor: 'white', shadowOpacity: 0.75, shadowRadius: 5, shadowColor: '#ccc', shadowOffset: { height: 0, width: 0 },
}
const inputContainer = { width: '100%', flexDirection: 'row', marginVertical: 30, borderWidth: 0.5, borderRadius: 3, borderColor: 'grey' }
const inputTitle = { color: 'rgba(0,0,0,0.2)', fontSize: 20, fontWeight: 'bold' }
const input = { color: 'rgba(0,0,0,0.7)', height: 45, padding: 2, fontSize: 18, width: '100%' }
const inputBorder = { borderWidth: 0.5, borderRadius: 3, borderColor: 'grey' }
const buttonDiv = { width: '100%', borderRadius: 10, backgroundColor: 'rgb(160,54,255)', height: 50, justifyContent: 'center' }
const buttonText = { textAlign: "center", color: 'white', fontSize: 20, fontWeight: 'bold' }

const detailsBottomCard = { elevation: 4, width: deviceWidth - 40, padding: 20, borderRadius: 24, backgroundColor: 'white', shadowOpacity: 0.75, shadowRadius: 5, shadowColor: '#ccc', shadowOffset: { height: 0, width: 0 }, }
const qrCodeDiv = { justifyContent: 'center', alignItems: 'center', elevation: 4, width: deviceWidth - 40, marginTop: 20, height: 300, padding: 20, borderRadius: 24, backgroundColor: 'white', shadowOpacity: 0.75, shadowRadius: 5, shadowColor: '#ccc', shadowOffset: { height: 0, width: 0 }, }
const detailsTopDiv = { paddingHorizontal: 20, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }
const detailsBottomDiv = { width: deviceWidth, padding: 20, flexDirection: "column" }

export default primary
export {
    primary, secondary, backgroundColor, logo, logoText, logoContainer,
    container,
    bottomDivLogin, inputTitle, bottomCardLogin, inputContainer, input, inputBorder,
    detailsBottomCard, qrCodeDiv, detailsTopDiv, detailsBottomDiv,
    deviceHeight, deviceWidth,
    buttonDiv, buttonText
}
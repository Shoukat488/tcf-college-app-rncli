import React , {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
export default class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styleSheet.container}>
                <View>
                    <Image
                    style={styleSheet.logo}
                    source={
                        require('../assets/TCF.png')
                    }
                    />
                </View>
                <View style={styleSheet.midLayer}>
                    <Image
                    style={styleSheet.midLogo}
                    source={
                        require('../assets/calendar1.png')
                    }
                    />
                </View>
                <View>
                    <Image
                    source={
                        require('../assets/collegeLogo.png')
                    }
                    style={{width:300,height:90}}
                    />
                </View>
            </View>
        );
    }
}

const styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#010b13',
        alignItems:'center',
        justifyContent:'space-around'

    },
    text: {
        // fontFamily:'',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    midLogo:{
        width:200,
        height:200
    },
    midLayer:{
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:250,
        height:100
    }
})
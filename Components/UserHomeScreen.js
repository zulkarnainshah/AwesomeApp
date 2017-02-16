import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Text } from 'react-native';
import UserInfo from './Models/UserInfo';

export default class UserHomeScreen extends Component {
    state = { userID: '' };
    myThis = this;
    constructor(props) {
        super(props)
        this.state = { userName: null };
        myThis = this; // to keep reference of this to be used in fetch callback
    }
    componentWillMount(){
        AsyncStorage.getItem('userId').then((value)=> {
            this.setState({ userID: value });
            const API_ENDPOINT= 'https://server-dev1.mywardrobe.space/api/v1/userinfo';
            const userID = value;
            fetch(API_ENDPOINT,{ method: "GET",
                headers:{
                    'Authorization': 'Bearer '+ userID
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    userInfo = new UserInfo();
                    userInfo.updateValues(responseJson);
                    AsyncStorage.setItem("userInfo",JSON.stringify(userInfo),null);

                    AsyncStorage.getItem('userInfo').then(function (value) {
                        jsonString = JSON.parse(value);
                        myThis.setState({ userName: jsonString.local.username });
                    });
                })

        });
    }

    render(){
        return(

            <Text>Welcome {this.state.userName}

            </Text>
        )
    }
}

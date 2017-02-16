import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Text } from 'react-native';



import UserInfo from './Models/UserInfo';

class UserHomeScreen extends Component {
    state = { userID: '' };
    componentWillMount(){
        AsyncStorage.getItem('userId').then((value) => {
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
                    backInfo = AsyncStorage.getItem("userInfo").then(value);
                })

        });



    }

    render(){

        return(
            <Text>Welcome User
            </Text>
        )
    }
}


export default UserHomeScreen;

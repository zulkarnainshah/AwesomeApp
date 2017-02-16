import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Text } from 'react-native';



class UserHomeScreen extends Component {
  state = { userID: '' };





  componentWillMount(){

      AsyncStorage.getItem('userId').then((value) => {
             this.setState({ userID: value });
          const API_ENDPOINT= 'https://server-dev1.mywardrobe.space/api/auth/userinfo';
           const userinfo = value;
           console.log(userinfo);
           fetch(API_ENDPOINT,{ method: "GET",
             headers:{

               'Authorization': 'Bearer '+ userinfo
             }
           })
           .then((response) => response.json())
           .then((responseJson) => {
             console.log(userinfo);
               console.log(responseJson);

           })

       });



}

  render(){

    return(
    <Text>hello { this.state.userID }
    </Text>
   )
  }
}


export default UserHomeScreen;

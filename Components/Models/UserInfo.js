import {AsyncStorage} from 'react-native';


export default class UserInfo extends Object {


    getUserId = () => {
        AsyncStorage.getItem('authToken').then((value) => {
            const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/userinfo';
            const authToken = value;
            fetch(API_ENDPOINT, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    const userid = responseJson.id;
                    this.getPieces(authToken, userid);
                });
        });
    }

    getPieces = (authToken, userID) => {

        const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/users/' + userID + '/pieces';
        fetch(API_ENDPOINT, {
            method: 'GET',

            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                const data = responseJson;
            });

    }

}

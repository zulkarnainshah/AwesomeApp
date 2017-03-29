/**
 * Created by zulkarnainshah on 29/03/17.
 */

import React from 'react';
import {View,AsyncStorage} from 'react-native';

export default class CombinationDetailScreen extends React.Component {
    componentWillMount() {
        this.getCombinationDetail();
    }

    /** Gets combination detail from /combination/combinationID API **/
    async getCombinationDetail() {
        let authToken = await AsyncStorage.getItem('authToken');
        let userInfo = await AsyncStorage.getItem('userInfo');

        // if (authToken !== null && userInfo !== null) {
        //     let userID = JSON.parse(userInfo).id;
        //     const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/users/<  userId> /combinations/<combinationId>';
        //     fetch(API_ENDPOINT, {
        //         method: "GET",
        //         headers: {
        //             'Authorization': 'Bearer ' + authToken
        //         }
        //     })
        //         .then((response) => response.json())
        //         .then((responseJson) => {
        //             AsyncStorage.setItem('combinations', JSON.stringify(responseJson));
        //             UserHomeScreen.selectedTab = 2;
        //             this.combinations = responseJson;
        //             this.forceUpdate();
        //         });
        // }
    }

    render() {
        return (
            <View></View>
        );
    }
}
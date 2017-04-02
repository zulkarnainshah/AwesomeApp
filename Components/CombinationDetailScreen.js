/**
 * Created by zulkarnainshah on 29/03/17.
 */

import React from 'react';
import {View, AsyncStorage} from 'react-native';
import GridView from './Common/GridView';

export default class CombinationDetailScreen extends React.Component {
    imagePieces = [];

    componentWillMount() {
        this.getCombinationDetail();
    }

    /** Gets combination detail from /combination/combinationID API **/
    async getCombinationDetail() {
        let authToken = await AsyncStorage.getItem('authToken');
        let userInfo = await AsyncStorage.getItem('userInfo');

        if (authToken !== null && userInfo !== null) {
            let userID = JSON.parse(userInfo).id;
            const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/users/' + userID + '/combinations/' + this.props.combinationID;
            fetch(API_ENDPOINT, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.imagePieces = responseJson.pieces;
                    this.forceUpdate();
                });
        }
    }

    render() {
        if (this.imagePieces.length === 0) {
            return (<View></View>);
        }
        else {
            return (
                <View style={{flex: 1}}>
                    <GridView userInfo={this.props.userInfo}>{this.imagePieces}</GridView>
                </View>
            );
        }
    }
}
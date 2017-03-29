import React, {Component} from 'react';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {CardSection} from './Common/CardSection';


class Pieces extends Component {

    onShowPieceButtonPress(pieceID) {
        const authToken = this.props.userInfo[0];
        const userID = this.props.userInfo[1];
        Actions.ShowPiecesScreen({authToken, userID, pieceID});
    }

    render() {
        if (this.props.piecedetails.image != null) {
            return (
                <TouchableHighlight
                    onPress={() => this.onShowPieceButtonPress(this.props.piecedetails.id)}>
                    <View>
                        <CardSection>
                            <Image
                                style={styles.imageStyle}
                                source={{ uri: this.props.piecedetails.image }}/>

                        </CardSection>
                    </View>
                </TouchableHighlight>
            );
        }
        else {
            return null
        }
    }
}
;

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }
};

export default Pieces;

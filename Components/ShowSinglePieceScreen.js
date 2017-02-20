import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, NewButton } from './Common';
import { viewSinglePiece } from '../Actions';

class ShowSinglePieceScreen extends Component {


    static propTypes = {}

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = { pieces: {} };
    }
    componentWillMount() {
        const id = this.props.id;


        const userId = this.props.userId;

        const idToken = this.props.idToken;
        this.props.viewSinglePiece(idToken, userId, id);
    }


    render() {
        // console.log(this.props.piece.piece);
        if (this.props.piece != null){
            this.props.piece.piece.image
            return (
                <Image style={{ flex: 1 }} source={{ uri: this.props.piece.piece.image }} />
            );
        }
        else {
            return (
                <View>
                  <Text>hello world </Text>

                </View>
            );
        }
    }
}

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

const mapStateToProps = state => {
    console.log('danger');
    return {
        piece: state.singlePiece.piece

    };
};

export default connect(mapStateToProps, { viewSinglePiece })(ShowSinglePieceScreen);

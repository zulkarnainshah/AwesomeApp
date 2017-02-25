import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { NewButton } from './Common/NewButton';
import { CardSection } from './Common/CardSection';
import { viewSinglePiece, removeSinglePiece } from '../Actions'
import { Button } from './Common/Button';
import { Spinner } from './Common/Spinner';

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
    onConfirmDeleteButtonPress(){
        const id = this.props.id;
        const userId = this.props.userId;
        const idToken = this.props.idToken;
        this.props.removeSinglePiece(idToken, userId, id);
    }

    onDeleteButtonPress(){
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this Piece',
            [

                {text:'yes', onPress: () => this.onConfirmDeleteButtonPress()},
                {text:'no'}

            ]


        )

    }

    render() {
        // console.log(this.props.piece.piece);
        if (this.props.piece != null) {

            console.log(this.props.piece);
            this.props.piece.piece.image
            return (
                <View style={{ flex: 1 }}>

                  <CardSection>
                    <Image
                        style={styles.imageStyle}
                        source={{ uri: this.props.piece.piece.image }} />
                  </CardSection>
                  <CardSection>
                    <View style={styles.headerContentStyle}>
                      <Text style={styles.headerTextStyle}>{this.props.piece.piece.description}</Text>

                    </View>

                  </CardSection>
                  <CardSection>
                    <Button onPress={this.onDeleteButtonPress.bind(this)}>
                      Delete piece
                    </Button>
                  </CardSection>
                </View>
            );
        }
        else {
            return (
                <View>
                  <Spinner size={'large'} />

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

    return {
        piece: state.singlePiece.piece

    };
};
export default connect(mapStateToProps, { viewSinglePiece, removeSinglePiece })(ShowSinglePieceScreen);

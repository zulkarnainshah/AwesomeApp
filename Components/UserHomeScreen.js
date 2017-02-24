import React, { Component } from 'react';
import { ScrollView, View,AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { retrivePieces } from '../Actions';
import Pieces from './Pieces';
import { Card, CardSection, Button} from './Common';
import { Spinner } from './Common/Spinner';

class UserHomeScreen extends Component {

    static propTypes = {}

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = { imagePieces: [] };
    }
    componentWillMount() {
        this.props.retrivePieces();
    }
    onAddPieceButtonPress() {
        AsyncStorage.getItem('userId').then((value) => {
            console.log(value);
            authToken = value;
            AsyncStorage.getItem('userInfo').then(function (value) {
                jsonString = JSON.parse(value);
                userID = jsonString.id;

                let imagePicker = require('react-native-image-picker');
                let options = {
                    title: 'Add Piece',
                    storageOptions: {
                        skipBackup: true,
                        path: 'images'
                    }
                };

                /**
                 * The first arg is the options object for customization (it can also be null or omitted for default options),
                 * The second arg is the callback which sends object: response
                 */
                imagePicker.showImagePicker(options, (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    }
                    else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    }
                    else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    }
                    else {
                        // let source = { uri: response.uri };
                        let details = {
                            'data_uri': 'data:image/png;base64,' + response.data,
                            'processing': 'false!',
                            'filename': 'response.fileName',
                            'filetype': 'image/png',
                            'description': 'test'
                        };

                        let formBody = [];
                        for (let property in details) {
                            let encodedKey = encodeURIComponent(property);
                            let encodedValue = encodeURIComponent(details[property]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                        formBody = formBody.join("&");

                        fetch('https://server-dev1.mywardrobe.space/api/v1/users/' + userID + '/pieces', {
                            method: 'post',
                            headers: {
                                'Authorization': 'Bearer ' + authToken,
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            },
                            body: formBody
                        }).then(response => {
                            console.log(response)
                        }).catch(console.log);
                        // You can also display the image using data:
                        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                    }
                });

            });

        });
    }

    pickImage() {

    }

    fillData() {
        const userInfo = this.props.userInfo;
        return this.props.imagePieces.map(object =>
            <Pieces key={object.id} pieces={object} piecedetails={object} userInfo={userInfo} />
        );

    }

    render() {
        if(this.props.dataLoading){
            {
                return <Spinner size={'large'} />;
            }

        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        {this.fillData()}

                    </ScrollView>
                    <CardSection>
                        <Button onPress={this.onAddPieceButtonPress.bind(this)}>
                            Add Piece
                        </Button>
                    </CardSection>
                </View>

            );

        }
    }

}

const mapStateToProps = state => {

    return {
        imagePieces: state.pieces.piecesImages,
        userInfo: state.pieces.basicUserInfo,
        dataLoading: state.pieces.dataLoading
    };
};

export default connect(mapStateToProps, { retrivePieces })(UserHomeScreen);

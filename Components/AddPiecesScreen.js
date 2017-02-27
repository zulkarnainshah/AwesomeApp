import React, {Component} from 'react';
import {
    View,
    Text,
    ImagePickerIOS,
    Image,
    ImagePickerManager,
    Alert,
    AsyncStorage,
    TextInput,
    ScrollView
} from 'react-native';
import {Button,Input} from './Common';
import {CardSection} from './Common/CardSection';

export default class AddPiecesScreen extends Component {
    static propTypes = {};
    static defaultProps = {};
    static myReference;
    static imageData;

    constructor(props) {
        super(props);
        this.state = {image: null};
        myReference = this;
        // this.state.text = "Enter Description Here"
    }

    pickImage() {
        AsyncStorage.getItem('userId').then((value) => {
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
                        myReference.setState({image: response}, function () {
                            // do something with new state
                        });
                    }
                });

            });

        });
    }

    uploadImage() {

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        let details = {
            'data_uri': 'data:image/png;base64,' + this.state.image.data,
            'processing': 'false!',
            'filename': 'response.fileName',
            'filetype': 'image/png',
            'description': this.state.text
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
            //TODO:Check response here to see whether upload was successful or not and accordingly show alert
            console.log(response);
            if (response.status == 200) {
                if (response._bodyText.toString().indexOf("success") > -1) {
                    Alert.alert(
                        'Uploaded Successfully', 'Piece Added',
                        [
                            {text: 'Ok'}
                        ]
                    )
                }
                else if (response._bodyText.toString().indexOf("error") > -1) {
                    Alert.alert(
                        'Error while uploading', 'Please try again',
                        [
                            {text: 'Ok'}
                        ]
                    )
                }
            }
            else {
                Alert.alert(
                    'Error while uploading', 'Please try again',
                    [
                        {text: 'Ok'}
                    ]
                )
            }
        }).catch(console.log);
    }

    render() {
        if (this.state.image == null) {
            return (
                <View style={{ flex: 1 }}>
                    <CardSection>
                        <Text>
                            Add a new piece of Cloth
                        </Text>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.pickImage.bind(this)}>
                            Pick Image
                        </Button>
                    </CardSection>
                </View>

            );
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <CardSection>
                        <Text>
                            Add a new piece of Cloth
                        </Text>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.pickImage.bind(this)}>
                            Pick Image
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Image
                            style={styles.imageStyle}
                            source={{ uri: this.state.image.uri }} />
                    </CardSection>

                    <CardSection>
                        <Input
                            label="description"
                            placeholder="enter description"
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                        />
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.uploadImage.bind(this)}> Upload </Button>
                    </CardSection>
                </View>
            )
        }
    }
}

const styles = {
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }
};

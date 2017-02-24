
import React, { Component} from 'react';
import {View, Text, ImagePickerIOS, Image, ImagePickerManager } from 'react-native';
import {Button} from './Common';
import { AsyncStorage } from 'react-native';

export default class AddPiecesScreen extends Component {
    static propTypes = {};
    static defaultProps = {};
    static myReference;
    static imageData;

    constructor(props) {
        super(props);
        this.state = { image: null };
        myReference = this;
    }

    pickImage() {
        AsyncStorage.getItem('userId').then((value)=> {
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
                        myReference.setState({ image: response}, function() {
                            // do something with new state
                        });
                    }
                });

            });

        });
    }

    uploadImage(){

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        let details = {
            'data_uri': 'data:image/png;base64,' + this.state.image.data,
            'processing': 'false!',
            'filename': 'response.fileName',
            'filetype':  'image/png',
            'description':'test'
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('https://server-dev1.mywardrobe.space/api/v1/users/'+ userID +'/pieces',{
            method: 'post',
            headers:{
                'Authorization': 'Bearer '+ authToken,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body:formBody
        }).then(response => {
            console.log(response)
        }).catch(console.log);
    }

    render()   {
        console.log(this.props.userinfo);
        return   (
            <View style={{ flex: 1 }}>
                <Text
                    style={{
             color: 'black',
             fontSize: 16,
             fontWeight: "bold",
             fontFamily: 'Helvetica Neue',
           }}>
                    Add a new piece of Cloth

                </Text>
                <Button onPress={this.pickImage.bind(this)}>
                    Pick Image
                </Button>

                {
                    this.state.image ? <Image style={{ flex: 1 }} source={{ uri: this.state.image.uri}} /> : <View style={{ flex: 1 }}/>
                }
                {
                    this.state.image ? <Button onPress={this.uploadImage.bind(this)}> Upload </Button> : <View style={{ flex: 1 }}/>
                }

            </View>
        )
    }
}

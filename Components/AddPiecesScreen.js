
import React, { Component} from 'react';
import {View, Text, ImagePickerIOS, Image, ImagePickerManager } from 'react-native';
import {Card,CardSection,Button} from './Common';
import { AsyncStorage } from 'react-native';

export default class AddPiecesScreen extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = { image: null };
    }

    pickImage(props) {
       console.log(this.props.userinfo);
        AsyncStorage.getItem('userId').then((value)=> {
            console.log(value);
            authToken = value;
            AsyncStorage.getItem('userInfo').then(function (value) {
                jsonString = JSON.parse(value);
                userID = jsonString.id;

                // ImagePickerIOS.openSelectDialog({}, imageUri => {
                //     // this.setState({ image: imageUri });
                //
                //     source = {uri: 'data:image/png;base64,' + imageUri, isStatic: true};
                //     let body = new FormData();
                //     body.append({'data_uri': source.uri,'processing' :false,'fileName':'image.png','filetype':'image','description':'test'});
                //     fetch('https://server-dev1.mywardrobe.space/api/v1/users/'+ userID +'/pieces',{
                //         method: 'post',
                //         headers:{
                //             'Authorization': 'Bearer '+ authToken,
                //             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                //         },
                //         body:body
                //     }).then(response => {
                //         console.log(response)
                //     }).catch(console.log);
                //
                // }, error => console.log('Error picking image or pressed Cancel'));

                var ImagePicker = require('react-native-image-picker');
                console.log('imageZZPicker')
                console.log(ImagePicker);
// More info on all the options is below in the README...just some common use cases shown here
                var options = {
                    title: 'Select Avatar',
                    customButtons: [
                        {name: 'fb', title: 'Choose Photo from Facebook'},
                    ],
                    storageOptions: {
                        skipBackup: true,
                        path: 'images'
                    }
                };

                /**
                 * The first arg is the options object for customization (it can also be null or omitted for default options),
                 * The second arg is the callback which sends object: response (more info below in README)
                 */
                ImagePicker.showImagePicker(options, (response) => {
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
                        let source = { uri: response.uri };

                        let body = new FormData();
                            body.append({'data_uri': response.data,'processing' :false,'fileName':response.fileName,'filetype':response.filetype,'description':'test'});
                            fetch('https://server-dev1.mywardrobe.space/api/v1/users/'+ userID +'/pieces',{
                                method: 'post',
                                headers:{
                                    'Authorization': 'Bearer '+ authToken,
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                },
                                body:body
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
                    Welcome User. Pick an image by clicking the button

                </Text>
                <Button onPress={this.pickImage.bind(this)}>
                    Pick Image
                </Button>

                {
                    this.state.image?
                        <Image style={{ flex: 1 }} source={{ uri: this.state.image }} /> :
                        <Text>The image you pick will be shown here</Text>
                }

            </View>
        )
    }
}

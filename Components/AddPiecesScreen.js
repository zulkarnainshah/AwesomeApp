
import React, { Component} from 'react'
import {View,Text,ImagePickerIOS,Image,ImagePickerManager} from 'react-native'
import {Card,CardSection,Button} from './Common';
import { AsyncStorage } from 'react-native';

export default class AddPiecesScreen extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = { image: null };
    }

    pickImage() {
        AsyncStorage.getItem('userId').then((value)=> {
            console.log(value);
            authToken = value;
            AsyncStorage.getItem('userInfo').then(function (value) {
                jsonString = JSON.parse(value);
                userID = jsonString.id;

                ImagePickerIOS.openSelectDialog({}, imageUri => {
                    // this.setState({ image: imageUri });

                    source = {uri: 'data:image/png;base64,' + imageUri, isStatic: true};
                    let body = new FormData();
                    body.append({'data_uri': source.uri,'filename' :'imageName.png'});
                    body.append('Content-Type', 'image/png');

                    fetch('https://server-dev1.mywardrobe.space/api/v1/users/'+ userID +'/pieces',{
                        method: 'post',
                        headers:{
                            'Authorization': 'Bearer '+ authToken,
                            'Content-Type': 'application/json'
                        },
                        body:body
                    }).then(response => {
                        console.log(response)
                    }).catch(console.log);

                }, error => console.log('Error picking image or pressed Cancel'));
                
            });

        });
    }

    render()   {
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

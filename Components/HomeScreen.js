
import React, { Component, } from 'react'
import {View,Text,ImagePickerIOS,Image,} from 'react-native'
import {Card,CardSection,Button} from './Common';
import { AsyncStorage } from 'react-native';

export default class HomeScreen extends Component {

    static propTypes = {}

    static defaultProps = {}

    constructor(props) {
        super(props)
        this.state = { image: null };
    }

    pickImage() {
        ImagePickerIOS.openSelectDialog({}, imageUri => {
            this.setState({ image: imageUri });
            console.log('image');
        }, error => console.log('Error picking image or pressed Cancel'));

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

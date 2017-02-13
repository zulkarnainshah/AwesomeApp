import React, { Component } from 'react';
import { View } from 'react-native';
import ImageDetails from './ImageDetails';

class Screen5 extends Component {

 state = { imageData: [] };
 componentWillMount() {
   fetch('https://server-dev1.mywardrobe.space/api/v1/test/pieces', {
            method: 'GET'
         })
         .then((response) => response.json())
         .then((responseJson) => {
            console.log(responseJson);
            this.setState({ imageData: responseJson });
          });
            }
          fillData() {
           return this.state.imageData.map(data =>
         <ImageDetails key={data.description} data={data} />);
          }
  render() {

   return (
   <View>
     {this.fillData()}

   </View>

 );
 }
}
export default Screen5;

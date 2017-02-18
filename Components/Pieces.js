import React from 'react';
import { Text, View, Image } from 'react-native';
import { NewButton } from './Common/NewButton';
import { CardSection } from './Common/CardSection';

const Pieces = (props) => {
  const {

    headerContentStyle,

    headerTextStyle,
    imageStyle
  } = styles;
  return (
<View>
<CardSection>
  <Image
    style={styles.imageStyle}
   source={{ uri: props.piecedetails.image }} />
   </CardSection>
   <CardSection>
   <View style={headerContentStyle}>
     <Text style={headerTextStyle}>{props.piecedetails.description}</Text>

   </View>
   </CardSection>
   <NewButton>
     Show piece
   </NewButton>

</View>

);

};
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

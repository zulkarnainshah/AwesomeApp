import React from 'react';
import { Image } from 'react-native';
import Card from './Common/Card';

const PiecesDetails = (props) => {

 return (
   <Card>
<Image
     style={styles.imageStyle}
   source={{ uri: props.pieces.image }}
/>
   </Card>
 );
};
const styles = {
      imageStyle: {
  height: 300,
  flexGrow: 1,
  width: null }
};
export default PiecesDetails;

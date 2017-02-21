import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { NewButton } from './Common/NewButton';
import { CardSection } from './Common/CardSection';


class Pieces extends Component {

  onShowPieceButtonPress(id) {
    console.log(id);

    const idToken = this.props.userInfo[0];
    const userId = this.props.userInfo[1];
    console.log(idToken);
    console.log(userId);

    Actions.ShowPiecesScreen({ idToken, userId, id });
  }
  render() {
  return (
<View>
 <CardSection>
   <Image
    style={styles.imageStyle}
   source={{ uri: this.props.piecedetails.image }} />
   </CardSection>
   <CardSection>
   <View style={styles.headerContentStyle}>
     <Text style={styles.headerTextStyle}>{this.props.piecedetails.description}</Text>

   </View>
   </CardSection>
   <NewButton onPress={() => this.onShowPieceButtonPress(this.props.piecedetails.id)}>
     Show piece
   </NewButton>

</View>
);
}
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

import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {retrivePieces} from '../Actions';
import Pieces from './Pieces';
import {Card, CardSection, Button} from './Common';
import {Spinner} from './Common/Spinner';
import GridView from './Common/GridView';

class UserHomeScreen extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        // this.state = { imagePieces: [] };

        this.state = {
            data: []
        }


    }

    componentWillMount() {
        this.props.retrivePieces();
        this.fillData()
    }

    onAddPieceButtonPress() {
        Actions.addPiecesScreen({userinfo: this.props.userInfo});
    }

     fillData() {
        const userInfo = this.props.userInfo;
        // return this.props.imagePieces.map(object =>
        //     <Pieces key={object.id} pieces={object} piecedetails={object} userInfo={userInfo} />
        // );

        for (let i = 0; i < this.props.imagePieces.length; i++) {
            this.state.data.push({
                id: this.props.imagePieces[i].id,
                uri: this.props.imagePieces[i].image
            })
        }
    }

    render() {
        if (this.props.dataLoading) {
            {
                return <Spinner size={'large'}/>;
            }

        }
        else {
            return (
                // <View style={{ flex: 1 }}>
                //     <ScrollView>
                //         {this.fillData()}
                //     </ScrollView>
                //     <CardSection>
                //         <Button onPress={this.onAddPieceButtonPress.bind(this)}>
                //             Add Piece
                //         </Button>
                //     </CardSection>
                // </View>

                <View style={{ flex: 1 }}>
                    <GridView>{this.props.imagePieces}</GridView>
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

export default connect(mapStateToProps, {retrivePieces})(UserHomeScreen);

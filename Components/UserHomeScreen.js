import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { retrivePieces } from '../Actions';
import Pieces from './Pieces';
import { Card, CardSection, Button} from './Common';
import { Spinner } from './Common/Spinner';

class UserHomeScreen extends Component {

    static propTypes = {}

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = { imagePieces: [] };
    }
    componentWillMount() {
        this.props.retrivePieces();
    }
    onAddpiecesButtonPress() {
        console.log(this.props.userInfo);

        Actions.addPiecesScreen({ userinfo: this.props.userInfo });
    }

    fillData() {
        const userInfo = this.props.userInfo;
        return this.props.imagePieces.map(object =>
            <Pieces key={object.id} pieces={object} piecedetails={object} userInfo={userInfo} />
        );

    }

    render() {
        if(this.props.dataLoading){
            {
                return <Spinner size={'large'} />;
            }

        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        {this.fillData()}

                    </ScrollView>
                    <CardSection>
                        <Button onPress={this.onAddpiecesButtonPress.bind(this)}>
                            add pieces
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

export default connect(mapStateToProps, { retrivePieces })(UserHomeScreen);

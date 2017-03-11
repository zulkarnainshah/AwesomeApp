import React, {Component} from 'react';
import {ScrollView, View,Text} from 'react-native';
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
                <View style={{ flex: 1 }}>
                    <GridView userInfo = {this.props.userInfo}>{this.props.imagePieces}</GridView>
                    <View style={styles.footerView}>
                        <View style={styles.button}>
                            <Text style={styles.buttonLabel}>Pieces</Text>
                        </View>
                        <View style={styles.button}>
                            <Text style={styles.buttonLabel}>Combinations</Text>
                        </View>
                        <View style={styles.button}>
                            <Text style={styles.buttonLabel}>Profile</Text>
                        </View>
                    </View>
                 
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

const styles = {
    footerView: {
        height: 60,
        padding:20,
        flexDirection: 'row',
        backgroundColor:'skyblue',
        justifyContent: 'space-between'
    },
    button:{
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#A6A8AB',
        justifyContent:'center'
    },
    buttonLabel: {
        fontSize: 18,
        padding:5,
        backgroundColor:'white'
    }

};
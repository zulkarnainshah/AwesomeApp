import React, {Component} from 'react';
import {View, Text, TouchableOpacity, AsyncStorage, ListView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {retrivePieces} from '../Actions';
import {Spinner} from './Common/Spinner';
import GridView from './Common/GridView';

class UserHomeScreen extends Component {

    static propTypes = {};

    static defaultProps = {};
    static selectedTab = 1;
    combinations = null;

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.getPieces()
    }

    getPieces() {
        this.props.retrivePieces();
        UserHomeScreen.selectedTab = 1;
        for (let i = 0; i < this.props.imagePieces.length; i++) {
            this.state.data.push({
                id: this.props.imagePieces[i].id,
                uri: this.props.imagePieces[i].image
            })
        }

    }

    /** Calls the Combinations API and saves the data in AsyncStorage **/
    async getCombinations() {

        let authToken = await AsyncStorage.getItem('authToken');
        let userInfo = await AsyncStorage.getItem('userInfo');

        if (authToken !== null && userInfo !== null) {
            let userID = JSON.parse(userInfo).id;
            const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/users/' + userID + '/combinations';
            fetch(API_ENDPOINT, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    AsyncStorage.setItem('combinations', JSON.stringify(responseJson));
                    UserHomeScreen.selectedTab = 2;
                    this.combinations = responseJson;
                    this.forceUpdate();
                });
        }
    }

    renderCombinationsTab() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        dataSource = ds.cloneWithRows(this.combinations);
        return (
            <View style={{flex: 1}}>
                <ListView
                    dataSource={dataSource}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                    renderRow={(rowData) => this.renderCombinationRow(rowData)}
                />

                <View style={styles.footerView}>
                    <TouchableOpacity onPress={this.showPiecesTab.bind(this)}>
                        <View style={styles.button} backgroundColor='white'>
                            <Text style={styles.buttonLabel} backgroundColor='cyan'>Pieces</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.getCombinations.bind(this)}>
                        <View style={styles.button} backgroundColor='cyan'>
                            <Text style={styles.buttonLabel}>Combinations</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.button} backgroundColor='white'>
                            <Text style={styles.buttonLabel}>Profile</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    renderPiecesTab() {
        return (
            <View style={{flex: 1}}>
                <GridView userInfo={this.props.userInfo}>{this.props.imagePieces}</GridView>

                <View style={styles.footerView}>
                    <TouchableOpacity onPress={this.showPiecesTab.bind(this)}>
                        <View style={styles.button} backgroundColor='cyan'>
                            <Text style={styles.buttonLabel} backgroundColor='cyan'>Pieces</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.getCombinations.bind(this)}>
                        <View style={styles.button} backgroundColor='white'>
                            <Text style={styles.buttonLabel}>Combinations</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.button} backgroundColor='white'>
                            <Text style={styles.buttonLabel}>Profile</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        );

    }

    showPiecesTab() {
        UserHomeScreen.selectedTab = 1;
        this.forceUpdate()
    }

    renderCombinationRow(rowData) {
        return (
            <View>
                <TouchableOpacity onPress ={this.showCombination.bind(rowData.id)}>
                    <Text style={styles.textStyle}>{rowData.id}</Text>
                    <Text style={styles.textStyle}>{rowData.description}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    /** Loads another view controller/screen which calls show combination API **/
    showCombination(){
        combinationID = this.valueOf();
        Actions.combinationDetailScene({combinationID:combinationID});
    }

    render() {
        if (this.props.dataLoading) {
            {
                return <Spinner size={'large'}/>;
            }

        }
        else {
            if (UserHomeScreen.selectedTab === 1) {
                return this.renderPiecesTab()
            }
            else if (UserHomeScreen.selectedTab === 2) {
                return this.renderCombinationsTab()
            }
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
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'skyblue',
        justifyContent: 'space-between'
    },
    button: {
        borderWidth: 2,
        height: 40,
        borderColor: 'gray',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonLabel: {
        fontSize: 18,
        padding: 5,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#8E8E8E',
    }

};
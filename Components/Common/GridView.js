import React, { Component } from 'react'

import {
    AppRegistry,
    ListView,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native'
import {Actions} from 'react-native-router-flux';

export default class GridView extends Component {
    constructor(props) {
        super(props)
        const data = props.children || [];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data)
        };

        this._renderRow = this._renderRow.bind(this);
        this._selectItem = this._selectItem.bind(this);

    }

    render() {
        return (
            <View style={styles.mainView}>
                <ListView
                    enableEmptySections={true}
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    initialListSize={30}
                />
            </View>
        )
    }


    _renderRow(rowData, sectionId, rowId) {
        if (rowData.image !== null) {
            const imgSource = {uri: rowData.image};
            return (
                <TouchableHighlight
                    style={styles.row}
                    onPress={() => this._selectItem(rowData)}
                    underlayColor='rgba(0,0,0,0)'>
                    <View>
                        <Image style={styles.thumb} source={imgSource}/>
                    </View>
                </TouchableHighlight>
            )
        }
        else {
            return null;
        }
    }

    _selectItem(item) {
        // do something with item
        const idToken = this.props.userInfo[0];
        const userId = this.props.userInfo[1];
        const id = item.id;
        Actions.ShowPiecesScreen({idToken, userId, id});
    }
}

const styles = StyleSheet.create({
    mainView: {
        paddingTop: 0,
        flex: 1
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#FFFFFF',
        paddingTop: 8,
    },
    row: {
        justifyContent: 'center',
        margin: 6,
        width: 100,
        height: 100,
        alignItems: 'flex-start'
    },
    thumb: {
        width: 100,
        height: 100
    }
})

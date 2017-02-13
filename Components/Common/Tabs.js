import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Tabs = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
          <Text style={textStyle}>
              {children}
          </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'flex-start',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 0,
        width: 100,
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderColor: '#FFFFFF',
        marginLeft: 5,
        marginRight: 5
    }
};

export { Tabs };

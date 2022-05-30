import React, { useState } from 'react';
import { View, Text } from 'react-native';

export default function Title(data) {
    return (
        <View style={
            {
                "alignItems": "left",
                "width": 290,
                "marginLeft": 3,
                "display": "flex",
                "flex-wrap": "wrap",
            }
        }>
            <Text style={
                {
                    "textAlign": "left",
                    "fontWeight": "bold",
                    "fontStyle": "italic",
                    "fontSize": 14,
                    "color": "rgba(0, 0, 0, 255)",
                }
            } > {data.data} </Text>
        </View>
    );
}
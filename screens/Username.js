import React, { useState } from 'react';
import { View, Text } from 'react-native';

export default function Username(data) {
    return (
        <View style={
            {
                "justifyContent": "center",
                "alignItems": "left",
                "width": 100,
                "height": 20,
                "marginTop": 8,
                "marginLeft": 3,
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
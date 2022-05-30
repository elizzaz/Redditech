import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

export default function HeaderImage(data) {
    console.log(data.data)
    return (
        <View style={
            {
                "justifyContent": "center",
                "alignItems": "center",
                "width": 40,
                "height": 40,
                "borderWidth": 1,
                "borderRadius": 100,
                "marginTop": 8,
                "marginLeft": 13,
            }
        }>
            <Image
                style={{width: '100%', height: '100%'}}
                source={{uri:(data.data)}}
            />
        </View>
    );
}
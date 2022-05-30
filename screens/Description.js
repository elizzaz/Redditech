import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function Description(data) {
    return (
        <View style={
            {
                "alignSelf": 'center',
                "marginTop": 10,
                "width": 330,
                "maxHeight": 100,
                "display": "flex",
                "flex-wrap": "wrap",
            }
        }>
            <ScrollView>
                <Text>{data.data}</Text>
            </ScrollView>
        </View>
    );
}
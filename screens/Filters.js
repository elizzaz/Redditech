import { View, Text, SafeAreaView } from 'react-native';
import { Button, ButtonGroup, withTheme } from 'react-native-elements';
import React, { useState, useEffect } from "react";

export default function Filters() {
    return (
        <SafeAreaView>
            <View style={
                {
                    "flexDirection": 'row',
                    "flexWrap": "wrap",
                    "justifyContent": 'center'
                }
            }>
                <Button
                    containerStyle={{ width: '30%', height: 100, margin: 3  }}
                    buttonStyle={{
                        backgroundColor: 'white', borderColor: '#EAD017', borderWidth: 1, borderRadius: 5, color: 'black'
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 18, color: '#EAD017' }}
                    title='Hot'
                />
                <Button
                    containerStyle={{ width: "30%", height: 100, margin: 3  }}
                    buttonStyle={{
                        backgroundColor: 'white', borderColor: '#EAD017', borderWidth: 1, borderRadius: 5, color: 'black'
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 18, color: '#EAD017' }}
                    title='Best'
                />
                <Button
                    containerStyle={{ width: "30%", height: 100, margin: 3 }}
                    buttonStyle={{
                        backgroundColor: 'white', borderColor: '#EAD017', borderWidth: 1, borderRadius: 5, color: 'black'
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 18, color: '#EAD017' }}
                    title='Top'
                />
            </View>
        </SafeAreaView>
    );
}
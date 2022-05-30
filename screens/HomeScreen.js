import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import React, { useState, useEffect } from "react";
import Username from './Username.js';
import HeaderImage from './HeaderImage.js';
import Title from './Title.js';
import Filters from './Filters.js';
import Description from './Description.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

var limit = 10

export function HomeScreen(navigation) {
    var [filter, setFilter] = useState("");
    var [items, setItems] = useState([]);
    var [aftid, setAftid] = useState("");
    const [token, setToken] = useState("");
    var [iconUrl, setIconUrl] = useState("");
    var [description, setDescription] = useState("");
    var [name, setName] = useState("");
    var [title, setTitle] = useState("");
    useEffect(async () => {
        await AsyncStorage.getItem("token").then((value) => {
            setToken(value);
        }).catch((error) => { console.log(JSON.stringify(error)); });
        var requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            redirect: "follow",
        };
        const res = await fetch(`https://oauth.reddit.com/${filter}?${limit}=10&afterid=${aftid}`, requestOptions); // hot / top
        const data = await res.json();
        for (let i = 0; i < limit; i++) {
            // setIconUrl(data.data.children[i].data.all_awardings[0].icon_url)
            setDescription(data.data.children[i].data.selftext)
            setName(data.data.children[i].data.subreddit_name_prefixed)
            setTitle(data.data.children[i].data.title)
            setAftid(data.data.children[limit].data.name)
            items.push(
                <View key={data.data.children[i].data.name}>
                    <View style={
                        {
                            "alignSelf": 'center',
                            "marginTop": 12,
                            "width": 370,
                            "height": 200,
                            "borderTop": "solid",
                            "borderTopColor": '#EAD017',
                            "borderTopWidth": 1,
                            "paddingTop": 30
                        }
                    }>
                        <View style={
                            {
                                "flexDirection": "row",
                            }
                        }>
                            {/* <HeaderImage data={data.data.children[i].data.all_awardings[0].icon_url} /> */}
                            <View style={
                                {
                                    "flexDirection": "column",
                                }
                            }>
                                <Username data={data.data.children[i].data.subreddit_name_prefixed} />
                                <Title data={data.data.children[i].data.title} />
                            </View>
                        </View>
                        <Description data={data.data.children[i].data.selftext} />
                        {/*
                <Subscribers />*/}
                    </View>
                </View>
            )
        }
        limit += 10

    });
    return (
        <ScrollView>
            <Filters></Filters>
            <View>
                {items}
            </View>
        </ScrollView>
    )
}

import React from 'react'
import { View, Text, StyleSheet } from "react-native";

import ListRow from "./ListRow";

function List({allRowMembers, noCols}) {
    const constructList = (allRowMembers, noCols) => {
        let list = [];
        for (let i = 0; i <= allRowMembers.length; i = i + noCols) {
            list.push(
                <ListRow rowMembers={allRowMembers.slice(i, i + noCols)} />
            )
        }
        return list;
    }
    return (
        <View>
            {constructList(allRowMembers, noCols)}
        </View>
    )
}

export default List

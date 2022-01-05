import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import {useTheme} from "@react-navigation/native"
function Loader(){
    const {colors}=useTheme()
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator
            size={30}
            color={colors.card}
            />
        </View>
    )
}

export default Loader;

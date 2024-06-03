import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Heading from '../../Components/Heading'
import Colors from '../../Utils/Colors'
import { useState } from 'react'

export default function AboutMe({business}) {
    const [readMore,setReadMore]=useState();
  return business&&(
    <View style={{marginTop:20}}>
    <Heading text={"About Me"} />
    <Text style={{color:Colors.GRAY,fontFamily:"outfit",lineHeight:28}} 
    numberOfLines={readMore?20:5}>{business?.about}</Text>

    <TouchableOpacity onPress={()=>setReadMore(!readMore)}>
        <Text style={{color:Colors.PRIMARY,fontFamily:"outfit"}}>{readMore?"Read Less":"Read More"}</Text>
    </TouchableOpacity>
    </View>
  )
}
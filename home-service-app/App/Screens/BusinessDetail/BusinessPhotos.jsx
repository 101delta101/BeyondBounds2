import { View, Text ,Image,FlatList} from 'react-native'
import React from 'react'
import Heading from '../../Components/Heading'

export default function BusinessPhotos({business}) {
  return (
    <View>
      <Heading text={"Photos"}/>
      <FlatList numColumns={2} data={business?.images} renderItem={({item})=>(
        <Image source={{uri:item?.url}} style={{width:"50%",height:120,flex:1,borderRadius:15,margin:7}}
        />
        )}
        />
    </View>
  )
}
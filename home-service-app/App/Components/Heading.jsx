import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

export default function Heading({text,isViewAll=false}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{text}</Text>
      {isViewAll?<Text>View All</Text>:null}
    </View>
  )
}
  const styles=StyleSheet.create({
    heading:{
        fontFamily:"outfit-medium",
        fontSize:27,
        marginBottom:10,
    },
    container:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center"
    }
})


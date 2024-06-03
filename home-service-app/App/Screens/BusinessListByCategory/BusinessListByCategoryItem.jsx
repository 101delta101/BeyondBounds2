import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BusinessListByCategoryItem({ business }) {
  // Check if business or business.images is undefined before accessing
  if (!business || !business.images || business.images.length === 0) {
    return null; // or render a placeholder image or some default content
  }


  const navigation=useNavigation();


  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-detail',{business:business})}>
      <Image source={{ uri: business.images[0].url }} style={styles.image} />
      <View style={styles.subcontainer}>
      <Text style={{fontFamily:"outfit-medium",fontSize:12,color:Colors.GRAY}}>{business.contactPerson}</Text>
      <Text style={{fontFamily:"outfit-bold",fontSize:15,color:Colors.BLACK}}>{business.name}</Text>
      <Text style={{fontFamily:"outfit-medium",fontSize:12,color:Colors.BLACK}}><Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} />{business.address}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:10,
    backgroundColor:Colors.WHITE,
    marginBottom:20,
    borderRadius:15,
    display:"flex",
    flexDirection:"row",
    gap:10,

  },
  subcontainer:{
    diplay:"flex",
    gap:10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius:15
  },
})

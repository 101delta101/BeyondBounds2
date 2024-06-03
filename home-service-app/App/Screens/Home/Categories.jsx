import { View, Text,StyleSheet,FlatList ,Image, TouchableOpacity} from 'react-native'
import React, { useState ,useEffect} from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Heading from '../../Components/Heading';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function Categories() {
    const navigation=useNavigation();
    const [categories,setCategories]=useState([]);

    useEffect(()=>{
        getCategories();
    },[])

    const getCategories=()=>{
        GlobalApi.getCategory().then(resp=>{
            setCategories(resp?.categories);
        })
    } 
  return (
    <View style={{marginTop:10}}>
      <Heading text={"Categories"} isViewAll={true}/>
      <FlatList data={categories} numColumns={4}
            renderItem={({item,index})=>index<=3&&(             //initially minimum of 4 categories are displayed,when clicked view al ,all displayed
                <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-list',{category:item.name})} >
                    <View style={styles.iconContainer}>
                        <Image source={{uri:item?.icon?.url}} 
                        style={styles.category}/>
                    </View>
                    <Text style={{fontFamily:"outfit-medium"}}>{item?.name}</Text>
                </TouchableOpacity>
            )}/>
    </View>
  )
}

const styles=StyleSheet.create({
    category:{
        width:30,
        height:30
    },
    iconContainer:{
        backgroundColor:Colors.LIGHTGRAY,
        padding:17,
        borderRadius:99,
    },
    container:{
        flex:1,
        alignItems:"center",
        padding:-25
    }
})
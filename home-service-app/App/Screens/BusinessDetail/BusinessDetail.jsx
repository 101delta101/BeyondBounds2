import { View, Text ,ScrollView,Image, TouchableOpacity,StyleSheet,Modal} from 'react-native'
import React from 'react'
import { useRoute ,useNavigation} from '@react-navigation/native'
import { useEffect,useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import Heading from '../../Components/Heading';
import BusinessPhotos from './BusinessPhotos';
import AboutMe from './AboutMe';
import Bookingmodal from './BookingModal';


export default function BusinessDetail() {
    const param=useRoute().params;
    [business,setBusiness]=useState();
    [showModal,setShowModal]=useState(false);
    const navigation=useNavigation();

    useEffect(()=>{
        param&&setBusiness(param?.business)
    },[param])
  return (
    <View>
    <ScrollView style={{height:'90%'}}>

      <TouchableOpacity 
      style={{position:"absolute",zIndex:10,padding:15}}
      onPress={()=>navigation.goBack()}>

      <AntDesign name="arrowleft" size={24} color="black" />

      </TouchableOpacity>
      <Image source={{uri:business?.images[0]?.url}}
      style={{width:'100%',height:300}} />

      <View style={styles.infoContainer}>

        <View style={{display:"flex",flexDirection:"row",gap:10}}>
          <Text style={{fontFamily:"outfit-bold",fontSize:20,marginBottom:10}}>{business?.name}</Text>
          <AntDesign name="star" size={24} color="gold" />
        </View>


        <View style={styles.subContainer}>
          <Text style={{color:Colors.PRIMARY,fontSize:15,fontFamily:"outfit-medium"}}>{business?.contactPerson}</Text>
          <Text style={{color:Colors.PRIMARY,backgroundColor:Colors.LIGHT_PRIMARY,display:"flex"}}>{business?.categories?.name}</Text>
        </View>

        <TouchableOpacity>
        <Text style={{fontFamily:"outfit",fontSize:17,color:Colors.GRAY}}><Ionicons name="location-sharp" size={25} color={Colors.PRIMARY} />{business?.address}</Text>
        </TouchableOpacity>
        <View style={{borderWidth:0.4,borderColor:Colors.GRAY,marginTop:30}}></View>
       
        <AboutMe business={business}/>

        <View style={{borderWidth:0.4,borderColor:Colors.GRAY,marginTop:30}}></View>
        <BusinessPhotos business={business}/>
      </View>


    </ScrollView>
    <View style={{display:"flex",flexDirection:"row",gap:5,margin:10}}>
        <TouchableOpacity style={styles.messageBtn}>
            <Text style={{fontFamily:'outfit-medium',color:Colors.PRIMARY,textAlign:"center"}}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookingBtn} onPress={()=>setShowModal(true)}>
            <Text style={{fontFamily:'outfit-medium',color:Colors.WHITE,textAlign:"center"}}>Book Now</Text>
        </TouchableOpacity>
    </View>
    <Modal animationType="slide" visible={showModal}>
        <Bookingmodal/>
    </Modal>
    </View>
    
  )
}

const styles=StyleSheet.create({
    infoContainer:{
        padding:20,
    },
    subContainer:{
        display:"flex",
        flexDirection:"row",
        gap:5,
        marginBottom:10,
        alignItems:"center"
    },
    messageBtn:{
        borderWidth:1,
        flex:1,
        padding:15,
        backgroundColor:Colors.WHITE,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
    },
    bookingBtn:{
        borderWidth:1,
        flex:1,
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderColor:Colors.PRIMARY,
        borderRadius:99
    }
}
)
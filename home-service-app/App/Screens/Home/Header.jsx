import { View, Text ,StyleSheet,Image, TextInput} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
    const {user,isLoading}=useUser();
  return user&&(
    <View style={styles.container}>

    {/*profile*/}

    <View style={styles.mainProfileContainer}>
      <View style={styles.profileContainer}>
        <Image source={{uri:user?.imageUrl}} 
        style={styles.userImage}/>

          <View>
              <Text style={{color:Colors.WHITE,fontFamily:"outfit"}}>Welcome</Text>
              <Text style={{color:Colors.WHITE,fontSize:20,fontFamily:"outfit-medium"}}>{user?.fullName}</Text>   
          </View>
      </View>
      <FontAwesome name="bookmark-o" size={27} color={Colors.WHITE} />
      </View>

      {/*search bar*/}
      
      <View style={styles.searchBarContainer}>
        <TextInput placeholder="Search"
        style={styles.textInput}/>
        <FontAwesome style={styles.searchBtn} name="search" size={24} color={Colors.PRIMARY} />
      </View>
      



    </View>
  )
}

const styles=StyleSheet.create({
    userImage:{
        width:45,
        height:45,
        borderRadius:99
    },
    container:{
        padding:20,
        paddingTop:40,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25
    },
    mainProfileContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    profileContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:10
    },
    textInput:{
        padding:7,
        paddingHorizontal:16,
        backgroundColor:Colors.WHITE,
        borderRadius:8,
        width:"85%"
    },

    searchBarContainer:{
        marginTop:20,
        display:"flex",
        flexDirection:"row",
        gap:10
    },

    searchBtn:{
        backgroundColor:Colors.WHITE,
        padding:7,
        borderRadius:8,
    }
})
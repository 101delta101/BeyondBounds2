import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import React from 'react'
import PageHeading from '../../Components/PageHeading'
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import { StyleSheet } from 'react-native';
import Heading from '../../Components/Heading';
import { useEffect,useState } from 'react';
export default function Bookingmodal() {

  useEffect(()=>{
      getTime()
  },[]
  )
  const [selectedTime,setSelectedTime]=useState();
  const [timeList,setTimeList]=useState();
  const getTime=()=>{
    const timeList=[];
    for(let i=8;i<12;i++){
      timeList.push({
        time:i+":00 AM"
      })
      timeList.push({
        time:i+":30 AM"
      })
    }
    for(let i=1;i<7;i++){
      timeList.push({
        time:i+":00 PM"
      })
      timeList.push({
        time:i+":30 PM"
      })
    }
    setTimeList(timeList)
  }

  
  return (
    <View style={{margin:5}}>
      <View style={{marginBottom:20}}>
      <PageHeading title={"Booking"} />
      </View>
      <View>
      <Heading text={"Select Date"}/>
      <View style={styles.calendarContainer}>
      <CalendarPicker 
      onDateChange={this.onDateChange}
       width={350} 
       minDate={Date.now()}
       selectedDayColor={Colors.PRIMARY}
       selectedDayTextColor={Colors.WHITE}
       todayBackgroundColor={Colors.BLACK}
       todayTextStyle={{color:Colors.WHITE}}/>
       
      </View>
      <View style={{marginTop:30}}>
        <Heading text="Select Time Slot"/>
        <FlatList data={timeList}
        horizontal={true}
        renderItem={({item,index})=>(
          <TouchableOpacity style={{marginRight:10}} onPress={()=>setSelectedTime(item.time)}>
              <Text style={[selectedTime==item.time?styles.selectedStyle:styles.unselectedStyle]}>{item.time}</Text>
          </TouchableOpacity>
        )} />
      </View>
      </View>
      
    </View>
    
  )
}
const styles= StyleSheet.create({
  calendarContainer:{
      borderRadius:20,
      backgroundColor:Colors.LIGHT_PRIMARY,
      padding:20,
      top:20
  },
  selectedStyle:{
    borderRadius:99,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    padding:10,
    paddingHorizontal:15,
    color:Colors.WHITE,
    backgroundColor:Colors.PRIMARY
  },
  unselectedStyle:{
      borderRadius:99,
      borderWidth:1,
      borderColor:Colors.PRIMARY,
      padding:10,
      paddingHorizontal:15,
      color:Colors.PRIMARY
  }

})
    
import { View, Text, FlatList } from 'react-native'
import {React} from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import { useEffect ,useState} from 'react'
import BusinessListItem from '../BusinessListByCategory/BusinessListByCategoryItem'

export default function Booking() {

  const {user}=useUser();
  const [bookingList,setBookingList]=useState();
  useEffect(()=>{
    user&&getUserBookings();
  },[user])

  const getUserBookings=()=>{
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(resp=>{
    setBookingList(resp.bookings)
    })
  }
  return (
    <View style={{padding:20}}>
      <Text style={{fontFamily:"outfit-medium",fontSize:26}}>Booking</Text>
      <View>
        <FlatList 
        data={bookingList}
        renderItem={({item,index})=>(
          <BusinessListItem business={item?.businessList}/>
        )}/>
      </View>
    </View>
  )
}
import { View, Text,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import Heading from '../../Components/Heading'
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItemSmall from './BusinessListItemSmall';


export default function BusinessList() {

    const [businessList,setBusinessList]=useState([]);
    
    useEffect(() => {
        getBusinessList();
    }, []);


    const getBusinessList = async () => {
        try {
            const resp = await GlobalApi.getBusinessList();
            setBusinessList(resp?.businessLists);
        } catch (error) {
            console.error('Error fetching business list:', error);
        }
    };
    
  return (
    <View style={{marginTop:1}}>
      <Heading text={"Latest Business"} isViewAll={true} />
      <FlatList data={businessList} horizontal={true} showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>index<=1&&(             //initially minimum of 4 categories are displayed,when clicked view al ,all displayed
                <View style={{marginRight:10}}>
                    <BusinessListItemSmall business={item}/>
                </View>
            )}
            ListEmptyComponent={() => <Text>No businesses found</Text>} />
    </View>
  )
}
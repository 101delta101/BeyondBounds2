import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { useEffect ,useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListByCategoryItem from './BusinessListByCategoryItem';
import PageHeading from '../../Components/PageHeading';

export default function BusinessListByCategory() {
    const param=useRoute().params;
    const navigation=useNavigation();


    const [businessList,setBusinessList]=useState([]);
    


    useEffect(()=>{
        param&&getBusinessListByCategory();
    },[param])



    const getBusinessListByCategory = () => {
        if (!param || !param.category){
            console.error('Category parameter is missing or undefined.');
            return;
        }
        
        GlobalApi.getBusinessListByCategory(param.category)
          .then(resp => {
            if (resp && resp.businessLists) {
              setBusinessList(resp.businessLists);
            } else {
              console.log('Response data or businessLists not found:', resp);
            }
          })
          .catch(error => {
            console.error('Error fetching business list:', error);
          });
    };
    


  return (
    <View style={{padding:20,paddingTop:30}}>  
      <PageHeading title={param.category}/>
      {businessList?.length>0?
      <FlatList data={businessList} renderItem={({item,index})=>(
        <BusinessListByCategoryItem business={item}/>
      )}/>:
      <Text style={{fontFamily:"outfit-medium",marginTop:20,fontSize:20}}>No Business Found</Text>
    }

    </View>
  )
}
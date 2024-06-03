import React, { useEffect, useState } from 'react';
import { View, Text ,Image,StyleSheet,FlatList} from 'react-native';
import GlobalApi from '../../Utils/GlobalApi';
import { loadFonts } from '../../Utils/FontLoader';
import Heading from '../../Components/Heading';

export default function Slider() {
    const [slider, setSlider] = useState();

    useEffect(() => {
        getSliders();
    }, []);

    const getSliders = () => {
        GlobalApi.getSlider().then(resp => {
            console.log("resp", resp.sliders);
            setSlider(resp?.sliders);
        });
    };
    
    return (
        <View>
            <Heading text={"Offers For You"}/>
            <FlatList data={slider} horizontal={true} style={{paddingTop:-20}}
            renderItem={({item,index})=>(
                <View>
                        <Image source={{uri:item?.image?.url}} 
                        style={styles.sliderImage}/>
                </View>
            )}/>
        </View>
    );
}


const styles=StyleSheet.create({

    sliderImage:{
        width:270,
        height:150,
        borderRadius:20,
        objectFit:"contain",
        

    }
})

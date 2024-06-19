import { View, Text, FlatList, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import React from 'react';
import PageHeading from '../../Components/PageHeading';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import { StyleSheet } from 'react-native';
import Heading from '../../Components/Heading';
import { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from '../../Utils/GlobalApi';

export default function BookingModal({ businessId, hideModal }) {
  useEffect(() => {
    getTime();
  }, []);

  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [timeList, setTimeList] = useState([]);
  const [note, setNote] = useState();
  const { user } = useUser();

  // Time slots display function
  const getTime = () => {
    const timeList = [];
    for (let i = 8; i < 12; i++) {
      timeList.push({
        time: i + ":00 AM"
      });
      timeList.push({
        time: i + ":30 AM"
      });
    }
    for (let i = 1; i < 7; i++) {
      timeList.push({
        time: i + ":00 PM"
      });
      timeList.push({
        time: i + ":30 PM"
      });
    }
    setTimeList(timeList);
  };

  const createNewBooking = () => {
    if (!selectedTime || !selectedDate) {
      ToastAndroid.show("Please select the full details", ToastAndroid.LONG);
      return;
    }
    const data = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress.emailAddress,
      time: selectedTime,
      date: selectedDate,
      note: note,
      businessId: businessId
    };
    GlobalApi.createBooking(data).then(resp => {
      ToastAndroid.show("Booking Created Successfully", ToastAndroid.LONG);
      console.log("Resp", resp);
      hideModal();
    }).catch(err => {
      ToastAndroid.show("Booking Failed", ToastAndroid.LONG);
      console.error("Error:", err);
    });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <View style={{ margin: 5 }}>
          <View style={{ marginBottom: 8 }}>
            <PageHeading title={"Booking"} />
          </View>

          {/* Calendar Picker */}
          <View>
            <Heading text={"Select Date"} />
            <View style={styles.calendarContainer}>
              <CalendarPicker
                onDateChange={setSelectedDate}
                width={350}
                minDate={Date.now()}
                selectedDayColor={Colors.PRIMARY}
                selectedDayTextColor={Colors.WHITE}
                todayBackgroundColor={Colors.BLACK}
                todayTextStyle={{ color: Colors.WHITE }} />
            </View>

            {/* Time Slot */}
            <View style={{ marginTop: 20 }}>
              <Heading text="Select Time Slot" />
              <FlatList data={timeList}
                horizontal={true}
                renderItem={({ item, index }) => (
                  <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setSelectedTime(item.time)}>
                    <Text style={[selectedTime == item.time ? styles.selectedStyle : styles.unselectedStyle]}>{item.time}</Text>
                  </TouchableOpacity>
                )} />
            </View>

            {/* Suggestion note */}
            <View style={{ marginTop: 15 }}>
              <Heading text="Any Suggestions" />
              <TextInput
                placeholder='type'
                numberOfLines={4}
                onChangeText={(text) => setNote(text)}
                style={styles.inputContainer} />
            </View>

            {/* Confirm button */}
            <TouchableOpacity style={styles.confirmBtn}
              onPress={createNewBooking}>
              <Text style={{
                padding: 10,
                fontFamily: "outfit-medium",
                fontSize: 16,
                color: Colors.WHITE,
                textAlign: "center"
              }}
              >Confirm And Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    borderRadius: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 20,
    marginTop: -10
  },
  selectedStyle: {
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    padding: 10,
    paddingHorizontal: 15,
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY
  },
  unselectedStyle: {
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    padding: 10,
    paddingHorizontal: 15,
    color: Colors.PRIMARY
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 15,
    borderColor: Colors.PRIMARY,
    fontSize: 16,
    fontFamily: "outfit"
  },
  confirmBtn: {
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: Colors.PRIMARY,
    marginTop: 10,
    padding: 10,
  }
});

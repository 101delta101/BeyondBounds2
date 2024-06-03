import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/Login/Login';
import {ClerkProvider,SignedIn,SignedOut} from '@clerk/clerk-expo'
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { useFonts } from 'expo-font';
import { loadFonts } from './App/Utils/FontLoader';


const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};


 /*when signed in show navigationcontainer for navigation,
 inside it the tabnavigation means which kind of navigation is used*/


export default function App() {
  const [fontsLoaded, fontError] = loadFonts();
  return (
  <ClerkProvider tokenCache={tokenCache} publishableKey="pk_test_YWxsb3dpbmctdGVycmllci0xNi5jbGVyay5hY2NvdW50cy5kZXYk">
    <View style={styles.container}>
      

      <SignedIn>
          <NavigationContainer>    
            <TabNavigation/>
          </NavigationContainer>
      </SignedIn>


      <SignedOut>
          <Login />
      </SignedOut>

      <StatusBar style="auto" />
    </View>
  </ClerkProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:20
  },
});

import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      console.log("Button pressed. Starting OAuth flow...");
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        console.log("Session created. Activating session...");
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  console.log("Rendering Login component...");

  return (
    <View style={{ alignItems: "center" }}>
      <Image source={require('./../../../assets/images/login.png')}
        style={styles.loginImage} />

      <View style={styles.subContainer}>
        <Text style={{ fontSize: 27, color: Colors.WHITE, textAlign: "center" }}>Let's Find <Text style={{ fontWeight: 'bold' }}>Professional Cleaning And Repair</Text> Service</Text>

        <Text style={{ fontSize: 17, color: Colors.WHITE, textAlign: "center", marginTop: 20 }}>Best place where you can find world-class services delivered to you</Text>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={{ textAlign: "center" }}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    borderRadius: 15
  },
  subContainer: {
    width: "100%",
    backgroundColor: Colors.PRIMARY,
    height: "70%",
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99
  }
})

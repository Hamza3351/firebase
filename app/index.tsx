import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  statusCodes
} from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const index = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId: '473884417741-d0loq2hurim0kep56k2q4k7ctbikrfu1.apps.googleusercontent.com',
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      console.log('response', response);

      const googleCredential = auth.GoogleAuthProvider.credential(response.data?.idToken);

      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;
          default:
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          style={{ elevation: 5 }}
        />
      </View>
    );
  }

  return (
    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 20, marginBottom: 20, color: '#333' }}>Welcome {user.email}</Text>
      <TouchableOpacity 
        onPress={signOut}  
        style={{
          backgroundColor: '#4285F4',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 25,
          elevation: 3
        }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
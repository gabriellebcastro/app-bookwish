import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, storage, firestore } from '../../src/firebase/config';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  setDoc,
  getDoc,
  doc,
} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

export default function Profile({ navigation }) {
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName);
      fetchUserData(user.uid);
    }
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const userDocRef = doc(getFirestore(), 'usuarios', uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setBio(userData.bio || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Erro ao fazer logout:', error);
      });
  };

  const handleChooseProfileImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setProfileImage(pickerResult.assets[0].uri);
      saveProfileImage(pickerResult.assets[0].uri);
    }
  };

  const saveProfileImage = async (imageUri) => {
    try {
      const uri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

      const response = await fetch(uri);
      const blob = await response.blob();

      const uid = auth.currentUser.uid;
      const ref = storage.ref().child(`profileImages/${uid}`);
      await ref.put(blob);
      const url = await ref.getDownloadURL();

      const userDocRef = doc(getFirestore(), 'usuarios', uid);
      await setDoc(userDocRef, { photoURL: url });
    } catch (error) {
      console.error('Error saving profile image:', error);
    }
  };

  const saveBio = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const userDocRef = doc(getFirestore(), 'usuarios', uid);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          await updateDoc(userDocRef, { bio });
        } else {
          await setDoc(userDocRef, { bio });
        }
  
        console.log('Bio saved successfully');
      }
    } catch (error) {
      console.error('Error saving bio:', error);
    }
  };
  
  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteAccount = () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      user
        .delete()
        .then(() => {
          console.log('Conta excluída com sucesso');
          navigation.navigate('Login');
        })
        .catch((error) => {
          console.error('Erro ao excluir a conta:', error);
        });
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteConfirmation(false);
  };

  const showConfirmationAlert = () => {
    Alert.alert(
      'Delete Account',
      'Do you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel', onPress: cancelDeleteAccount },
        { text: 'Yes', style: 'destructive', onPress: confirmDeleteAccount },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleChooseProfileImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Image
            source={require('../../assets/profilepic.png')}
            style={styles.profileImage}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.bio}>My bio:</Text>
      <TextInput
        style={styles.bioInput}
        multiline
        placeholder="Enter your bio"
        value={bio}
        onChangeText={setBio}
        onBlur={saveBio} // Save bio when the user finishes editing
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={showConfirmationAlert}>
        <Text style={styles.deleteButtonText}>Excluir Conta</Text>
      </TouchableOpacity>

      {showDeleteConfirmation && (
        <View style={styles.overlay} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioInput: {
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#151E47',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { auth } from '../../src/firebase/config.js';

export default function BookLibrary({ route, navigation }) {
  const { book } = route.params;

  const removeBookFromLibrary = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const { uid } = user;
        const db = getFirestore();
        const libraryRef = doc(db, 'usuarios', uid, 'library', book.id);
        console.log('Library reference:', libraryRef); // Verifique se a referência do documento está correta
        await deleteDoc(libraryRef);
        console.log('Book removed from library');
        navigation.goBack();
      }
    } catch (error) {
      console.log('Error removing book from library:', error); // Verifique se algum erro é capturado
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bookCover} source={{ uri: book.coverImage }} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.pages}>{book.pageCount} pages</Text>
      <TouchableOpacity style={styles.removeButton} onPress={removeBookFromLibrary}>
        <Text style={styles.removeButtonText}>Remove from Library</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  bookCover: {
    width: 200,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    marginBottom: 10,
  },
  pages: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  removeButton: {
    marginTop: 20,
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

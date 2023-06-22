import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { auth, firestore } from '../../src/firebase/config.js';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default function BookDetails({ navigation, route }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    const { bookId } = route.params;
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
      const data = await response.json();
      if (data && data.volumeInfo) {
        setBook(data.volumeInfo);
      }
    } catch (error) {
      console.log('Error fetching book details', error);
    }
  };

  const saveBookToLibrary = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const { uid } = user;
        const db = getFirestore();
        const libraryRef = collection(db, 'usuarios', uid, 'library');
        await addDoc(libraryRef, {
          title: book.title,
          author: book.authors && book.authors.join(', '),
          coverImage: book.imageLinks?.thumbnail,
        });
        console.log('Book saved to library');
      }
    } catch (error) {
      console.log('Error saving book to library', error);
    }
  };

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bookContainer}>
        <Image
          style={styles.bookCover}
          source={{ uri: book.imageLinks?.thumbnail }}
        />
        <View style={styles.bookDetails}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.authors && book.authors.join(', ')}</Text>
          <Text style={styles.pages}>{book.pageCount} pages</Text>
          <Text style={styles.isbn}>ISBN: {book.industryIdentifiers?.[0]?.identifier}</Text>
        </View>
      </View>
      <View style={styles.synopsisContainer}>
        <Text style={styles.synopsisTitle}>Synopsis</Text>
        <View style={styles.synopsisScrollContainer}>
          <ScrollView>
            <Text style={styles.synopsis}>{book.description}</Text>
          </ScrollView>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveBookToLibrary}>
      <Text style={styles.saveButtonText}>Save to Library</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  bookContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bookCover: {
    width: 100,
    height: 150,
    marginRight: 20,
  },
  bookDetails: {
    flex: 1,
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
  isbn: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  synopsisContainer: {
    marginBottom: 20,
  },
  synopsisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  synopsisScrollContainer: {
    flex: 1,
    maxHeight: 200,
  },
  synopsis: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#151E47',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

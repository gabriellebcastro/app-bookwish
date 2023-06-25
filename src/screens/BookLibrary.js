import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getFirestore, doc, updateDoc, deleteDoc, collection, setDoc, addDoc } from 'firebase/firestore';
import { auth } from '../../src/firebase/config.js';
import { FontAwesome } from 'react-native-vector-icons';

export default function BookLibrary({ route, navigation }) {
  const { book } = route.params;
  const [rating, setRating] = useState(book.rating || 0);
  const [isFavorite, setIsFavorite] = useState(book.isFavorite || false);
  const [status, setStatus] = useState(book.status || '');

  const updateBookRating = async (newRating) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const { uid } = user;
        const db = getFirestore();
        const bookRef = doc(db, 'usuarios', uid, 'library', book.id);
        await updateDoc(bookRef, { rating: newRating });
        setRating(newRating);
        console.log('Book rated.');
      }
    } catch (error) {
      console.log('Error updating book rating:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const { uid } = user;
        const db = getFirestore();
        const bookRef = doc(db, 'usuarios', uid, 'library', book.id);
        await updateDoc(bookRef, { isFavorite: !isFavorite });
        setIsFavorite(!isFavorite);
        console.log('Book is favorite.');
      }
    } catch (error) {
      console.log('Error updating favorite status:', error);
    }
  };

  const removeBookFromLibrary = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const { uid } = user;
        const db = getFirestore();
        const bookRef = doc(db, 'usuarios', uid, 'library', book.id);
        await deleteDoc(bookRef);
        console.log('Book removed from library');
        navigation.goBack();
      }
    } catch (error) {
      console.log('Error removing book from library:', error);
    }
  };

  const updateBookStatus = async (newStatus) => {
    try {
        const user = auth.currentUser;
        if (user) {
          const { uid } = user;
          const db = getFirestore();
          const bookRef = doc(db, 'usuarios', uid, 'library', book.id);
    
          if (newStatus === 'Lendo') {
            const historyCollectionRef = collection(db, 'usuarios', uid, 'library', book.id, 'history');
            const historyData = {
              startDate: new Date().toISOString(),
              endDate: null,
              comments: [],
              currentPage: null,
            };
            const newHistoryDocRef = await addDoc(historyCollectionRef, historyData);
            console.log('History document created:', newHistoryDocRef.id);
          }
    
          await updateDoc(bookRef, { status: newStatus });
          setStatus(newStatus);
          console.log('Book status updated.');
        }
      } catch (error) {
        console.log('Error updating book status:', error);
      }
    
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bookCover} source={{ uri: book.coverImage }} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.pages}>{book.pageCount} pages</Text>

      <View style={styles.ratingContainer}>
        <TouchableOpacity onPress={() => updateBookRating(1)}>
          <Text style={[styles.ratingStar, rating >= 1 && styles.ratingStarActive]}>★</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateBookRating(2)}>
          <Text style={[styles.ratingStar, rating >= 2 && styles.ratingStarActive]}>★</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateBookRating(3)}>
          <Text style={[styles.ratingStar, rating >= 3 && styles.ratingStarActive]}>★</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateBookRating(4)}>
          <Text style={[styles.ratingStar, rating >= 4 && styles.ratingStarActive]}>★</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateBookRating(5)}>
          <Text style={[styles.ratingStar, rating === 5 && styles.ratingStarActive]}>★</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[styles.statusOption, status === 'Quero ler' && styles.selectedStatusOption]}
          onPress={() => updateBookStatus('Quero ler')}
        >
          <Text style={styles.statusOptionText}>Quero ler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusOption, status === 'Lendo' && styles.selectedStatusOption]}
          onPress={() => updateBookStatus('Lendo')}
        >
          <Text style={styles.statusOptionText}>Lendo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusOption, status === 'Lido' && styles.selectedStatusOption]}
          onPress={() => updateBookStatus('Lido')}
        >
          <Text style={styles.statusOptionText}>Lido</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <FontAwesome
          name={isFavorite ? 'heart' : 'heart-o'}
          size={24}
          color={isFavorite ? 'red' : 'gray'}
        />
      </TouchableOpacity>

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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  ratingStar: {
    fontSize: 24,
    color: 'gray',
  },
  ratingStarActive: {
    color: 'gold',
  },
  favoriteButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusLabel: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  statusOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
  },
  selectedStatusOption: {
    backgroundColor: 'gray',
  },
  statusOptionText: {
    color: 'black',
  },
});

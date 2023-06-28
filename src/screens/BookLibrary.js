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
  const [historyId, setHistoryId] = useState(null);

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
        await updateDoc(bookRef, { status: newStatus });
        setStatus(newStatus);
        console.log('Book status updated.');
      }
    } catch (error) {
      console.log('Error updating book status:', error);
    }
  };

  const renderHistoryButton = () => {
    if (status === 'Lendo') {
      return (
        <TouchableOpacity style={styles.historyButton} onPress={handleHistoryButtonPress}>
          <Text style={styles.historyButtonText}>Adicionar histórico de leitura</Text>
        </TouchableOpacity>
      );
    } else if (status === 'Lido') {
      return (
        <TouchableOpacity style={styles.historyButton} onPress={handleHistoryButtonPress}>
          <Text style={styles.historyButtonText}>Visualizar histórico de leitura</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const handleHistoryButtonPress = () => {
    if (status === 'Lendo') {
      navigation.navigate('ReadingHistory', { book });
    } else if (status === 'Lido') {
      // Visualizar histórico de leitura
      // ...
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

        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <FontAwesome
            name={isFavorite ? 'heart' : 'heart-o'}
            size={24}
            color={isFavorite ? 'red' : 'gray'}
          />
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

      <TouchableOpacity style={styles.removeButton} onPress={removeBookFromLibrary}>
        <Text style={styles.removeButtonText}>Remove from Library</Text>
      </TouchableOpacity>

      {renderHistoryButton()}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
  },
  pages: {
    fontSize: 16,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ratingStar: {
    fontSize: 24,
    marginRight: 5,
  },
  ratingStarActive: {
    color: 'gold',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusOption: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  selectedStatusOption: {
    backgroundColor: 'gray',
  },
  statusOptionText: {
    fontSize: 16,
  },
  favoriteButton: {
    marginBottom: 20,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  historyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { auth, firestore } from '../../src/firebase/config.js';
import { getFirestore, collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';

const generateRandomRating = () => {
  return Math.floor(Math.random() * 5) + 1;
};

const renderStars = (rating) => {
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(<Image key={i} source={require('../../assets/star.png')} style={styles.starIcon} />);
  }

  return (
    <View style={styles.starsContainer}>
      {stars}
    </View>
  );
};

export default function Library({ navigation }) {
  const [libraryBooks, setLibraryBooks] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const { uid } = user;
      const db = getFirestore();
      const libraryRef = collection(db, 'usuarios', uid, 'library');
      const q = query(libraryRef);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const booksData = [];
        snapshot.forEach((doc) => {
          const book = doc.data();
          booksData.push(book);
        });
        setLibraryBooks(booksData);
      });

      return () => unsubscribe();
    }
  }, []);

  const navigateToBookDetails = (book) => {
    navigation.navigate('BookDetails', { bookId: book.id });
  };

  const renderItem = ({ item }) => {
    const key = uuidv4(); // Generate a unique key for each item
    return (
      <TouchableOpacity style={styles.button} key={key} onPress={() => navigateToBookDetails(item)}>
        <Image source={{ uri: item.coverImage }} style={styles.bookCover} />
        <Text style={styles.buttonText}>{item.title}</Text>
        {renderStars(generateRandomRating())}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={libraryBooks}
        renderItem={renderItem}
        keyExtractor={() => uuidv4()}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginRight: 10,
  },
  button: {
    width: 150,
    height: 245,
    backgroundColor: '#ECECEC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 10,
    elevation: 8,
  },
  bookCover: {
    width: '100%',
    height: '80%',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    marginTop: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 0,
  },
  starIcon: {
    width: 18,
    height: 18,
    marginRight: 2,
    marginBottom: 2
  },
});

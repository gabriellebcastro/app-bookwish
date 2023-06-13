import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import { SearchBar } from 'react-native-elements';

const BookCoverButton = ({ onPress, coverImage }) => {
  return (
    <TouchableOpacity style={styles.bookCoverButton} onPress={onPress}>
      <Image source={coverImage} style={styles.bookCoverImage} />
    </TouchableOpacity>
  );
};

export default function Bookwish({ navigation }) {

  const bookCovers = [
    { id: 1, coverImage: require('../../assets/book1.jpg') },
    { id: 2, coverImage: require('../../assets/book2.jpg') },
    { id: 3, coverImage: require('../../assets/book3.jpg') },
    { id: 4, coverImage: require('../../assets/book4.jpg') },
    { id: 5, coverImage: require('../../assets/book5.jpg') },
    { id: 6, coverImage: require('../../assets/book6.jpg') },
  ];

  const currentReading = {
    title: 'Current Book',
    author: 'John Doe',
    progress: 57,
    coverImage: require('../../assets/book1.jpg')
  };

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        placeholder="Search"
        inputStyle={{ backgroundColor: 'white' }}
        containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
        inputContainerStyle={{ backgroundColor: 'white' }}
        placeholderTextColor={'#555555'}
      />

      <View style={styles.view}>
        <Text style={styles.title}>Discover new books</Text>
        <ScrollView horizontal>
          {bookCovers.map((book) => (
            <BookCoverButton
              key={book.id}
              onPress={() => {}}
              coverImage={book.coverImage}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.view}>
        <Text style={styles.title}>Continue reading</Text>
        <View style={styles.currentReadingContainer}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{currentReading.progress}% completed</Text>
          </View>

          <View style={styles.bookInfoContainer}>
            <TouchableOpacity style={styles.currentBookButton}>
              <Image source={currentReading.coverImage} style={styles.currentBookImage} />
            </TouchableOpacity>

            <View style={styles.bookInfoTextContainer}>
              <Text style={styles.bookTitle}>{currentReading.title}</Text>
              <Text style={styles.bookAuthor}>{currentReading.author}</Text>
            </View>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
    backgroundColor: 'white'
  },
  view: {
    padding: 10,
    marginLeft: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  bookCoverButton: {
    width: 95,
    height: 115,
    borderRadius: 30,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bookCoverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  currentReadingContainer: {
    width: '100%',
    backgroundColor: '#151E47',
    borderRadius: 10,
    padding: 25
  },
  bookInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentBookButton: {
    width: 80,
    height: 100,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentBookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  bookInfoTextContainer: {
    marginLeft: 20,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  bookAuthor: {
    fontSize: 14,
    color: 'white',
  },
  progressContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
    padding: 5,
  },
  progressText: {
    color: 'white',
    fontSize: 12,
  },
  userUpdatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateContainer: {
    width: 300, 
    marginRight: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfoTextContainer: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateTextContainer: {
    marginLeft: 50,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 10,
    color: '#555555',
  },
  bookInfo: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progress: {
    fontSize: 12,
    color: '#555555',
  },
});

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

const BookCoverButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.bookCoverButton} onPress={onPress}>
      <Text style={styles.bookCoverButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const UserUpdate = ({ update }) => {
  return (
    <View style={styles.updateContainer}>
      <View style={styles.userInfoContainer}>
        <View style={styles.userContainer}>
          <Image source={update.userPhoto} style={styles.userPhoto} />
          <View style={styles.userInfoTextContainer}>
            <Text style={styles.userName}>{update.userName}</Text>
            <Text style={styles.commentText} numberOfLines={2}>{update.comment}</Text>
          </View>
        </View>
        <View style={styles.updateTextContainer}>
          <Text style={styles.timestamp}>{update.timestamp}</Text>
        </View>
      </View>
      <View style={styles.bookInfoContainer}>
        <Text style={styles.bookInfo}>{update.bookTitle} - {update.bookAuthor}</Text>
        <Text style={styles.progress}>{update.progress}% completed</Text>
      </View>
    </View>
  );
};

export default function Bookwish({ navigation }) {

  const bookCovers = [
    { id: 1, title: 'Book 1' },
    { id: 2, title: 'Book 2' },
    { id: 3, title: 'Book 3' },
    { id: 4, title: 'Book 4' },
    { id: 5, title: 'Book 5' }
  ];

  const currentReading = {
    title: 'Current Book',
    author: 'John Doe',
    progress: 57
  };

  const userUpdates = [
    {
      id: 1,
      userPhoto: require('../../assets/profilepic.png'),
      userName: 'Gabrielle Castro',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      bookTitle: 'Book 1',
      bookAuthor: 'Author 1',
      progress: 25,
      timestamp: '2023-05-20 10:30',
    },
    {
      id: 2,
      userPhoto: require('../../assets/profilepic.png'),
      userName: 'Gabrielle Castro',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      bookTitle: 'Book 2',
      bookAuthor: 'Author 2',
      progress: 50,
      timestamp: '2023-05-20 11:45',
    },
    {
      id: 3,
      userPhoto: require('../../assets/profilepic.png'),
      userName: 'Gabrielle Castro',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      bookTitle: 'Book 3',
      bookAuthor: 'Author 3',
      progress: 75,
      timestamp: '2023-05-20 12:00',
    }
  ];

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
            <BookCoverButton key={book.id} title={book.title} />
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
              <Text style={styles.currentBookButtonText}>Book</Text>
            </TouchableOpacity>

            <View style={styles.bookInfoTextContainer}>
              <Text style={styles.bookTitle}>{currentReading.title}</Text>
              <Text style={styles.bookAuthor}>{currentReading.author}</Text>
            </View>
          </View>
        </View>
      </View>

      {/*<View style={styles.view}>
        <Text style={styles.title}>Your updates</Text>
        <ScrollView horizontal>
          <View style={styles.userUpdatesContainer}>
            {userUpdates.map((update) => (
              <UserUpdate key={update.id} update={update} />
            ))}
          </View>
        </ScrollView>
            </View>*/}

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
  bookCoverButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
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
  currentBookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
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

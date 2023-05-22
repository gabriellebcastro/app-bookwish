import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';

const books = [
  {
    id: '1',
    title: 'Livro 1',
    coverImage: require('../../assets/book1.jpg'),
  },
  {
    id: '2',
    title: 'Livro 2',
    coverImage: require('../../assets/book2.jpg'),
  },
  {
    id: '3',
    title: 'Livro 3',
    coverImage: require('../../assets/book3.jpg'),
  },
  {
    id: '4',
    title: 'Livro 4',
    coverImage: require('../../assets/book4.jpg'),
  },
  {
    id: '5',
    title: 'Livro 5',
    coverImage: require('../../assets/book5.jpg'),
  },
  {
    id: '6',
    title: 'Livro 6',
    coverImage: require('../../assets/book6.jpg'),
  },
  {
    id: '7',
    title: 'Livro 7',
    coverImage: require('../../assets/book7.jpg'),
  },
  {
    id: '8',
    title: 'Livro 8',
    coverImage: require('../../assets/book8.jpg'),
  },
];

const generateRandomRating = () => {
  return Math.floor(Math.random() * 5) + 1; // Gera um número aleatório entre 1 e 5
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
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button}>
      <Image source={item.coverImage} style={styles.bookCover} />
      <Text style={styles.buttonText}>{item.title}</Text>
      {renderStars(generateRandomRating())}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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

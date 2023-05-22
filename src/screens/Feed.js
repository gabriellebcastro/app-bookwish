import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';

export default function Feed({ navigation }) {
  const [feedData, setFeedData] = useState([
    {
      id: '1',
      bookTitle: 'Livro 1',
      author: 'Autor 1',
      coverImage: require('../../assets/book1.jpg'),
      update: 'Leitura em andamento',
      userPhoto: require('../../assets/profilepic.png'),
      userName: 'Usuário 1',
      userUsername: '@usuario1',
      progress: '50%',
    },
    {
      id: '2',
      bookTitle: 'Livro 2',
      author: 'Autor 2',
      coverImage: require('../../assets/book2.jpg'),
      update: 'Leitura concluída',
      userPhoto: require('../../assets/profilepic.png'),
      userName: 'Usuário 1',
      userUsername: '@usuario1',
      progress: '100%',
    },
    // Adicione mais dados do feed aqui
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.feedItem}>
      <View style={styles.postHeader}>
        <Image source={item.userPhoto} style={styles.userPhoto} />
        <View>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.userUsername}>{item.userUsername}</Text>
        </View>
      </View>
      <Image source={item.coverImage} style={styles.bookCover} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookInfoText}>
          <Text style={styles.bookTitle}>{item.bookTitle}</Text> de <Text style={styles.author}>{item.author}</Text>
        </Text>
        <Text style={styles.update}>{item.update}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: item.progress }]} />
        </View>
        <Text style={styles.progress}>{item.progress}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={feedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feedList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  feedList: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  feedItem: {
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userUsername: {
    fontSize: 14,
    color: '#888',
  },
  bookCover: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  bookInfo: {
    paddingHorizontal: 16,
  },
  bookInfoText: {
    marginBottom: 4,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#888',
  },
  update: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#EEE',
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#151E47',
  },
  progress: {
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  },
});

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { auth } from '../../src/firebase/config.js';
import { getFirestore, doc, setDoc, updateDoc, getDocs, collection, addDoc, query, orderBy, limit} from 'firebase/firestore';

export default function ReadingHistory({ navigation, route }) {
  const { book } = route.params;
  console.log(book);
  const [comment, setComment] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const handleSaveReading = async () => {
    if (currentPage < 0 || currentPage > book.pageCount) {
      Alert.alert('Número de páginas inválido', 'Digite um número válido de páginas lidas.');
      return;
    }

    try {
      const user = auth.currentUser;
      const { uid } = user;
      const db = getFirestore();
      const historyCollectionRef = collection(db, 'usuarios', uid, 'library', book.id, 'history');

      const historyData = {
        startDate: new Date().toISOString(),
        endDate: null,
        comments: [comment],
        currentPage: currentPage,
      };

      const newHistoryDocRef = await addDoc(historyCollectionRef, historyData);
      const historyId = newHistoryDocRef.id;

      await updateDoc(newHistoryDocRef, { id: historyId });

      console.log('History document created:', historyId);
      navigation.navigate('BookLibrary', { book });
    } catch (error) {
      console.log('Error creating reading history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.bookInfoContainer}>
          <Image source={{ uri: book.coverImage }} style={styles.bookCover} />
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>{book.author}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Adicione um comentário:</Text>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Digite o seu comentário..."
            value={comment}
            onChangeText={setComment}
          />

          <Text style={styles.label}>Páginas lidas:</Text>
          <View style={styles.currentPageContainer}>
            <TextInput
              style={styles.currentPageInput}
              keyboardType="numeric"
              placeholder="0"
              value={currentPage.toString()}
              onChangeText={setCurrentPage}
            />
            <Text style={styles.currentPageTotalText}>de {book.pageCount} páginas lidas.</Text>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveReading}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bookInfoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  bookCover: {
    width: 200,
    height: 300,
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  currentPageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  currentPageInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  currentPageTotalText: {
    fontSize: 16,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  saveButton: {
    backgroundColor: '#151E47',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

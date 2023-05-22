import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

export default function Library({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={['Livro 1', 'Livro 2', 'Livro 3', 'Livro 4', 'Livro 5', 'Livro 6', 'Livro 7', 'Livro 8']}
        renderItem={renderItem}
        keyExtractor={(item) => item}
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
    paddingHorizontal: 8,
  },
  button: {
    width: 145,
    height: 200,
    backgroundColor: '#ECECEC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 10,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

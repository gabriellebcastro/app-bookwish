import axios from 'axios';

// Função para buscar livros por termo de pesquisa
export const searchBooks = async (searchTerm) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyCfLKUxhd-LEMeFb5jmd55i33Qu3SrRmRk`
    );
    return response.data.items;
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return [];
  }
};

// Função para buscar detalhes de um livro pelo ID
export const getBookDetails = async (bookId) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyCfLKUxhd-LEMeFb5jmd55i33Qu3SrRmRk`
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do livro:', error);
    return null;
  }
};

import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [article, setArticle] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setArticle(result.articles); // Guardamos solo los artículos
      } catch (error) {
        console.error('Error al obtener noticias:', error);
      }
    };  
    fetchData();
  }, [url]);
  return { article };
}

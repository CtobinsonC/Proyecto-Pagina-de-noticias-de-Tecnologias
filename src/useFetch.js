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

// Hook personalizado para fetch de podcasts desde la API de iTunes
// url de ejemplo: https://itunes.apple.com/search?media=podcast&term=tecnologia
export function usePodcastFetch(term = 'tecnologia') {
  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        // Construimos la URL de búsqueda para iTunes
        const url = `https://itunes.apple.com/search?media=podcast&term=${encodeURIComponent(term)}`;
        const response = await fetch(url);
        const result = await response.json();
        // Guardamos solo los resultados de podcasts
        setPodcasts(result.results || []);
      } catch (error) {
        console.error('Error al obtener podcasts:', error);
      }
    };
    fetchPodcasts();
  }, [term]);
  return { podcasts };
}

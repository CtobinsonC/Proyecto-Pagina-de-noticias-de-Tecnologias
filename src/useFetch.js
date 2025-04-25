import { useState, useEffect } from 'react';

// Hook personalizado para fetch de noticias desde un feed RSS usando un proxy para evitar CORS
export default function useFetch(rssUrl) {
  // Estado para guardar los artículos obtenidos
  const [data, setData] = useState([]);
  // Estado para indicar si está cargando
  const [loading, setLoading] = useState(true);
  // Estado para guardar mensajes de error
  const [error, setError] = useState(null);

  useEffect(() => {
    // Construimos la URL del proxy rss2json (convierte RSS a JSON y evita CORS)
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    // Función asíncrona para obtener y procesar los datos
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Hacemos fetch al proxy, no al RSS directo
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('No se pudo obtener el feed RSS');
        const result = await response.json();
        // El proxy entrega los artículos en result.items
        setData(result.items || []);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [rssUrl]);

  // Retornamos los datos, el estado de carga y el error
  return { data, loading, error };
}

// Hook personalizado para fetch de podcasts desde la API de iTunes
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

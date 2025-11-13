import { useState, useEffect } from 'react';

// Array de imágenes por defecto disponibles
const DEFAULT_IMAGES = [
  '/img/pexels-mikhail-nilov-9242891.jpg',
  '/img/pexels-pachon-in-motion-426015731-30547596.jpg',
  '/img/pexels-pavel-danilyuk-8438874.jpg',
  '/img/pexels-sanketgraphy-16380905.jpg',
  '/img/pexels-sanketgraphy-16629368.jpg',
  '/img/pexels-slaytinaaaa-4619829.jpg',
  '/img/pexels-yaroslav-shuraev-7688551.jpg'
];

let defaultImageCounter = 0;

// Función para obtener una imagen por defecto (ciclando por índice)
function getNextDefaultImage() {
  const image = DEFAULT_IMAGES[defaultImageCounter % DEFAULT_IMAGES.length];
  defaultImageCounter++;
  return image;
}

// Hook personalizado para fetch de noticias desde un feed RSS usando un proxy para evitar CORS
export default function useFetch(rssUrl) {
  // Estado para guardar los artículos obtenidos
  const [data, setData] = useState([]);
  // Estado para indicar si está cargando
  const [loading, setLoading] = useState(true);
  // Estado para guardar mensajes de error
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función asíncrona para obtener y procesar los datos
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Usamos el proxy rss2json que convierte RSS a JSON
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('No se pudo obtener el feed RSS');
        
        const result = await response.json();
        
        // Procesamos los items para extraer mejor las imágenes y descripción
        const items = (result.items || []).map(item => {
          let image = null;
          let description = item.description || item.content || '';
          
          // Función auxiliar para limpiar descripción
          function cleanDesc(text) {
            if (!text) return '';
            // Remover tags HTML
            let cleaned = text.replace(/<[^>]*>/g, '');
            // Decodificar entidades HTML
            cleaned = cleaned.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            cleaned = cleaned.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#[0-9]+;/g, '');
            // Limitar a 150 caracteres
            cleaned = cleaned.substring(0, 150).trim();
            return cleaned.length > 0 ? cleaned + '...' : '';
          }
          
          // Si la descripción es muy corta o solo contiene "Comments", intentar extraer del contenido
          if (!description || description.toLowerCase().includes('comments') && description.length < 50) {
            description = item.content || '';
          }
          
          // 1. Buscar en campos de imagen directos del objeto
          if (item.image && item.image.trim()) {
            image = item.image;
          } 
          
          // 2. Buscar en media_content (arrays)
          else if (item.media_content && Array.isArray(item.media_content) && item.media_content.length > 0) {
            const mediaItem = item.media_content[0];
            if (mediaItem && mediaItem.url) {
              image = mediaItem.url;
            }
          }
          
          // 3. Buscar en media_thumbnail
          else if (item.media_thumbnail && Array.isArray(item.media_thumbnail) && item.media_thumbnail.length > 0) {
            if (item.media_thumbnail[0].url) {
              image = item.media_thumbnail[0].url;
            } else if (typeof item.media_thumbnail[0] === 'string') {
              image = item.media_thumbnail[0];
            }
          }
          
          // 4. Buscar en enclosure (si es imagen)
          else if (item.enclosure && item.enclosure.type && item.enclosure.type.includes('image')) {
            image = item.enclosure.link || item.enclosure.url;
          }
          
          // 5. Buscar en description con regex
          else if (description) {
            // Buscar img src
            const imgMatch = description.match(/<img[^>]+src=["']([^"'>]+)["']/i);
            if (imgMatch && imgMatch[1]) {
              image = imgMatch[1];
            }
            // Buscar URLs de imágenes directas
            else {
              const urlMatch = description.match(/https?:\/\/[^\s<>"]+\.(?:jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)/i);
              if (urlMatch) {
                image = urlMatch[0];
              }
            }
          }
          
          // Si no encontró imagen válida, asignar una del pool de imágenes por defecto
          if (!image || !image.trim()) {
            image = getNextDefaultImage();
          }
          
          // Limpiar descripción
          const cleanedDescription = cleanDesc(description);
          
          return {
            ...item,
            image: image,
            urlToImage: image,
            description: cleanedDescription
          };
        });
        
        setData(items);
      } catch (err) {
        console.error('Error fetching RSS:', err);
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

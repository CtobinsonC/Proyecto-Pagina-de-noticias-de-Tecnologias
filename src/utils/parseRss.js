// Utilidad para obtener y parsear el RSS de un podcast y extraer episodios (título, fecha, url mp3)
// Utiliza fetch y DOMParser (funciona en navegadores modernos)

// Función principal para obtener episodios de un feed RSS de podcast o noticias
export async function fetchPodcastEpisodes(feedUrl) {
  try {
    // Hacemos fetch al feed RSS usando el proxy allorigins para evitar problemas de CORS
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`);
    // Parseamos la respuesta JSON para obtener el XML original
    const data = await response.json();
    // Extraemos el contenido XML del campo 'contents' del JSON
    const xml = data.contents;
    // Creamos una instancia de DOMParser para convertir el XML en un documento navegable
    const parser = new window.DOMParser();
    // Parseamos el string XML a un documento XML
    const doc = parser.parseFromString(xml, 'text/xml');
    // Seleccionamos todos los elementos <item> (cada uno representa un episodio o noticia)
    const items = Array.from(doc.querySelectorAll('item')).map(item => {
      // Buscamos el elemento <enclosure> que suele contener el archivo de audio o imagen
      const enclosure = item.querySelector('enclosure');
      // Buscamos un posible campo <media:content> que puede contener la imagen
      const mediaContent = item.querySelector('media\\:content');
      // Buscamos un posible campo <media:thumbnail> que puede contener la imagen
      const mediaThumbnail = item.querySelector('media\\:thumbnail');

      // Extraemos la imagen desde diferentes fuentes posibles
      let image = null;
      // 1. Si enclosure es de tipo imagen
      if (enclosure && enclosure.getAttribute('type') && enclosure.getAttribute('type').startsWith('image/')) {
        image = enclosure.getAttribute('url');
      }
      // 2. Si media:content tiene url
      else if (mediaContent && mediaContent.getAttribute('url')) {
        image = mediaContent.getAttribute('url');
      }
      // 3. Si media:thumbnail tiene url
      else if (mediaThumbnail && mediaThumbnail.getAttribute('url')) {
        image = mediaThumbnail.getAttribute('url');
      }
      // 4. Si la descripción contiene una imagen embebida en HTML
      else {
        const desc = item.querySelector('description')?.textContent || '';
        // Usamos una expresión regular para buscar la primera imagen en el HTML
        const imgMatch = desc.match(/<img[^>]+src=["']([^"'>]+)["']/i);
        if (imgMatch && imgMatch[1]) {
          image = imgMatch[1];
        }
      }

      return {
        // Extraemos el título del episodio o noticia
        title: item.querySelector('title')?.textContent || '',
        // Extraemos la fecha de publicación
        pubDate: item.querySelector('pubDate')?.textContent || '',
        // Extraemos la URL del archivo de audio (si existe, para podcasts)
        audioUrl: enclosure && enclosure.getAttribute('type') && enclosure.getAttribute('type').startsWith('audio/') ? enclosure.getAttribute('url') : null,
        // Extraemos la descripción
        description: item.querySelector('description')?.textContent || '',
        // Extraemos la duración si está disponible (usando el namespace itunes)
        duration: item.querySelector('itunes\\:duration')?.textContent || '',
        // Imagen obtenida de cualquiera de las fuentes anteriores
        image: image
      };
    });
    // Si es para podcasts, filtramos solo los que tengan archivo de audio
    // Si es para noticias, puedes devolver todos
    return items;
  } catch (error) {
    // Si ocurre cualquier error, lo mostramos en consola y devolvemos un array vacío
    console.error('Error al obtener o parsear el RSS:', error);
    return [];
  }
}

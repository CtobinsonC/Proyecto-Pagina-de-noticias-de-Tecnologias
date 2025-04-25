// Utilidad para obtener y parsear el RSS de un podcast y extraer episodios (título, fecha, url mp3)
// Utiliza fetch y DOMParser (funciona en navegadores modernos)

export async function fetchPodcastEpisodes(feedUrl) {
  try {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`);
    const data = await response.json();
    const xml = data.contents;
    const parser = new window.DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    const items = Array.from(doc.querySelectorAll('item')).map(item => {
      const enclosure = item.querySelector('enclosure');
      return {
        title: item.querySelector('title')?.textContent || '',
        pubDate: item.querySelector('pubDate')?.textContent || '',
        audioUrl: enclosure ? enclosure.getAttribute('url') : null,
        description: item.querySelector('description')?.textContent || '',
        duration: item.querySelector('itunes\\:duration')?.textContent || '',
      };
    });
    // Solo episodios con audio
    return items.filter(ep => ep.audioUrl);
  } catch (error) {
    console.error('Error al obtener o parsear el RSS:', error);
    return [];
  }
}

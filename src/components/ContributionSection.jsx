import '../style/contribution.css';
import { useState, useEffect, useRef } from 'react';
import { usePodcastFetch } from '../useFetch'; // Importamos el hook para podcasts
import { fetchPodcastEpisodes } from '../utils/parseRss'; // Importamos utilidad de parseo RSS

export default function ContributionSection() {
  // Usamos el hook para traer podcasts de tecnología
  const { podcasts } = usePodcastFetch('tecnologia');
  // Estado para controlar qué podcast está reproduciéndose
  const [playingId, setPlayingId] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  // Estado para paginación
  const [page, setPage] = useState(1);
  const perPage = 4;
  // Calcular el número total de páginas
  const totalPages = Math.ceil(podcasts.length / perPage);
  // Podcasts a mostrar en la página actual
  const podcastsToShow = podcasts.slice((page - 1) * perPage, page * perPage);

  // Estado para episodios del podcast seleccionado
  const [episodes, setEpisodes] = useState([]);
  const [showEpisodesFor, setShowEpisodesFor] = useState(null);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  // Referencia para el contenedor de episodios
  const episodesRef = useRef(null);

  // Efecto para pausar audio al hacer click fuera del área de episodios
  useEffect(() => {
    if (!playingId) return;
    function handleClickOutside(e) {
      if (episodesRef.current && !episodesRef.current.contains(e.target)) {
        setPlayingId(null);
        setAudioUrl(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [playingId]);

  // Maneja la petición y despliegue de episodios de un podcast
  const handleShowEpisodes = async (podcast) => {
    setShowEpisodesFor(podcast.trackId);
    setLoadingEpisodes(true);
    setEpisodes([]);
    const eps = await fetchPodcastEpisodes(podcast.feedUrl);
    setEpisodes(eps);
    setLoadingEpisodes(false);
  };

  const handlePlay = (audio) => {
    setAudioUrl(audio);
    setPlayingId(audio);
  };

  // Renderiza los botones de paginación con estilo acorde a la página (btn btn-tech)
  const renderPagination = () => (
    <nav aria-label="Paginación de podcasts" className="mt-4 d-flex justify-content-center">
      <ul className="pagination" style={{gap: 8, background: 'none', border: 'none'}}>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i+1} className="page-item" style={{background: 'none', border: 'none'}}>
            <button
              className={`btn btn-tech${page === i+1 ? ' active' : ''}`}
              style={{
                fontWeight: page === i+1 ? 'bold' : 'normal',
                background: page === i+1 ? '#3ec9bd' : 'transparent',
                color: page === i+1 ? '#fff' : '#3ec9bd',
                border: page === i+1 ? 'none' : '2px solid #3ec9bd',
                borderRadius: 8,
                minWidth: 40,
                transition: 'all 0.2s',
                boxShadow: page === i+1 ? '0 2px 8px rgba(62,201,189,0.2)' : 'none',
                outline: 'none',
              }}
              onClick={() => setPage(i+1)}
            >
              {i+1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <section className="dark">
      <div className="container py-4">
        <h1 className="h1 text-center" id="pageHeaderTitle">Descubre lo nuevo viendo nuestros podcasts</h1>
        {/* Renderizamos los podcasts obtenidos de la API de iTunes */}
        {podcasts.length === 0 ? (
          <p className="text-center">Cargando podcasts...</p>
        ) : (
          podcastsToShow.map((podcast, idx) => (
            <article className={`postcard dark ${['blue', 'red', 'green', 'yellow'][idx%4]}`} key={podcast.trackId}>
              {/* Oculta la imagen solo si se muestran episodios Y sí hay episodios encontrados */}
              {!(showEpisodesFor === podcast.trackId && !loadingEpisodes && episodes.length > 0) && (
                <a className="postcard__img_link" href={podcast.collectionViewUrl} target="_blank" rel="noopener noreferrer">
                  <img className="postcard__img" src={podcast.artworkUrl600 || podcast.artworkUrl100 || 'https://picsum.photos/500/500'} alt={podcast.collectionName} />
                </a>
              )}
              <div className="postcard__text">
                <h1 className={`postcard__title ${['blue', 'red', 'green', 'yellow'][idx%4]}`}> <a href={podcast.collectionViewUrl} target="_blank" rel="noopener noreferrer">{podcast.collectionName}</a></h1>
                <div className="postcard__subtitle small">
                  <time dateTime={podcast.releaseDate}>
                    <i className="fas fa-calendar-alt mr-2"></i>{new Date(podcast.releaseDate).toLocaleDateString()}
                  </time>
                </div>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">{podcast.artistName}</div>
                <ul className="postcard__tagbox">
                  <li className="tag__item"><i className="fas fa-tag mr-2"></i>Podcast</li>
                  {podcast.trackTimeMillis && (
                    <li className="tag__item"><i className="fas fa-clock mr-2"></i>{Math.round(podcast.trackTimeMillis/60000)} mins.</li>
                  )}
                  <li className={`tag__item play ${['blue', 'red', 'green', 'yellow'][idx%4]}`}>
                    {/* Botón para mostrar episodios del podcast */}
                    <button
                      className="btn btn-link p-0"
                      style={{ color: 'inherit', textDecoration: 'none' }}
                      onClick={() => handleShowEpisodes(podcast)}
                    >
                      <i className="fas fa-list mr-2"></i>Ver episodios
                    </button>
                  </li>
                </ul>
                {/* Si este podcast está expandido, mostramos los episodios */}
                {showEpisodesFor === podcast.trackId && (
                  <div ref={episodesRef} className="mt-3" style={{background: 'rgba(24,21,31,0.96)', borderRadius: 16, padding: 16}}>
                    {/* Botón para cerrar episodios */}
                    <div className="mb-3 d-flex justify-content-end">
                      <button className="btn btn-danger" style={{background:'#b23b3b', border:'none'}} onClick={() => { setShowEpisodesFor(null); setEpisodes([]); setPlayingId(null); }}>
                        <i className="fas fa-times mr-1"></i> Cerrar episodios
                      </button>
                    </div>
                    {loadingEpisodes ? (
                      <p>Cargando episodios...</p>
                    ) : episodes.length === 0 ? (
                      <p>No se encontraron episodios con audio.</p>
                    ) : (
                      <ul className="list-group" style={{background: 'transparent'}}>
                        {episodes.slice(0, 5).map((ep) => (
                          <li className="list-group-item d-flex justify-content-between align-items-center" key={ep.audioUrl} style={{background:'transparent', color:'#fff', border:'1px solid #222', borderRadius: 8, marginBottom: 8}}>
                            <div>
                              <strong>{ep.title}</strong>
                              <br />
                              <small>{ep.pubDate ? new Date(ep.pubDate).toLocaleDateString() : ''}</small>
                            </div>
                            <div className="d-flex align-items-center">
                              <button className="btn btn-tech mr-2" onClick={() => handlePlay(ep.audioUrl)}>
                                <i className="fas fa-play mr-1"></i>Escuchar
                              </button>
                            </div>
                            {playingId === ep.audioUrl && (
                              <>
                                <audio src={audioUrl} autoPlay controls style={{ verticalAlign: 'middle', marginLeft: 10 }} onEnded={() => setPlayingId(null)} />
                                <span className="audio-anim" style={{ marginLeft: 8 }}>
                                  <span className="bar" style={{ animation: 'bounce 1s infinite', display: 'inline-block', width: 4, height: 16, background: '#3ec9bd', marginRight: 2 }}></span>
                                  <span className="bar" style={{ animation: 'bounce 1s infinite 0.2s', display: 'inline-block', width: 4, height: 10, background: '#3ec9bd', marginRight: 2 }}></span>
                                  <span className="bar" style={{ animation: 'bounce 1s infinite 0.4s', display: 'inline-block', width: 4, height: 7, background: '#3ec9bd' }}></span>
                                </span>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))
        )}
        {/* Paginación por números debajo de los podcasts */}
        {podcasts.length > perPage && renderPagination()}
        {/* Animación simple para audio (puedes mejorarla en CSS) */}
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(1.6); }
          }
        `}</style>
      </div>
    </section>
  );
}

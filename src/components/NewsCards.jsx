import { useState } from 'react';
import '../style/contribution.css';

// REVERSIÓN: Ahora el componente solo muestra noticias locales agregadas manualmente y las del API
export default function NewsCards({ article = [] }) {
  // Estado solo para noticias agregadas manualmente
  const [cards, setCards] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    desc: '',
    img: '',
    color: 'blue'
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCards([{ ...form }, ...cards]);
    setForm({ title: '', desc: '', img: '', color: 'blue' });
    setShowForm(false);
  }

  function handleToggleForm() {
    setShowForm(v => !v);
  }

  // REVERSIÓN: Solo unimos cards locales (manuales) y las del API,
  const allNews = [...cards, ...article];
  const topNews = allNews.slice(0, 4);
  const bottomNews = allNews.slice(4, 8);
  const extraNews = allNews.slice(8);

  return (
    <section className="tech mt-4 mb-4">
      <div className="container">
        <div className="row">
          <div className="col text-center text-uppercase">
            <h2>Conoce las nuevas tendencias</h2>
          </div>
        </div>
        {/* Primeras 4 noticias (manuales y API) */}
        <div className="row mt-4">
          {topNews.map((card, idx) => (
            <div className="col-md-6 mt-2 col-lg-3 d-flex align-items-stretch" key={idx}>
              <div className={`card h-100 postcard dark ${card.color || ''} w-100 d-flex flex-column`} style={{borderRadius: '10px', boxShadow: '0 4px 21px -12px rgba(0,0,0,0.66)', border: 'none', position: 'relative', overflow: 'hidden', minHeight: '380px'}}>
                <img src={card.urlToImage || card.img || '/img/news4.jpg'} className="card-img-top postcard__img" alt="..." style={{height: '180px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', position: 'relative', width: '100%'}} />
                <div className="card-body d-flex flex-column flex-grow-1 justify-content-between" style={{minHeight: '160px'}}>
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text flex-grow-1">{card.description || card.desc}</p>
                  <a href={card.url || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-tech mt-auto align-self-start">Más información</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Siguientes 4 noticias (manuales y API) */}
        <div className="row mt-4">
          {bottomNews.map((card, idx) => (
            <div className="col-md-6 mt-2 col-lg-3 d-flex align-items-stretch" key={idx+4}>
              <div className={`card h-100 postcard dark ${card.color || ''} w-100 d-flex flex-column`} style={{borderRadius: '10px', boxShadow: '0 4px 21px -12px rgba(0,0,0,0.66)', border: 'none', position: 'relative', overflow: 'hidden', minHeight: '380px'}}>
                <img src={card.urlToImage || card.img || '/img/news4.jpg'} className="card-img-top postcard__img" alt="..." style={{height: '180px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', position: 'relative', width: '100%'}} />
                <div className="card-body d-flex flex-column flex-grow-1 justify-content-between" style={{minHeight: '160px'}}>
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text flex-grow-1">{card.description || card.desc}</p>
                  <a href={card.url || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-tech mt-auto align-self-start">Más información</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Botón para mostrar más noticias si hay más de 8 */}
        {extraNews.length > 0 && !showAll && (
          <div className="row mt-4">
            <div className="col-12 text-center">
              <button type="button" className="btn btn-tech" onClick={() => setShowAll(true)}>
                Ver más noticias
              </button>
            </div>
          </div>
        )}
        {/* Mostrar el resto de noticias si showAll es true */}
        {showAll && extraNews.length > 0 && (
          <>
            <div className="row mt-4">
              {extraNews.map((card, idx) => (
                <div className="col-md-6 mt-2 col-lg-3 d-flex align-items-stretch" key={idx+8}>
                  <div className={`card h-100 postcard dark ${card.color || ''} w-100 d-flex flex-column`} style={{borderRadius: '10px', boxShadow: '0 4px 21px -12px rgba(0,0,0,0.66)', border: 'none', position: 'relative', overflow: 'hidden', minHeight: '380px'}}>
                    <img src={card.urlToImage || card.img || '/img/news4.jpg'} className="card-img-top postcard__img" alt="..." style={{height: '180px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', position: 'relative', width: '100%'}} />
                    <div className="card-body d-flex flex-column flex-grow-1 justify-content-between" style={{minHeight: '160px'}}>
                      <h5 className="card-title">{card.title}</h5>
                      <p className="card-text flex-grow-1">{card.description || card.desc}</p>
                      <a href={card.url || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-tech mt-auto align-self-start">Más información</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Botón para ver menos noticias */}
            <div className="row mt-4">
              <div className="col-12 text-center">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAll(false)}>
                  Ver menos
                </button>
              </div>
            </div>
          </>
        )}
        {/* El formulario para agregar noticias locales permanece igual */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <button type="button" className="btn bg-transparent border-0 p-2" style={{color: '#3ec9bd', fontWeight: 'bold', fontSize: '1.1rem', outline: 'none', boxShadow: 'none'}} onClick={handleToggleForm}>
              {showForm ? 'Cerrar formulario' : 'Agregar noticia +'}
            </button>
          </div>
        </div>
        {showForm && (
          <div className="row mb-4 justify-content-center">
            <div className="col-12 col-md-10">
              <form className="row g-2 align-items-end justify-content-center" onSubmit={handleSubmit}>
                <div className="col-md-3">
                  <input type="text" className="form-control" name="title" value={form.title} onChange={handleChange} placeholder="Título de la noticia" required />
                </div>
                <div className="col-md-4">
                  <input type="text" className="form-control" name="desc" value={form.desc} onChange={handleChange} placeholder="Descripción" required />
                </div>
                <div className="col-md-3">
                  <input type="text" className="form-control" name="img" value={form.img} onChange={handleChange} placeholder="URL de la imagen" />
                </div>
                <div className="col-md-1">
                  <select className="form-select" name="color" value={form.color} onChange={handleChange}>
                    <option value="blue">Azul</option>
                    <option value="red">Rojo</option>
                    <option value="green">Verde</option>
                    <option value="yellow">Amarillo</option>
                  </select>
                </div>
                <div className="col-md-1">
                  <button type="submit" className="btn btn-tech w-100">Agregar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

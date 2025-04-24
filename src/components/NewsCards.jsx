import '../index.css';

export default function NewsCards() {
  return (
    <section className="tech mt-4 mb-4">
      <div className="container">
        <div className="row">
          <div className="col text-center text-uppercase">
            <h2>Conoce las nuevas tendencias</h2>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6 mt-2 col-lg-3">
            <div className="card">
              <img src="/img/news4.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Nueva vulnerabilidad en servidores Java</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-tech">Mas informacion</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-2 col-lg-3">
            <div className="card">
              <img src="/img/news1.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Nuevas ideas para emprender tu startup</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-tech">Mas informacion</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-2 col-lg-3">
            <div className="card">
              <img src="/img/news2.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Nueva sepa impacta el mercado tecnologico</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-tech">Mas informacion</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-2 col-lg-3">
            <div className="card">
              <img src="/img/news3.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Nuevas tendencias de desarrollo web</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-tech">Mas informacion</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

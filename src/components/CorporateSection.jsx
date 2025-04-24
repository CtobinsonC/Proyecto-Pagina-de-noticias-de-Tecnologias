import '../index.css';

export default function CorporateSection() {
  return (
    <section className="corporate">
      <div className="container info-text">
        <div className="row align-items-end">
          <div className="col-12 text-center text-md-center mt-4">
            <h1 className="text-uppercase">Novedades del mundo Tech</h1>
            <h3>Conoce mas comunidades apacionadas por la tecnologia</h3>
            <a href="#" className="btn btn-tech me-2">Conoce mas</a>
            <button type="button" className="btn btn-success">Quiero unirme</button>
          </div>
        </div>
      </div>
    </section>
  );
}

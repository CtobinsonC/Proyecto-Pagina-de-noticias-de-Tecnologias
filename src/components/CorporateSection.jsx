import '../index.css';

export default function CorporateSection() {
  // Función para hacer scroll a la sección de registro
  const scrollToRegister = (e) => {
    e.preventDefault();
    // Busca el primer formulario de registro por clase o etiqueta
    const registerSection = document.querySelector('.register-section, form[action*="register"], form');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="corporate">
      <div className="container info-text">
        <div className="row align-items-end">
          <div className="col-12 text-center text-md-center mt-4">
            <h1 className="text-uppercase">Novedades del mundo Tech</h1>
            <h3>Conoce mas comunidades apacionadas por la tecnologia</h3>
            <a href="#" className="btn btn-tech me-2">Conoce mas</a>
            <button type="button" className="btn btn-success" onClick={scrollToRegister}>Quiero unirme</button>
          </div>
        </div>
      </div>
    </section>
  );
}

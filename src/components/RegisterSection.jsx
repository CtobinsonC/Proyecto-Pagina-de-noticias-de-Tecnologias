import '../index.css';

export default function RegisterSection() {
  return (
    <section className="registre mt-4 mb-4">
      <div className="container">
        <div className="row mb-4">
          <div className="col text-center text-uppercase mb-4">
            <h2 className="text-white">Contribuye a una comunidad</h2>
          </div>
        </div>
        <div className="row formulario">
          <div className="col-ms-12 col-lg-6 card bg-dark">
            <form id="form1" method="post" action="enviar">
              <div className="row mt-4">
                <div className="col">
                  <span className="text-white">Name</span>
                  <input type="text" className="form-control" placeholder="First name" aria-label="First name" />
                </div>
                <div className="col">
                  <span className="text-white">Last name</span>
                  <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
                </div>
              </div>
              <div className="mb-3 mt-4">
                <label htmlFor="exampleFormControlInput1" className="form-label text-white">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
              </div>
              <div className="mb-4">
                <label className="text-white">Elige el tema de tu noticia</label>
                <select name="tema" className="form-control">
                  <option value="web">Web developer</option>
                  <option value="Machine">Machine Lerning</option>
                  <option value="Ai">artificial intelligence</option>
                  <option value="startup">startup</option>
                  <option value="cripto">blokchain</option>
                </select>
              </div>
              <div className="mb-3 mt-4">
                <label htmlFor="exampleFormControlTextarea1" className="form-label text-white">Genera tu aporte a la comunidad</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div className="row">
                <div className="col">
                  <button type="button" className="btn btn-success w-100 mb-4"><abbr title="Envia tu aporte">Enviar</abbr></button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-ms-12 col-lg-6 p-0">
            <img src="/img/software-developer-6521720__480.jpg" className="d-block w-100" alt="" id="imagen_registro" />
          </div>
        </div>
      </div>
    </section>
  );
}

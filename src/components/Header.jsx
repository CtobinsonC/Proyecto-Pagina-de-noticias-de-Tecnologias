import { Link, NavLink } from 'react-router-dom';
import logo from '/img/chip.png';
import '../index.css';

export default function Header() {
  return (
    <header style={{position: 'relative'}}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-relative">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand" to="/" id="logo">
            <img src={logo} alt="logo de la pagina" width="40" height="35" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/web-developer">Web Developer</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/machine-learning">Machine Learning</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/startup">Startup</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blockchain">Blockchain</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/artificial-intelligence">Artificial Intelligence</NavLink>
              </li>
            </ul>
          </div>
          {/* NUEVO: Bloque responsivo para búsqueda y login */}
          <div className="header-actions d-flex align-items-center ms-3">
            <form className="d-flex search-form mb-0">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-tech" type="submit">Search</button>
            </form>
            <Link to="/login" className="btn btn-tech ms-2 login-btn">Iniciar Sesión</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

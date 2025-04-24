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
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-tech" type="submit">Search</button>
            </form>
          </div>
        </div>
        <button type="button" className="btn btn-tech position-absolute end-0 top-50 translate-middle-y me-3">
          <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Iniciar Sesión</Link>
        </button>
      </nav>
    </header>
  );
}

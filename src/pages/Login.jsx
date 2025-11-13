   import React from "react";

export default function Login() {
  return (
    <div className="login-container d-flex">
      <aside className="sidenav">
        <div className="login-main-text text-center">
          <h2>Application <br /> Login Page</h2>
          <p>Login or register from here to access.</p>
        </div>
      </aside>
      <main className="main flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            <form autoComplete="off">
              <div className="form-group mb-3">
                <label htmlFor="username">User Name</label>
                <input id="username" name="username" type="text" className="form-control" placeholder="User Name" />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className="form-control" placeholder="Password" />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-dark">Login</button>
                <button type="button" className="btn btn-secondary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
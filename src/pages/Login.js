import "./styles/login.css"

export default function Login() {
  return (
    <>

      <div className="login_container">
            <img
              className="img_container"
              src="/images/cute_cat.jpg"
              alt="Meow"
            />

          <div className="info_wrapper">
        <div className="login_wrapper">
            <h2 className="sign_header">
                Sign in to your account
            </h2>
            <p className="sign_footer">
              Or{' '}
              <a href="#" className="a_link">
                Enter as a Guest
              </a>
            </p>
          </div>
          <form className=".form_container" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="form_wrapper">
              <div>
                <label htmlFor="email-address" className="form_pass">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form_input"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="form_pass">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="form_input"
                  placeholder="Password"
                />
              </div>
            </div>

                <div className="form_btm">
              <div className="form_btm_wrapper">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="form_item"
                />
                <label htmlFor="remember-me" className="form_label">
                  Remember me
                </label>
              </div>

              <div style={{fontSize: "0.875rem", lineHeight: "1.25rem"}}>
                <a href="#" className="a_link">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="form_submit"
              >
                <span className="fr">

                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
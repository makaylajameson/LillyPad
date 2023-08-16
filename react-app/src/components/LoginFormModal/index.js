import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [frontendErrors, setFrontendErrors] = useState({});
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  useEffect(() => {
    const frontendErrors = {}

    const email_validation = email.split("").find((el) => el === "@")

    if (!email_validation) {
      frontendErrors.email = "Email required to log in."
    }
    if (!password) {
      frontendErrors.password = "Password is required to log in."
    }

    setFrontendErrors(frontendErrors)
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      await history.push('/boards/current')
      closeModal()
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"))
    if (data) {
      setErrors(data);
    } else {
      await history.push('/boards/current')
      closeModal()
    }

  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <h1 className='log-in' style={{ textAlign: 'center' }}>Log In</h1>
        <form className='log-in-container' onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <label className="email-label">
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-label"
              required
            />
          </label>
          <br />
          <label className="email-label">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="email-label"
              required
            />
          </label>
          <br />
          <div className='errors-and-login'>
            {frontendErrors.email && email.length > 0 && (
              <p className='on-submit-errors'>{frontendErrors.email}</p>
            )}
            {frontendErrors.password && password.length > 0 && (
              <p className='on-submit-errors'>{frontendErrors.password}</p>
            )}
            {errors.map((error, idx) => (
              <p className='on-submit-errors' key={idx}>{error}</p>
            ))}
          </div>
          <div className='login-and-demo-user'>
            <button disabled={Object.keys(frontendErrors).length > 0} className='log-in-submit' type="submit">Log In</button>
            <div>
              <button onClick={demoUser} className="demo-user-button">Demo User Account</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

}

export default LoginFormModal;

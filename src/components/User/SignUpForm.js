import React, { useState } from 'react';
import firebase from 'firebase/app';

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const fields = event.target.elements;

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          fields.email.value,
          fields.password.value,
        );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <span data-testid="signup-loader">Carregando...</span>;
  }

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input name="email" id="email" data-testid="email-input" />

        <label htmlFor="password">Senha</label>
        <input
          name="password"
          id="password"
          type="password"
          data-testid="password-input"
        />

        <button data-testid="submit-button">Entrar</button>
      </form>
    </div>
  );
};

export default SignUpForm;

import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { Container } from 'reactstrap';
import SignInForm from 'components/User/SignInForm';
import SignUpForm from 'components/User/SignUpForm';
import ForgotPassword from 'components/User/ForgotPassword';

import Background from 'components/Background/Background';
import background from 'assets/img/splashscreen.png';

const Login = ({ shouldComplete, user }) => {
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, updateErrorMessage] = useState(null);

  useEffect(() => {
    if (shouldComplete) {
      setIsLogin(false);
    }
  }, [shouldComplete]);

  // TODO - Adicionar transição (animation) suave entre login e cadastro
  return (
    <>
      {isLogin && (
        <Container>
          <Background
            src={background}
            alt="Imagem de fundo com a visão aérea de uma cidade com prédios altos em degradê das cores violeta e laranja claro"
          />
          <Row className="vh-100 align-items-center justify-content-center">
            <Col xs="12" sm="8" md="6" lg="4">
              {showPasswordRecovery ? (
                <ForgotPassword
                  hideForgotPassword={() => setShowPasswordRecovery(false)}
                />
              ) : (
                <>
                  {/* TODO: ESTILIZAR ESTA MENSAGEM DE ERRO */}
                  {errorMessage}
                  <SignInForm
                    onSignupClick={() => setIsLogin(false)}
                    setShowForgotPasswordForm={setShowPasswordRecovery}
                    updateErrorMessage={updateErrorMessage}
                  />
                </>
              )}
            </Col>
          </Row>
        </Container>
      )}

      {!isLogin && (
        <SignUpForm onBackClick={() => setIsLogin(true)} user={user} />
      )}
    </>
  );
};

export default Login;

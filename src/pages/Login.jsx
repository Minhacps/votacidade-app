import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import Unauthenticated from '../templates/Unathenticated';
import SignInForm from 'components/User/SignInForm';
import SignUpForm from 'components/User/SignUpForm';
import ForgotPassword from 'components/User/ForgotPassword';

import { Box } from 'components/User/User.styled';
import { Tabs, TabButton } from 'components/Tabs/Tabs';

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
    <Unauthenticated>
      <Row className="pt-5 mb-5 align-items-center justify-content-center">
        <Col xs="auto">
          <Box>
            <Tabs>
              <TabButton active={isLogin} onClick={() => setIsLogin(true)}>
                {isLogin && <span>✓ </span>}
                <span>Entrar</span>
              </TabButton>
              <TabButton
                active={!isLogin}
                onClick={() => setIsLogin(false)}
                data-testid="signup-button"
              >
                {!isLogin && <span>✓ </span>}
                <span>Cadastrar</span>
              </TabButton>
            </Tabs>
            <Row>
              {isLogin ? (
                <Col xs="12">
                  {showPasswordRecovery ? (
                    <ForgotPassword
                      hideForgotPassword={() => setShowPasswordRecovery(false)}
                    />
                  ) : (
                    <>
                      {/* TODO: ESTILIZAR ESTA MENSAGEM DE ERRO */}
                      {errorMessage}
                      <SignInForm
                        setShowForgotPasswordForm={setShowPasswordRecovery}
                        updateErrorMessage={updateErrorMessage}
                      />
                    </>
                  )}
                </Col>
              ) : (
                <Col>
                  <SignUpForm
                    onBackClick={() => setIsLogin(true)}
                    user={user}
                  />
                </Col>
              )}
            </Row>
          </Box>
        </Col>
      </Row>
    </Unauthenticated>
  );
};

export default Login;

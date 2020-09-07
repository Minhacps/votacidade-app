import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

// import { Layout } from "../../src/components/PrivacyPolicy/Layout/Layout";
// import SEO from "../components/seo";
import HeaderTitle from '../components/HeaderTitle';
import LongParagraph from '../components/Text/LongParagraph';

const StyledAnchor = styled.a`
  color: #662d91;
  text-decoration: underline;

  &:hover {
    color: #4f1778;
  }
`;

const PrivacyPolicy = () => {
  return (
    <>
      {/* <SEO title="Política de Privacidade" /> */}
      <HeaderTitle title="Política de Privacidade" />

      <Container className="my-5">
        <Row>
          <Col>
            <LongParagraph>
              <strong>Data de vigência: 29 de julho de 2020</strong>
            </LongParagraph>
            <LongParagraph>
              Agradecemos sua visita ao Vota Cidade! O Vota Cidade e as pessoas
              que participam dele, respeitam sua privacidade. Quando se trata de
              informações levamos a política de uso de dados muito a sério,
              somos transparentes e você tem total direito de saber o que
              fazemos com seus dados. Por isso, te contamos aqui as informações
              pessoais que coletamos, o que fazemos com elas e suas escolhas e
              direitos.
            </LongParagraph>

            <LongParagraph>
              <strong>1. Alguns termos-chave</strong>
            </LongParagraph>
            <LongParagraph>
              Em nossa Política de Privacidade, quando nos referimos a
              "Usuários", nos referimos a todas as pessoas que utilizam o site
              Vota Cidade.
            </LongParagraph>

            <LongParagraph>
              <strong>2. Dados que coletamos</strong>
            </LongParagraph>
            <LongParagraph>
              Quando você utiliza o sistema Vota Cidade, como eleitor ou
              eleitora, coletamos informações pessoais tais como: nome, e-mail e
              cidade. Também coletamos as suas respostas sobre as questões do
              Vota Cidade. Não utilizamos as informações como o protocolo de
              internet do seu computador, endereço de IP, dados de navegação.
              Não fazermos uso de cookies e tecnologias semelhantes.
            </LongParagraph>
            <LongParagraph>
              Para os usuários que são candidatos ou candidatas coletamos os
              seguintes dados: nome, gênero, identificação étnico racial, faixa
              de idade, cidade, partido, número do candidato, o cnpj da campanha
              e uma descrição aberta. Todos os dados de candidatos e candidatas
              serão públicos.
            </LongParagraph>
            <LongParagraph>
              A informações que coletamos são expressamente fornecidas por você.
              Não coletamos outras informações.
            </LongParagraph>

            <LongParagraph>
              <strong>3. Como essas informações serão utilizadas?</strong>
            </LongParagraph>
            <LongParagraph>
              Utilizaremos os dados dos usuário cadastrado como eleitor ou
              eleitora apenas para enviar comunicações sobre atualizações do
              sistema do projeto Vota Cidade e campanhas de mobilização social
              criadas pelas organizações que desenvolveram esse projeto. Mas não
              se preocupe pois você pode se descadastrar da lista a qualquer
              momento. Uma mensagem no final de cada e-mail permite que isso
              seja feito. As suas respostas no questionário nunca serão
              disponibilizadas. Serão usadas exclusivamente para calcular o
              índice de afinidade e para gerar estatísticas anônimas.
            </LongParagraph>
            <LongParagraph>
              Os dados dos candidatos e candidatas serão utilizados para gerar o
              índice de afinidade e a possibilidade da aplicação de filtros como
              faixa de idade, gênero e identificação étnico racial.
            </LongParagraph>

            <LongParagraph>
              <strong>4. Consentimento</strong>
            </LongParagraph>
            <LongParagraph>
              Quando você nos informa os dados solicitados pelo sistema
              assumimos que vocẽ está consentindo em deixá-los sob nossa guarda.
              Mas se a qualquer momento, você não quiser que esses dados sejam
              mantidos é só enviar um e-mail para{' '}
              <StyledAnchor
                href="mailto:votacidades@gmail.com"
                title="E-mail para votacidades@gmail.com"
              >
                votacidades@gmail.com
              </StyledAnchor>{' '}
              que apagamos os dados imediatamente.
            </LongParagraph>

            <LongParagraph>
              <strong>
                5. Armazenamento dos dados e proteção das suas informações
              </strong>
            </LongParagraph>
            <LongParagraph>
              Os seus dados ficarão armazenados em servidor do Google utilizando
              a ferramenta Firebase. Embora nenhum serviço seja completamente
              seguro a{' '}
              <StyledAnchor
                href="https://firebase.google.com/support/privacy?hl=pt-br"
                title="Política de Privacidade do Firebase"
                target="_blank"
                rel="noopener noreferrer"
              >
                política de privacidade do Firebase
              </StyledAnchor>{' '}
              garante a proteção dos seus dados.
            </LongParagraph>

            <LongParagraph>
              <strong>6. Como protegemos suas informações pessoais</strong>
            </LongParagraph>
            <LongParagraph>
              Os seus dados ficam armazenados no Firebase. Utilizamos a proteção
              que a Google oferece com essa ferramenta para proteger os seus
              dados.
            </LongParagraph>

            <LongParagraph>
              <strong>7. Alterações na política de privacidade</strong>
            </LongParagraph>
            <LongParagraph>
              Caso haja alguma alteração na política de privacidade você
              receberá um e-mail avisando e solicitando sua concordância para a
              alteração.
            </LongParagraph>

            <LongParagraph>
              <strong>8. Sugestões</strong>
            </LongParagraph>
            <LongParagraph>
              Se você tiver qualquer dúvida, sugestão ou comentários sobre a
              nossa política de privacidade pode entrar em contato através do
              e-mail{' '}
              <StyledAnchor
                href="mailto:votacidades@gmail.com"
                title="E-mail para votacidades@gmail.com"
              >
                votacidades@gmail.com
              </StyledAnchor>
              .
            </LongParagraph>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PrivacyPolicy;

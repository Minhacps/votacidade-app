import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = ({ name }) => {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Atenção</ModalHeader>
        <ModalBody>
          Olá {name}. <br />
          <br />
          A atual versão do sistema está aberta, principalmente, para pré
          candidatos a vereador, vereadora. <br />
          Eleitores e eleitoras também podem responder, mas a funcionalidade da
          geração do índice de afinidade ainda não está disponível. <br />
          Pré candidatos e pré candidatas lembrem-se, que para concluir a sua
          participação no Vota Cidade, vocês precisam responder todas as
          questões. As justificativas são opcionais. <br />
          <br />
          Espero que gostem do Vota Cidade. Com certeza ele pode ser uma forma
          de você chegar no seu eleitor e na sua eleitora.
          <br />
          Seja bem vindo, seja bem vinda.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Fechar
          </Button>{' '}
          {/* <Button color="secondary" onClick={toggle}>Fechar</Button> */}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;

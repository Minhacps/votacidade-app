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
          <p>Olá, {name},</p>
          <p>
            A atual versão do sistema está aberta para os(as) candidatos(as) a
            vereador(a).
          </p>
          <p>
            <strong>Eleitor(a):</strong> pode responder agora e suas respostas
            ficarão salvas mas o match ainda não estará disponível.
          </p>
          <p>
            <strong>Candidatos(as):</strong> lembrem-se que, para efetivar a sua
            participação no Vota Cidade, você precisa responder a todas as
            questões. As justificativas são opcionais.
          </p>
          <p>
            Seja bem-vindo(a) e aproveite o Vota Cidade para se aproximar dos
            seus eleitores(as)!
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;

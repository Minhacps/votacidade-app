import React, { useState } from 'react';
import firebase from 'firebase/app';
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
  Alert,
  Spinner,
} from 'reactstrap';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import FormHeader from 'components/Form/FormHeader';
import InputPassword from './InputPassword';
import { Form, Button, FormGroupCheck } from './SignUpForm.styled';
import userRoles from 'constants/userRoles';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// eslint-disable-next-line no-useless-escape
const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

const SignUpForm = ({ onBackClick }) => {
  const { register, handleSubmit, control, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [isCandidate, toggleIsCandidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();

  const onSubmit = async (data) => {
    const {
      city,
      email,
      gender,
      name,
      password,
      socialGroup,
      cnpj,
      candidateNumber,
      politicalParty,
    } = data;
    setLoading(true);

    const role = cnpj ? userRoles.CANDIDATE : userRoles.VOTER;
    const candidateData = cnpj
      ? {
          cnpj,
          candidateNumber,
          politicalParty,
        }
      : {};

    const userData = {
      city,
      email,
      gender,
      name,
      socialGroup,
      role,
      ...candidateData,
    };

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            ...userData,
          });
      })
      .then(() => {
        history.push('/home');
      })
      .catch(handleSignupFailure);
    setLoading(false);
  };

  const handleSignupFailure = (error) => {
    console.log(error);
    switch (error.code) {
      case 'auth/email-already-in-use': {
        return setErrorMessage('Este e-mail já está em uso.');
      }

      case 'auth/invalid-email': {
        return setErrorMessage('O formato do e-mail informado é inválido.');
      }

      case 'auth/weak-password': {
        return setErrorMessage('Sua senha deve ter no mínimo 6 caracteres.');
      }

      default: {
        return setErrorMessage('Ocorreu um erro inesperado.');
      }
    }
  };

  const socialGroupOptions = [
    { value: 'L', label: 'L' },
    { value: 'G', label: 'G' },
    { value: 'B', label: 'B' },
    { value: 'T', label: 'T' },
    { value: 'Q', label: 'Q' },
    { value: 'I', label: 'I' },
    { value: 'A', label: 'A' },
    { value: 'P', label: 'P' },
    { value: '+', label: '+' },
  ];

  return (
    <>
      <FormHeader title="Cadastro" onArrowClick={onBackClick} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        {loading && <Spinner color="primary" />}
        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        <FormGroup>
          <Label htmlFor="name">Nome completo</Label>
          <Input
            name="name"
            id="name"
            placeholder="Digite seu nome completo"
            innerRef={register({ required: true })}
            invalid={errors.name}
          />
          <FormFeedback>Campo obrigatório</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="gender">Gênero</Label>
          <Input
            type="select"
            name="gender"
            id="gender"
            aria-label="Selecione seu gênero"
            innerRef={register({ required: true })}
            invalid={errors.gender}
          >
            <option value="">Selecione</option>
            <option value="Não binário">Não binário</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
            <option value="Prefiro não declarar">Prefiro não declarar</option>
          </Input>
          <FormFeedback>Campo obrigatório</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="city">Cidade</Label>
          <Input
            type="select"
            name="city"
            id="city"
            innerRef={register({ required: true })}
            invalid={errors.city}
          >
            <option value="">Selecione</option>
            <option value="Campina Grande">Campina Grande</option>
            <option value="Campinas">Campinas</option>
            <option value="João Pessoa">João Pessoa</option>
            <option value="Porto Alegre">Porto Alegre</option>
            <option value="Recife">Recife</option>
          </Input>
          <FormFeedback>Campo obrigatório</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="socialGroup">LGBTQIAP+ (Opcional)</Label>
          <Controller
            name="socialGroup"
            as={Select}
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Selecione"
            control={control}
            options={socialGroupOptions}
            defaultValue={[]}
          />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            innerRef={register({ required: true, pattern: EMAIL_REGEX })}
            invalid={errors.email}
          />
          {errors.email?.type === 'required' && (
            <FormFeedback>Campo obrigatório</FormFeedback>
          )}
          {errors.email?.type === 'pattern' && (
            <FormFeedback>E-mail inválido</FormFeedback>
          )}
        </FormGroup>

        <InputPassword
          innerRef={register({ required: true, minLength: 6 })}
          invalid={errors.password}
        />

        <FormGroupCheck check>
          <Label check>
            <Input
              type="checkbox"
              onClick={() => toggleIsCandidate(!isCandidate)}
            />{' '}
            Sou candidata(o)
          </Label>
        </FormGroupCheck>

        {isCandidate && (
          <>
            <FormGroup>
              <Label htmlFor="cnpj">CNPJ cadastrado</Label>
              <Input
                name="cnpj"
                id="cnpj"
                placeholder="Digite aqui seu CNPJ"
                innerRef={register({ required: true, pattern: CNPJ_REGEX })}
                invalid={errors.cnpj}
              />
              {errors.cnpj?.type === 'required' && (
                <FormFeedback>Campo obrigatório</FormFeedback>
              )}
              {errors.cnpj?.type === 'pattern' && (
                <FormFeedback>CNPJ inválido</FormFeedback>
              )}
            </FormGroup>
            <Row form>
              <Col xs={6}>
                <FormGroup>
                  <Label htmlFor="candidateNumber">Número</Label>
                  <Input
                    name="candidateNumber"
                    id="candidateNumber"
                    placeholder="Digite aqui seu número"
                    innerRef={register({ required: true })}
                    invalid={errors.candidateNumber}
                  />
                  <FormFeedback>Campo obrigatório</FormFeedback>
                </FormGroup>
              </Col>

              <Col xs={6}>
                <FormGroup>
                  <Label for="politicalParty">Partido</Label>
                  <Input
                    type="select"
                    name="politicalParty"
                    id="politicalParty"
                    innerRef={register({ required: true })}
                    invalid={errors.politicalParty}
                  >
                    <option value="">Selecione</option>
                    <option value="AVANTE"> AVANTE - Avante - 70 </option>
                    <option value="DC"> DC - Democracia Cristã - 27 </option>
                    <option value="DEM"> DEM - Democratas - 25 </option>
                    <option value="MDB">
                      {' '}
                      MDB - Movimento Democrático Brasileiro - 15{' '}
                    </option>
                    <option value="PCB">
                      {' '}
                      PCB - Partido Comunista Brasileiro - 21{' '}
                    </option>
                    <option value="PCdoB">
                      {' '}
                      PCdoB - Partido Comunista do Brasil - 65{' '}
                    </option>
                    <option value="PCO">
                      {' '}
                      PCO - Partido da Causa Operária - 29{' '}
                    </option>
                    <option value="PMN">
                      {' '}
                      PMN - Partido da Mobilização Nacional - 33{' '}
                    </option>
                    <option value="PMB">
                      {' '}
                      PMB - Partido da Mulher Brasileira[59] - 35{' '}
                    </option>
                    <option value="PR">PR - Partido da República - 22 </option>
                    <option value="PSDB">
                      PSDB - Partido da Social Democracia Brasileira - 45{' '}
                    </option>
                    <option value="PDT">
                      PDT - Partido Democrático Trabalhista - 12{' '}
                    </option>
                    <option value="PT">
                      PT - Partido dos Trabalhadores - 13{' '}
                    </option>
                    <option value="PHS">
                      PHS - Partido Humanista da Solidariedade - 31{' '}
                    </option>
                    <option value="NOVO">NOVO - Partido Novo[65] - 30 </option>
                    <option value="PPL">
                      PPL - Partido Pátria Livre - 54{' '}
                    </option>
                    <option value="PPS">
                      PPS - Partido Popular Socialista - 23{' '}
                    </option>
                    <option value="PP">PP - Partido Progressista - 11 </option>
                    <option value="PRTB">
                      PRTB - Partido Renovador Trabalhista Brasileiro - 28{' '}
                    </option>
                    <option value="PRB">
                      PRB - Partido Republicano Brasileiro - 10{' '}
                    </option>
                    <option value="PROS">
                      PROS - Partido Republicano da Ordem Social - 90{' '}
                    </option>
                    <option value="PRP">
                      PRP - Partido Republicano Progressista - 44{' '}
                    </option>
                    <option value="PSC">
                      PSC - Partido Social Cristão - 20{' '}
                    </option>
                    <option value="PSD">
                      PSD - Partido Social Democrático - 55{' '}
                    </option>
                    <option value="PSL">
                      PSL - Partido Social Liberal - 17{' '}
                    </option>
                    <option value="PSOL">
                      PSOL - Partido Socialismo e Liberdade - 50{' '}
                    </option>
                    <option value="PSB">
                      PSB - Partido Socialista Brasileiro - 40{' '}
                    </option>
                    <option value="PSTU">
                      PSTU - Partido Socialista dos Trabalhadores Unificado - 16{' '}
                    </option>
                    <option value="PTB">
                      PTB - Partido Trabalhista Brasileiro - 14{' '}
                    </option>
                    <option value="PTC">
                      PTC - Partido Trabalhista Cristão - 36{' '}
                    </option>
                    <option value="PV">PV - Partido Verde - 43 </option>
                    <option value="PATRI">PATRI - Patriota - 51 </option>
                    <option value="PODE">PODE - Podemos - 19 </option>
                    <option value="REDE">
                      REDE - Rede Sustentabilidade - 18{' '}
                    </option>
                    <option value="SD">SD - Solidariedade - 77 </option>
                  </Input>
                  <FormFeedback>Campo obrigatório</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
          </>
        )}

        <Button data-testid="submit-button">Entrar</Button>
      </Form>
    </>
  );
};

export default SignUpForm;

import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import {
  Alert,
  Spinner,
  Row,
  Col,
  Label,
  Button,
  Input,
  FormGroup,
  FormText,
  FormFeedback,
  CustomInput,
} from 'reactstrap';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

import InputPassword from './InputPassword';
import { ROLE_CANDIDATE, ROLE_VOTER } from 'constants/userRoles';
import { alfabeticOrder } from '../../styles/helper';
import {
  genders,
  socialGroups,
  ethnicGroup,
  ages,
  politicalParties,
} from 'data/form-data';
import { cidades } from 'data/cidades';
import { AuthenticationContext } from '../../AuthenticationProvider';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// eslint-disable-next-line no-useless-escape
const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

const SignUpForm = ({ onBackClick, user }) => {
  const { register, handleSubmit, control, errors } = useForm();
  const { setSignUpFormUserData } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);
  const [isCandidate, toggleIsCandidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    const {
      city,
      email,
      gender,
      name,
      password,
      socialGroup,
      ethnicGroup,
      age,
      cnpj,
      candidateNumber,
      politicalParty,
      description,
    } = data;
    setLoading(true);

    const role = isCandidate ? ROLE_CANDIDATE : ROLE_VOTER;
    const candidateData = isCandidate
      ? {
          gender,
          socialGroup: socialGroup || '',
          ethnicGroup,
          age,
          cnpj: cnpj || '',
          candidateNumber,
          politicalParty,
          description: description || '',
        }
      : {};

    const userData = {
      city,
      email,
      name,
      role,
      ...candidateData,
    };

    setSignUpFormUserData(userData);

    if (password) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async ({ user }) => {
          await user.updateProfile({
            displayName: name,
          });

          await firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .set({
              ...userData,
            });
        })
        .catch(handleSignupFailure);
    } else {
      await user.updateProfile({
        displayName: name,
      });

      await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          ...userData,
        })
        .catch(handleSignupFailure);
    }

    setLoading(false);
  };

  const handleSignupFailure = (error) => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
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
              defaultValue={(user && user.displayName) || ''}
            />
            <FormFeedback>Campo obrigatório</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input
              type="text"
              name="email"
              id="email"
              innerRef={register({ required: true, pattern: EMAIL_REGEX })}
              invalid={errors.email}
              defaultValue={(user && user.email) || ''}
              placeholder="Digite seu e-mail"
            />
            {errors.email?.type === 'required' && (
              <FormFeedback>Campo obrigatório</FormFeedback>
            )}
            {errors.email?.type === 'pattern' && (
              <FormFeedback>E-mail inválido</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {!user && (
            <InputPassword
              innerRef={register({ required: true, minLength: 6 })}
              invalid={errors.password}
              errors={errors}
              placeholder="Digite uma senha"
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="city">Cidade</Label>
            <CustomInput
              type="select"
              name="city"
              id="city"
              innerRef={register({ required: true })}
              invalid={errors.city}
            >
              <option value="">Selecione...</option>
              {cidades.sort(alfabeticOrder('title')).map((city) => {
                return (
                  <option key={city.value} value={city.value}>
                    {city.title} ({city.state})
                  </option>
                );
              })}
            </CustomInput>
            <FormFeedback>Campo obrigatório</FormFeedback>
          </FormGroup>

          <FormGroup>
            <CustomInput
              type="checkbox"
              id="isCandidate"
              label="Sou candidata(o)"
              onClick={() => toggleIsCandidate(!isCandidate)}
            />
          </FormGroup>
        </Col>
      </Row>
      {isCandidate && (
        <>
          <FormGroup tag="fieldset" className="mt-3">
            <legend>Identificação</legend>
            <Row>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="age">Idade</Label>
                  <CustomInput
                    type="select"
                    name="age"
                    id="age"
                    aria-label="Idade"
                    innerRef={register({ required: true })}
                    invalid={errors.age}
                  >
                    <option value="">Selecione...</option>
                    {ages.sort(alfabeticOrder('category')).map((age) => {
                      return (
                        <option value={age.category}>{age.description}</option>
                      );
                    })}
                  </CustomInput>
                  {errors.age?.type === 'required' && (
                    <FormFeedback>Campo obrigatório</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="ethnicGroup">Identificação étnico-racial</Label>
                  <CustomInput
                    type="select"
                    name="ethnicGroup"
                    id="ethnicGroup"
                    aria-label="Identificação étnico-racial"
                    innerRef={register({ required: true })}
                    invalid={errors.ethnicGroup}
                  >
                    <option value="">Selecione...</option>
                    {ethnicGroup
                      .sort(alfabeticOrder('category'))
                      .map((ethnic) => {
                        return (
                          <option key={ethnic.category} value={ethnic.category}>
                            {ethnic.category}
                          </option>
                        );
                      })}
                  </CustomInput>
                  {errors.ethnicGroup?.type === 'required' && (
                    <FormFeedback>Campo obrigatório</FormFeedback>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="gender">Gênero</Label>
                  <CustomInput
                    type="select"
                    name="gender"
                    id="gender"
                    aria-label="Selecione seu gênero"
                    innerRef={register({ required: true })}
                    invalid={errors.gender}
                  >
                    <option value="">Selecione...</option>
                    {genders.sort(alfabeticOrder('category')).map((gender) => {
                      return (
                        <option key={gender.category} value={gender.category}>
                          {gender.category}
                        </option>
                      );
                    })}
                  </CustomInput>
                  {errors.gender?.type === 'required' && (
                    <FormFeedback>Campo obrigatório</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="socialGroup">LGBTQIAP+</Label>
                  <Controller
                    name="socialGroup"
                    as={Select}
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Selecione..."
                    control={control}
                    options={socialGroups.map(({ letter, name }) => ({
                      value: letter,
                      label: name,
                    }))}
                  />
                  <FormText color="muted">
                    Opcional, caso se identifique.
                  </FormText>
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Candidatura</legend>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="cnpj">CNPJ</Label>

                  <Controller
                    as={InputMask}
                    control={control}
                    name="cnpj"
                    id="cnpj"
                    className={`form-control ${
                      errors.cnpj?.type === 'pattern' && 'is-invalid'
                    }`}
                    mask="99.999.999/9999-99"
                    rules={{ pattern: CNPJ_REGEX }}
                    defaultValue=""
                  />

                  {errors.cnpj?.type === 'pattern' && (
                    <FormFeedback>CNPJ inválido</FormFeedback>
                  )}

                  <FormText color="muted">
                    Opcional enquanto não homologado.
                  </FormText>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label htmlFor="candidateNumber">Número</Label>
                  <Input
                    type="number"
                    name="candidateNumber"
                    id="candidateNumber"
                    placeholder="Digite aqui seu número"
                    innerRef={register({ required: true })}
                    invalid={errors.candidateNumber}
                  />
                  <FormFeedback>Campo obrigatório</FormFeedback>
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="politicalParty">Partido</Label>
                  <CustomInput
                    type="select"
                    name="politicalParty"
                    id="politicalParty"
                    innerRef={register({ required: true })}
                    invalid={errors.politicalParty}
                  >
                    <option value="">Selecione...</option>
                    {politicalParties
                      .sort(alfabeticOrder('numero'))
                      .map((partido) => {
                        return (
                          <option key={partido.sigla} value={partido.sigla}>
                            {' '}
                            {partido.numero} - {partido.sigla} - {partido.nome}
                          </option>
                        );
                      })}
                  </CustomInput>
                  <FormFeedback>Campo obrigatório</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Inclua aqui informações em geral sobre sua candidatura, como redes sociais, site etc."
                    innerRef={register()}
                    rows="5"
                  />
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>
        </>
      )}
      <Row>
        <Col className="text-center">
          <Button color="primary" block data-testid="submit-button">
            Cadastrar
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default SignUpForm;

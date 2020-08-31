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

import InputPassword from './InputPassword';
import { Button, FormGroupCheck } from './SignUpForm.styled';
import userRoles from 'constants/userRoles';
import { alfabeticOrder } from '../../styles/helper';
import { genders, ethnicGroup, ages, politicalParties } from 'data/form-data';
import { cidades } from 'data/cidades';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// eslint-disable-next-line no-useless-escape
const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

const SignUpForm = ({ onBackClick, user }) => {
  const { register, handleSubmit, control, errors } = useForm();
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

    const role = isCandidate ? userRoles.CANDIDATE : userRoles.VOTER;
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

    if (password) {
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
        .catch(handleSignupFailure);
    } else {
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
    { value: 'L', label: 'Lésbica' },
    { value: 'G', label: 'Gay' },
    { value: 'B', label: 'Bissexual' },
    { value: 'T', label: 'Transgêneros, Transsexuais ou Travestis' },
    { value: 'Q', label: 'Queer' },
    { value: 'I', label: 'Intersexo' },
    { value: 'A', label: 'Assexual' },
    { value: 'P', label: 'Panssexual' },
    { value: '+', label: '+' },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {cidades.sort(alfabeticOrder('title')).map((city) => {
              return (
                <option key={city.value} value={city.value}>
                  {city.title}
                </option>
              );
            })}
          </Input>
          <FormFeedback>Campo obrigatório</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="email">E-mail</Label>
          <Input
            type="text"
            name="email"
            id="email"
            innerRef={register({ required: true, pattern: EMAIL_REGEX })}
            invalid={errors.email}
            defaultValue={(user && user.email) || ''}
          />
          {errors.email?.type === 'required' && (
            <FormFeedback>Campo obrigatório</FormFeedback>
          )}
          {errors.email?.type === 'pattern' && (
            <FormFeedback>E-mail inválido</FormFeedback>
          )}
        </FormGroup>

        {!user && (
          <InputPassword
            innerRef={register({ required: true, minLength: 6 })}
            invalid={errors.password}
            errors={errors}
            placeholder="Digite uma senha"
          />
        )}

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
                {genders.sort(alfabeticOrder('category')).map((gender) => {
                  return (
                    <option key={gender.category} value={gender.category}>
                      {gender.category}
                    </option>
                  );
                })}
              </Input>
              {errors.gender?.type === 'required' && (
                <FormFeedback>Campo obrigatório</FormFeedback>
              )}
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
              />
            </FormGroup>

            <FormGroup>
              <Label for="ethnicGroup">Identificação étnico-racial</Label>
              <Input
                type="select"
                name="ethnicGroup"
                id="ethnicGroup"
                aria-label="Identificação étnico-racial"
                innerRef={register({ required: true })}
                invalid={errors.ethnicGroup}
              >
                <option value="">Selecione</option>
                {ethnicGroup.sort(alfabeticOrder('category')).map((ethnic) => {
                  return (
                    <option key={ethnic.category} value={ethnic.category}>
                      {ethnic.category}
                    </option>
                  );
                })}
              </Input>
              {errors.ethnicGroup?.type === 'required' && (
                <FormFeedback>Campo obrigatório</FormFeedback>
              )}
            </FormGroup>

            <FormGroup>
              <Label for="age">Idade</Label>
              <Input
                type="select"
                name="age"
                id="age"
                aria-label="Idade"
                innerRef={register({ required: true })}
                invalid={errors.age}
              >
                <option value="">Selecione</option>
                {ages.sort(alfabeticOrder('category')).map((age) => {
                  return <option value={age.category}>{age.category}</option>;
                })}
              </Input>
              {errors.age?.type === 'required' && (
                <FormFeedback>Campo obrigatório</FormFeedback>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="cnpj">CNPJ cadastrado</Label>
              <Input
                name="cnpj"
                id="cnpj"
                placeholder="Digite aqui seu CNPJ"
                innerRef={register({ pattern: CNPJ_REGEX })}
                invalid={errors.cnpj}
              />
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
                    {politicalParties
                      .sort(alfabeticOrder('nome'))
                      .map((partido) => {
                        return (
                          <option key={partido.sigla} value={partido.sigla}>
                            {' '}
                            {partido.numero} - {partido.sigla} - {partido.nome}
                          </option>
                        );
                      })}
                  </Input>
                  <FormFeedback>Campo obrigatório</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label htmlFor="description">Descrição</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Inclua aqui informações gerais sobre sua candidatura: redes socias, sites, Instagram, etc."
                innerRef={register()}
              />
            </FormGroup>
          </>
        )}

        <Button data-testid="submit-button">Entrar</Button>
      </form>
    </>
  );
};

export default SignUpForm;

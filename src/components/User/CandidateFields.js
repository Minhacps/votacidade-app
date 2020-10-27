import React from 'react';
import {
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  FormText,
  FormFeedback,
  CustomInput,
} from 'reactstrap';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { alfabeticOrder } from '../../styles/helper';
import {
  genders,
  socialGroups,
  ethnicGroup,
  ages,
  politicalParties,
} from 'data/form-data';

// eslint-disable-next-line no-useless-escape
const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

const CandidateFields = ({ user, register, errors, control }) => (
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
              defaultValue={user.age || ''}
            >
              <option value="">Selecione...</option>
              {ages.sort(alfabeticOrder('category')).map((age) => {
                return (
                  <option key={age.category} value={age.category}>
                    {age.description}
                  </option>
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
              defaultValue={user.ethnicGroup || ''}
            >
              <option value="">Selecione...</option>
              {ethnicGroup.sort(alfabeticOrder('category')).map((ethnic) => {
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
              defaultValue={user.gender || ''}
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
              defaultValue={user.socialGroup || ''}
            />
            <FormText color="muted">Opcional, caso se identifique.</FormText>
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
              defaultValue={user.cnpj || ''}
            />

            {errors.cnpj?.type === 'pattern' && (
              <FormFeedback>CNPJ inválido</FormFeedback>
            )}

            <FormText color="muted">Opcional enquanto não homologado.</FormText>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="6">
          <FormGroup>
            <Label htmlFor="candidateNumber">Número de candidatura</Label>
            <Input
              type="number"
              name="candidateNumber"
              id="candidateNumber"
              placeholder="Digite aqui seu número"
              innerRef={register({
                required: true,
                validate: (value) => value.length === 5,
              })}
              invalid={errors.candidateNumber}
              defaultValue={user.candidateNumber || ''}
            />
            {errors.candidateNumber?.type === 'required' && (
              <FormFeedback>Campo obrigatório</FormFeedback>
            )}
            {errors.candidateNumber?.type === 'validate' && (
              <FormFeedback>O número deve ter 5 dígitos</FormFeedback>
            )}
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
              defaultValue={user.politicalParty || ''}
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
              defaultValue={user.description || ''}
            />
          </FormGroup>
        </Col>
      </Row>
    </FormGroup>
  </>
);

export default CandidateFields;

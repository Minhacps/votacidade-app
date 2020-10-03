import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import {
  Button,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
} from 'reactstrap';

import { alfabeticOrder } from 'styles/helper';
import { ReactComponent as FilterIcon } from 'assets/icons/filter.svg';
import {
  genders,
  socialGroups,
  ethnicGroup,
  ages,
  politicalParties,
} from 'data/form-data';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;

export default function RankingFilters({ register, control }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <Form>
      <Row>
        <Col className="text-left">
          <StyledButton
            color="primary"
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            <FilterIcon /> Filtrar
          </StyledButton>
        </Col>
      </Row>
      {isFormOpen && (
        <>
          <FormGroup>
            <Label for="age">Idade</Label>
            <CustomInput
              type="select"
              name="age"
              id="age"
              aria-label="Idade"
              innerRef={register}
            >
              <option value="">Selecione...</option>
              {ages.sort(alfabeticOrder('category')).map((age) => {
                return <option value={age.category}>{age.description}</option>;
              })}
            </CustomInput>
          </FormGroup>
          <FormGroup>
            <Label for="gender">Gênero</Label>
            <CustomInput
              type="select"
              name="gender"
              id="gender"
              aria-label="Selecione seu gênero"
              innerRef={register}
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
          </FormGroup>
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
          </FormGroup>
          <FormGroup>
            <Label for="ethnicGroup">Identificação étnico-racial</Label>
            <CustomInput
              type="select"
              name="ethnicGroup"
              id="ethnicGroup"
              aria-label="Identificação étnico-racial"
              innerRef={register}
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
          </FormGroup>
          <FormGroup>
            <Label for="politicalParty">Partido</Label>
            <CustomInput
              type="select"
              name="politicalParty"
              id="politicalParty"
              innerRef={register}
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
          </FormGroup>
        </>
      )}
    </Form>
  );
}

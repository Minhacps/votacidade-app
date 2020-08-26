import React, { Component } from 'react';

import { CityContext } from 'components/CityProvider/CityProvider';
import GenderSelectField from './GenderSelectField';
import { alfabeticOrder } from '../../styles/helper';
import { genders, ethnicGroup, ages, politicalParties } from 'data/form-data';
import { cidades } from 'data/cidades';

const VOTER = 'voter';
const CANDIDATE = 'candidate';

class CompleteSignupForm extends Component {
  state = {
    role: VOTER,
  };

  handleUserRoleChange = (event) => {
    const { value } = event.target;

    this.setState({
      role: value,
    });
  };

  render() {
    return (
      <CityContext.Consumer>
        {({ name }) => (
          <>
            <div className="complete-signup__background" />
            <section className="complete-signup">
              <header className="complete-signup__header">
                <h2>Olá!</h2>
                <p>
                  Ficamos muito feliz pelo seu interesse em {name}. Precisamos
                  apenas de mais alguns dados para finalizar seu cadastro.
                </p>
              </header>
              <form onSubmit={this.props.onSubmit} className="">
                <p className="user-profile__title">Selecione uma opção</p>
                <div className="user-profile">
                  <div className="user-profile-field">
                    <input
                      type="radio"
                      id="roleVoter"
                      name="role"
                      value={VOTER}
                      checked={this.state.role === VOTER}
                      onChange={this.handleUserRoleChange}
                    />
                    <label htmlFor="roleVoter">Vou votar</label>
                  </div>
                  <div className="user-profile-field">
                    <input
                      type="radio"
                      id="roleCandidate"
                      name="role"
                      value={CANDIDATE}
                      checked={this.state.role === CANDIDATE}
                      onChange={this.handleUserRoleChange}
                    />
                    <label htmlFor="roleCandidate">Vou me candidatar</label>
                  </div>
                </div>

                {(!this.props.userData || !this.props.userData.name) && (
                  <div className="field-wrapper">
                    <label htmlFor="name">Nome</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="input"
                      required
                    />
                  </div>
                )}

                {this.state.role === CANDIDATE && (
                  <React.Fragment>
                    <div className="field-wrapper">
                      <label htmlFor="cnpj">CNPJ</label>
                      <input
                        type="text"
                        id="cnpj"
                        name="cnpj"
                        className="input"
                        required
                      />
                    </div>

                    <div className="field-wrapper">
                      <label htmlFor="number">Número</label>
                      <input
                        type="text"
                        id="number"
                        name="number"
                        className="input"
                        required
                      />
                    </div>
                    <div className="field-wrapper">
                      <label htmlFor="age">Idade</label>
                      <select name="age" id="age" className="input">
                        {ages.sort(alfabeticOrder('category')).map((age) => {
                          return (
                            <option value={age.category}>{age.category}</option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="field-wrapper">
                      <label htmlFor="raca">Identificação étnico-racial</label>
                      <select name="raca" id="raca" className="input">
                        {ethnicGroup
                          .sort(alfabeticOrder('category'))
                          .map((ethnic) => {
                            return (
                              <option value={ethnic.category}>
                                {ethnic.category}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <GenderSelectField />

                    <div className="field-wrapper">
                      <label htmlFor="politicalParty">Partido</label>
                      <select
                        name="politicalParty"
                        id="politicalParty"
                        className="input"
                      >
                        {politicalParties
                          .sort(alfabeticOrder('nome'))
                          .map((partido) => {
                            return (
                              <option value={partido.sigla}>
                                {' '}
                                {partido.numero} - {partido.sigla} -{' '}
                                {partido.nome}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="field-wrapper">
                      <label htmlFor="description">
                        Descrição <small>(opcional)</small>
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        maxLength={500}
                        className="input"
                      ></textarea>
                    </div>
                  </React.Fragment>
                )}

                <footer className="complete-signup__footer">
                  <button type="submit" className="btn btn-primary">
                    Salvar
                  </button>
                </footer>
              </form>
            </section>
          </>
        )}
      </CityContext.Consumer>
    );
  }
}

export default CompleteSignupForm;

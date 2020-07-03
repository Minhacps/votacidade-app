import React, { Component } from 'react';

import { CityContext } from 'components/CityProvider/CityProvider';

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
                      <label htmlFor="level">Deputada(o)</label>
                      <select id="level" name="level" className="input">
                        <option value="federal">Federal</option>
                        <option value="estadual">Estadual</option>
                      </select>
                    </div>

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
                      <label htmlFor="politicalParty">Partido</label>
                      <select
                        name="politicalParty"
                        id="politicalParty"
                        className="input"
                      >
                        <option value="AVANTE"> AVANTE - Avante - 70 </option>
                        <option value="DC">
                          {' '}
                          DC - Democracia Cristã - 27{' '}
                        </option>
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
                        <option value="PR">
                          PR - Partido da República - 22{' '}
                        </option>
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
                        <option value="NOVO">
                          NOVO - Partido Novo[65] - 30{' '}
                        </option>
                        <option value="PPL">
                          PPL - Partido Pátria Livre - 54{' '}
                        </option>
                        <option value="PPS">
                          PPS - Partido Popular Socialista - 23{' '}
                        </option>
                        <option value="PP">
                          PP - Partido Progressista - 11{' '}
                        </option>
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
                          PSTU - Partido Socialista dos Trabalhadores Unificado
                          - 16{' '}
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

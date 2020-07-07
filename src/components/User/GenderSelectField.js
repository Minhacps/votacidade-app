import React from 'react';

const GenderSelectField = () => {
  return (
    <>
      <div className="field-wrapper">
        <label htmlFor="gender">Gênero</label>
        <select name="gender" id="gender" className="input">
          <option value="nao-binario">Não binário</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
      </div>

      <div className="field-wrapper">
        <input type="checkbox" id="lgbt" name="lgbt" />
        <label htmlFor="lgbt">LGBTIQAP+</label>
      </div>
    </>
  );
};
export default GenderSelectField;

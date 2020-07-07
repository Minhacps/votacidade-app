import React, { PureComponent } from 'react';

import CompleteSignupForm from './CompleteSignupForm';

const VOTER = 'voter';

class CompleteSignup extends PureComponent {
  handleSubmit = async (event) => {
    event.preventDefault();

    const userData = await this.formatUserData(event.target);

    this.props.firebase
      .firestore()
      .collection('users')
      .doc(this.props.currentUser.uid)
      .set({ ...userData, email: this.props.currentUser.email });
  };

  formatUserData = async (fields) => {
    const { name } = this.props.userData || {};

    const userMetadata = {
      role: fields.role.value,
      name: name || fields.name.value.trim(),
      createdAt: new Date().toISOString(),
    };

    if (userMetadata.role === VOTER) {
      return userMetadata;
    }

    const candidateData = {
      cnpj: fields.cnpj.value.trim(),
      number: fields.number.value.trim(),
      politicalParty: fields.politicalParty.value.trim(),
      description: fields.description.value.trim(),
      age: fields.age.value,
      raca: fields.raca.value,
      gender: fields.gender.value,
      lgbt: fields.lgbt.checked,
      homologated: false,
      picture: null,
    };

    await this.props.firebase
      .firestore()
      .collection('candidates_pictures')
      .where('number', '==', Number(candidateData.number))
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          candidateData.picture = doc.data().picture;
        });
      });

    return {
      ...userMetadata,
      ...candidateData,
    };
  };

  render() {
    return (
      <CompleteSignupForm
        onSubmit={this.handleSubmit}
        userData={this.props.userData}
      />
    );
  }
}

export default CompleteSignup;

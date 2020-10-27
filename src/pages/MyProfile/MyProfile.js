import React, { useContext, useState } from 'react';
import {
  Container,
  Label,
  Input,
  FormGroup,
  FormFeedback,
  Button,
  Spinner,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import firebaseAuthentication from 'firebase/app';

import { CityContext } from 'components/CityProvider/CityProvider';
import { AnswersContext } from 'components/AnswersProvider/AnswersProvider';
import CandidateFields from 'components/User/CandidateFields';
import ImageThumbnail from 'components/atoms/ImageThumbnail';
import getPicture from 'constants/candidatePicture';

import { CandidateName, CandidateNumber } from '../Profile/Profile.styled.js';

const MyProfile = ({ user }) => {
  const { cityPath, currentUser, firebase } = useContext(CityContext);
  const { getAnswersMap } = useContext(AnswersContext);
  const { register, handleSubmit, errors, control } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (userData) => {
    setLoading(true);

    const updatedUserData = {
      ...user,
      ...userData,
    };

    window.localStorage.setItem('userData', JSON.stringify(updatedUserData));

    await firebaseAuthentication
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .set(updatedUserData, { merge: true });

    await firebase
      .database()
      .ref(currentUser.uid)
      .set({
        ...updatedUserData,
        email: currentUser.email,
        answers: getAnswersMap(),
      });

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container className="py-4">
        {loading && <Spinner color="primary" />}

        <ImageThumbnail
          src={getPicture(cityPath, user.candidateNumber)}
          alt={`Foto de ${user.name}`}
          placeholderText="Foto"
          width="143px"
          height="143px"
          className="border mx-auto"
        />
        <CandidateName>{user.name}</CandidateName>
        <CandidateNumber>
          {user.candidateNumber} | {user.politicalParty}
        </CandidateNumber>
        <FormGroup>
          <Label htmlFor="name">Nome completo</Label>
          <Input
            name="name"
            id="name"
            placeholder="Digite seu nome completo"
            innerRef={register({ required: true })}
            invalid={errors.name}
            defaultValue={user.name || ''}
          />
          <FormFeedback>Campo obrigatório</FormFeedback>
        </FormGroup>
        <CandidateFields
          user={user}
          register={register}
          errors={errors}
          control={control}
        />
        <Button>Salvar</Button>
      </Container>
    </form>
  );
};

export default MyProfile;

import React from 'react'
import logo from '../../assets/logo-dio.png';

import { useNavigate } from 'react-router-dom';

import { Button } from '../Button';

import { Container, Wrapper, BuscarInputContainer, Input, Row, Menu, MenuRight, UserPicture} from './styles';
import { IHeader } from './types';

const Header = ({autenticado}: IHeader) => {

  const navigate = useNavigate();

  const handleClickSignIn = () => {
      navigate('/login')
  }

  const handleClickSignUp = () => {
    navigate('/signup')
}

  return (
    <Wrapper>
      <Container>
          <Row>
            <img src={logo} alt="Logo da dio"/>
            {autenticado ? (
              <>
               <BuscarInputContainer>
                <Input placeholder='Buscar...'/>
               </BuscarInputContainer>
                <Menu>Live Code</Menu>
                <Menu>Global</Menu>
              </>
            ) : null}
          </Row>
          <Row>
              {autenticado ? (
                <UserPicture src="https://avatars.githubusercontent.com/u/112592743?v=4"/>
              ) : (
              <>
                <MenuRight href="/">Home</MenuRight>
                <Button onClick={handleClickSignIn} title="Entrar" />
                <Button onClick={handleClickSignUp} title="Cadastrar" />
              </>)}
          </Row>
      </Container>
    </Wrapper>
  )
}

export { Header }

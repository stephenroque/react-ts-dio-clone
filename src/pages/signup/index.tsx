import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";

import { Container, Title, Column, TitleSignUp, SubtitleSignUp, LoginText, Row, Wrapper, Privacy, Link } from './styles';
import { IFormData } from "./types";

const SignUp = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm<IFormData>({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData: IFormData) => {
            const {data} = await api.get(`/users?email=${formData.email}`);
            if(data.length && data[0].id){
                navigate('/login') 
                alert('Usuário já possui cadastro')
            } else {
                await api.post(`/users`,
                {
                    name:`${formData.nome}`,
                    email:`${formData.email}`,
                    password:`${formData.password}`
                });
                alert('Usuário Cadastrado')
                navigate('/login') 
            }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleSignUp>Comece agora grátis</TitleSignUp>
                <SubtitleSignUp>Crie sua conta e make the change._</SubtitleSignUp>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome completo" leftIcon={<MdPerson />} name="nome"  control={control} />
                    {errors.nome && <span>Nome é obrigatório</span>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="password" control={control} />
                    {errors.password && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                <Privacy>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</Privacy>
                </Row>
                <Row>
                    <LoginText>Já tenho conta. <Link href="/login">Fazer login</Link></LoginText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { SignUp }
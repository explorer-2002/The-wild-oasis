import styled from "styled-components";

import LoginForm from '../features/authentication/LoginForm'
import Heading from "../ui/Heading";
import Logo from '../ui/Logo'

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
  <LoginLayout>
    <Logo />
    <Heading as="h4">Log in to your account</Heading>
    <LoginForm />
  </LoginLayout>
  );
}

export default Login;

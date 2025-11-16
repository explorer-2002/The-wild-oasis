import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import SpinnerMini from '../../ui/SpinnerMini'
import { IoLogoGoogle } from "react-icons/io";

import { useLogin } from "./useLogin";
import styled from "styled-components";

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
  color: white;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--color-grey-300);
  }
  
  &::before {
    margin-right: 1rem;
  }
  
  &::after {
    margin-left: 1rem;
  }
`;

const GoogleButton = styled.button`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-left: 50px;
  background-color: transparent;
  border: 1px solid var(--color-grey-300);
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-grey-700);
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  
  &:hover {
    background-color: var(--color-grey-50);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login({ email, password }, {
      onSettled: () => {
        setEmail('');
        setPassword('');
      }
    })
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading} />
        </FormRow>

        <FormRow label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading} />
        </FormRow>

        <FormRow>
          <Button size="large" disabled={isLoading}>
            {!isLoading ? 'Log in' : <SpinnerMini />}
          </Button>
        </FormRow>
      </Form>

      <Divider>OR</Divider>

      <GoogleButton onClick={() => { window.location.href = `${import.meta.env.VITE_BASE_API_URL}/auth/google` }}>
        <IoLogoGoogle />
        Sign in with Google
      </GoogleButton>
    </>
  );
}

export default LoginForm;

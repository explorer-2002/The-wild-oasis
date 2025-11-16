import styled, { css } from "styled-components";


const StyledFormRow = styled.div`
  display: grid;
  align-items: center;

   ${(props) =>

    props.type === "regular" &&
    css`
       grid-template-columns: 24rem 1fr 1.2fr;
         width: fit-content;
    `}

  gap: 2.4rem;
  padding: 1.2rem 1.2rem;
  margin: 0 auto;
  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 4.5rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

StyledFormRow.defaultProps = {
  type: 'regular'
}

export default function FormRow({ label, error, children, type }) {
  return (
    <StyledFormRow type={type}>
      {label && <Label htmlFor={children.props}>{label}</Label>}
      {/* <Input type="text" id="name" {...register("name",{
          required:"This field is mandatory"
        })} /> */}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}

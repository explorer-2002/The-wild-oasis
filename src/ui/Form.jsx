import styled, { css } from "styled-components";

const Form = styled.form`
    margin-left:10%;

  ${(props) =>
  
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      width:80rem;
      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 85rem;
    `}
    
  overflow: auto;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type:'regular'
}

export default Form;

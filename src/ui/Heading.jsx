import styled, { css } from "styled-components";

// const text = css`text-align:center;
//             ${10 > 5 && "background-color:yellow" }

const Heading = styled.h1`

  
${(props) => props.as === 'h1' &&
        css`font-weight : 600;
             font-size: 3rem;`
}
  
${(props) => props.as === 'h2' &&
        css`font-weight : 600;
             font-size: 2rem;`
}

${(props) => props.as === 'h3' &&
        css`font-weight : 600;
             font-size: 1rem;`

       
}

${(props) => props.as === 'h4' &&
        css`font-weight : 600;
             font-size: 3rem;
             text-align:center;`

       
}

            line-height : 1.4;
 
`;

export default Heading;
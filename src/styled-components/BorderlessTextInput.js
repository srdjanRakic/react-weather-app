import styled from "styled-components";

const BorderlessTextInput = styled.input`
  border: none;
  background-color: none;
  outline: 0;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #2fb8b8;
    opacity: 1; /* Firefox */
  }
`;

export default BorderlessTextInput;
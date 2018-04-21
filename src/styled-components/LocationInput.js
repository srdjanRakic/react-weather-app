import styled from "styled-components";

const LocationInput = styled.input`
    text-align: center;
    display: block;
    font-weight: 300;
    width: 100%;
    font-size: 25px;
    border: 0px;
    outline: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #4b545f;
    background: #fff;
    font-family: Open Sans, Verdana;
    padding: 10px 15px;
    margin: 30px 0px;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;

    :focus {
        border-bottom: 1px solid #ddd;
    }
`;

export default LocationInput;

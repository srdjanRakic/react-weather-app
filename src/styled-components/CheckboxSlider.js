import React from 'react';
import styled from 'styled-components';

const Switch = styled.input`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    border-radius: 25px;
    background-color: #989898;
`;

const Input = styled.input`
    display: none;
`;

const Metrics = styled.div`
    position: absolute;
    border-radius: 50%;
    transition: .1s ease;

 	width: 18px;
	height: 18px;
	top: 1px;
	left: 1px;

    left: ${props => props.isChecked ? '50%' : '0'};
    background-color: ${props => props.isChecked ? '#bababa' : '#ea352d'};
`;

const Toggler = props => {
    console.log(props)
    return (
        <Switch>
            <Input >
            <Metrics>{props.metric}</Metrics>
        </Switch>
    )
}

export default Toggler;

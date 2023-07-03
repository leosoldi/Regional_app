import styled from "styled-components";

export const Container = styled.div `
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    label {
        margin-bottom: 10px;
    }

`

export const InputStyled = styled.input `

    border: none;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    border-radius: 8px;
    height: 21px;
    font-size: 18px;
    padding: 10px;


`

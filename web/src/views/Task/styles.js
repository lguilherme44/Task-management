import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  span {
    color: #707070;
    margin: 15px 0;
    font-size: 18px;
    text-align: center;
  }
`;

export const Form = styled.div`
  width: 50%;
  margin-bottom: 70px;
`;

export const TypeIcons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .inative {
    opacity: 0.5;
  }

  button {
    outline: 0;
    border: none;
    background: none;
  }

  img {
    width: 65px;
    height: 65px;
    margin: 10px;
    cursor: pointer;

    &:hover {
      opacity: 40%;
    }
  }
`;

export const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  /* Timepicker */
  .bMjnxH svg {
    display: none;
  }

  .hbvkfr {
    border-radius: 0;
    border-bottom: 1px solid #707070;
  }

  .bGeQRp {
    color: #fff !important;
    background-color: #7159c1 !important;
    box-shadow: 0 0 2px #7159c1 !important;
  }

  .bGeQRp:active {
    padding: 0 0.9375rem;
    border: 2px solid #7159c1;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 2px #7159c1;
  }
  /* fim */

  span {
    color: #707070;
    margin: 5px 0;
  }

  input {
    font-size: 16px;
    padding: 15px;
    border: none;
    border-bottom: 1px solid #707070;
    opacity: 0.6;
    outline: 0;
  }
`;

export const TextArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  textarea {
    font-size: 14px;
    outline: 0;
    border-radius: 10px;
    padding: 25px;
    color: #707070;
  }
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    font-size: 18px;
    font-weight: bold;
    color: #707070;
    border: none;
    background: none;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  div {
    display: flex;
    align-items: center;
    color: #7159c1;
    font-weight: bold;
    font-size: 18px;
  }

  input {
    margin-right: 10px;
  }
`;

export const Save = styled.div`
  width: 100%;
  margin-top: 20px;

  button {
    width: 100%;
    background: #7159c1;
    color: #fff;
    border: none;
    font-size: 20px;
    border-radius: 10px;
    padding: 20px;
    font-weight: bold;

    &:hover {
      opacity: 0.9;
    }
  }
`;

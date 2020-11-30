import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Form = styled.div`
  width: 10%;
  margin-bottom: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
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

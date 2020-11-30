import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 50px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  padding: 10px;

  h1 {
    color: #7159c1;
  }

  p {
    color: #707070;
  }
`;

export const QrCodeArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;

export const ValidationCode = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;

  span {
    text-transform: uppercase;
    font-weight: bold;
  }

  input {
    font-size: 18px;
    padding: 10px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #707070;
    margin-top: 10px;
    text-transform: uppercase;
  }

  button {
    font-weight: bold;
    background: #7159c1;
    color: #fff;
    font-size: 18px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
      opacity: 0.8;
    }
  }
`;

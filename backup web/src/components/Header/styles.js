import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background: #0d0d0d;
  border-bottom: 2.5px solid #7159c1;
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 70px;
  padding-left: 20px;

  img {
    width: 127px;
    height: 60px;
  }
`;

export const RightSide = styled.div`
  width: 50%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    background: none;
    border: none;
    outline: 0;
    cursor: pointer;
  }

  a,
  button {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    margin: 0 10px;

    &:hover {
      color: #7159c1;
      transition: 0.5s;
    }
  }

  #notification {
    img {
      width: 31;
      height: 36px;
    }

    span {
      background: #fff;
      color: #7159c1;
      padding: 3px 7px;
      border-radius: 50%;
      position: relative;
      top: -22px;
      right: 14px;
    }

    &:hover {
      opacity: 0.5;
    }
  }

  .divider::after {
    content: '|';
    margin: 0 10px;
    color: #f5f5f5;
    opacity: 0.5;
  }

  button {
    font-size: 16px;
  }
`;

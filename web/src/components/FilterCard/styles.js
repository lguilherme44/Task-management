import styled, { css } from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* width: 300px;
  height: 100px; */
  width: 20rem;
  height: 7rem;
  background: ${shade(0.5, "#0d0d0d")};
  font-family: Lato;

  ${({ actived }) =>
    actived &&
    css`
      background: linear-gradient(
        335deg,
        rgba(113, 89, 193, 0.9) 50%,
        rgba(113, 89, 204, 0.8) 48%,
        rgba(113, 89, 204, 0.85) 25%
      );
    `}

  border-radius: 10px 35px 10px 35px;
  padding: 10px;
  cursor: pointer;
  opacity: 1;
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);

  img {
    width: 30;
    height: 27px;
    color: #fff;
    align-self: flex-start;
  }

  span {
    font-weight: bold;
    font-size: 1rem;
    /* color: rgba(255, 255, 255, 0.8); */
    color: #fff;
    align-self: flex-end;
  }

  &:hover {
    /* background: #7159c1; */
    background: linear-gradient(
      335deg,
      rgba(113, 89, 193, 0.9) 50%,
      rgba(113, 89, 204, 0.8) 48%,
      rgba(113, 89, 204, 0.85) 25%
    );
    transition: 0.5s;
    opacity: 1;
  }
`;

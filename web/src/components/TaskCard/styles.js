import styled from "styled-components";

export const Container = styled.div`
  width: 270px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 3px 0px rgb(0 0 0 / 3%), -1px 0px 2px rgb(0 0 0 / 5%),
    0px 0px 0px rgb(0 0 0 / 6%), 0px -2px 8px rgb(0 0 0 / 7%),
    1px 1px 33.4px rgb(0 0 0 / 9%), 2px 8px 50px rgb(0 0 0 / 12%);
  background: #fff;
  /* background: linear-gradient(45deg, #7159c1, #bb02ff); */
  background-attachment: fixed;
  cursor: pointer;
  transition: 0.5s;
  margin: 25px;

  opacity: ${(props) => (props.done ? 0.5 : 1)};

  &:hover {
    opacity: 0.5;
  }
`;

export const TopCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  text-align: center;

  img {
    width: 5rem;
    margin-bottom: 30px;
  }

  h3 {
    /* color: rgba(255, 255, 255, 0.86); */
    color: #212121;
    opacity: 85%;
  }
`;

export const BottomCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  strong {
    /* color: rgba(255, 255, 255, 0.56); */
    color: #707070;
    opacity: 60%;
  }

  span {
    /* color: rgba(255, 255, 255, 0.56); */
    color: #707070;
    opacity: 60%;
  }
`;

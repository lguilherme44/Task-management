import styled from "styled-components";

export const Container = styled.div`
  width: 270px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.2);
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
    width: 100px;
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

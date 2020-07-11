import styled from 'styled-components';

export const Container = styled.div`
  width: 270px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 3px 4px 2px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 25px;

  opacity: ${(props) => (props.done ? 0.5 : 1)};

  &:hover {
    opacity: 0.2;
    -webkit-box-shadow: 1px 1px 5px 0px rgba(130, 130, 130, 1);
    -moz-box-shadow: 1px 1px 1px 0px rgba(130, 130, 130, 1);
    box-shadow: 1px 1px 1px 0px rgba(130, 130, 130, 1);
  }
`;

export const TopCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;

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

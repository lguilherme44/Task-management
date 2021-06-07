import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const FilterArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;

  button {
    border: none;
    outline: 0;
    background: none;
    padding: 10px;
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 70px;

  a {
    text-decoration: none;
  }
`;

export const Title = styled.div`
  width: 100%;
  border-bottom: 1px solid #707070;
  opacity: 60%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;

  h3 {
    /* color: rgba(255, 255, 255, 0.7); */
    color: #707070;
    position: relative;
    top: 12px;
    /* background: #3e3e3e; */
    background: #fff;
    padding: 0 20px;
  }
`;

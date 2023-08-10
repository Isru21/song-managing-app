import styled from "styled-components";
const Button = ({ color, text, onClick }) => {
  return (
    <ButtonContainer>
      <ButtonStyle onClick={onClick} backgroundColor={color}>
        {text}
      </ButtonStyle>
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.div``;

const ButtonStyle = styled.button`
  display: inline-block;
  background: ${({ backgroundColor }) => backgroundColor || "#000"};
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
`;

import Button from "./Button";
import styled from "styled-components";

const Header = ({ onAdd, change, userId }) => {
  const separateName = userId.split(" ");
  const nickName = separateName[0];
  return (
    <HeaderContainer>
      <HeaderTitle>Song lists for {`${nickName}`}</HeaderTitle>
      <Button
        color={
          change ? "rgba(197, 62, 62, 0.821)" : " rgba(197, 62, 62, 0.821)"
        }
        text={change ? "Close" : "Add song"}
        onClick={onAdd}
      />
    </HeaderContainer>
  );
};

Header.defaultProps = {
  title: "No hearder title given",
};
export default Header;

const HeaderTitle = styled.h1``;
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

import Button from "./Button";

const Header = ({ onAdd, change, userId }) => {
  console.log(userId);
  const separateName = userId.split(" ");
  const nickName = separateName[0];
  return (
    <header className="header">
      <h1>Song lists for {`${nickName}`}</h1>

      <Button
        color={change ? " rgba(197, 62, 62, 0.821)" : "green"}
        text={change ? "Close" : "Add song"}
        onClick={onAdd}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "No hearder title given",
};
export default Header;

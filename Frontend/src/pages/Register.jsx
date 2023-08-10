import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setpasswordStrength] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Login successful, handle further actions (e.g., redirect to another page)
        console.log("Login successful!");
        const data = await response.json();
        localStorage.setItem("token", JSON.stringify(data));

        // Redirect to the "api/songs" page
        window.location.href = "/songs"; // You can also use React Router's history object to navigate programmatically if needed
      } else {
        // Login failed, handle the error
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const calculatePasswordStrength = (password) => {
    // console.log(password.target.value);
    if (password.length < 6) {
      setpasswordStrength("Weak");
    } else if (password.length < 10) {
      setpasswordStrength("Moderate");
    } else {
      setpasswordStrength("Strong");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Sign up</Title>
        <form className="form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Name</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="whats your name?"
              onChange={(e) => setname(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Tell us your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Create a password"
              onChange={(e) => {
                setPassword(e.target.value);
                calculatePasswordStrength(e.target.value);
              }}
            />
          </FormGroup>
          <PasswordIndicatorContainer>
            <PasswordStrength>
              {passwordStrength === "Weak" && <Weak />}
              {passwordStrength === "Moderate" && <Moderate />}
              {passwordStrength === "Strong" && <Strong />}
            </PasswordStrength>
            <PasswordIndicatorText>
              Password Strength: {passwordStrength}
            </PasswordIndicatorText>
          </PasswordIndicatorContainer>
          <SignButton type="submit">Sign up</SignButton>
        </form>
        <SocialMessage></SocialMessage>
        <Signup>
          Already registered ?<GotoRegister to={`/`}>Login</GotoRegister>
        </Signup>
      </FormContainer>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GotoRegister = styled(Link)``;
const FormContainer = styled.div`
  width: 320px;
  border-radius: 0.75rem;
  background-color: rgba(17, 24, 39, 1);
  padding: 2rem;
  color: rgba(243, 244, 246, 1);
`;

const Title = styled.p`
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
`;

const FormGroup = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const Label = styled.label`
  display: block;
  color: rgba(156, 163, 175, 1);
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: rgba(17, 24, 39, 1);
  padding: 0.75rem 1rem;
  color: rgba(243, 244, 246, 1);

  &:focus {
    border-color: rgba(167, 139, 250);
  }
`;

const SignButton = styled.button`
  display: block;
  width: 100%;
  background-color: rgba(167, 139, 250, 1);
  padding: 0.75rem;
  text-align: center;
  color: rgba(17, 24, 39, 1);
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
`;

const SocialMessage = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
`;

const Signup = styled.p`
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175, 1);
`;
const PasswordIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const PasswordStrength = styled.div`
  flex: 1;
  height: 8px;
  border-radius: 4px;
`;

const StrengthSegment = styled.div`
  height: 100%;
  border-radius: inherit;
`;

const Weak = styled(StrengthSegment)`
  background-color: #ff6347; /* Red for weak */
`;

const Moderate = styled(StrengthSegment)`
  background-color: #ffa500; /* Orange for moderate */
`;

const Strong = styled(StrengthSegment)`
  background-color: #00bfff; /* Blue for strong */
`;

const PasswordIndicatorText = styled.p`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: rgba(156, 163, 175, 1);
`;

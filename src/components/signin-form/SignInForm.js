import { useState } from "react";
import FormInput from "../form-input/FormInput";
import Button from "../buttonComponent/Button";
import {
  signInWithGooglePopup,
  signInUserWithEmail,
} from "../../utilities/firebase/FirbaseUtils";
import "./SignInForm.scss";

const defaultFormField = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFormField);
  const { email, password } = formField;
  
  const resetForm = () => {
    setFormField(defaultFormField);
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    try {
      await signInUserWithEmail(email, password);
      
      alert("user signed in");

      resetForm();
    } catch (error) {
      alert("incorrect user information", error);
    }
  };

  const userSignInWithGoogle = async () => {
    await signInWithGooglePopup();
    
    alert("user successfully created");
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitFormHandler}>
        <FormInput
          label={"email"}
          inputValues={{
            required: true,
            type: "email",
            onChange: inputChangeHandler,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label={"Password"}
          inputValues={{
            required: true,
            type: "password",
            onChange: inputChangeHandler,
            name: "password",
            value: password,
          }}
        />
        <div className="sign-in-buttons">
          <Button type={"submit"}>Sign In</Button>
          <button
            style={{
              backgroundColor: "#4285f4",
              color: "white",
              width: "auto",
              height: "50px",
              fontFamily: "Lato",
              textTransform: "uppercase",
              fontSize: "15px",
              border: "none",
            }}
            type="button"
            onClick={userSignInWithGoogle}
          >
            Sign In with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

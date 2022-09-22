import { useState } from "react";
import {
  createNewUserWithEmail,
  createUserDocFromAuth,
} from "../../utilities/firebase/FirbaseUtils";
import Button from "../buttonComponent/Button";
import FormInput from "../form-input/FormInput";
import "./SignUpForm.scss";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formField, setFormField] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formField;
 
  const resetForm = () => {
    setFormField(defaultFormField);
  };

  const formDataChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormField({ ...formField, [name]: value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    // if email is not equal to password, alert and  return
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      // call the user auth with email and password method
      const { user } = await createNewUserWithEmail(email, password);
      
      // add new user to Firestore
      await createUserDocFromAuth(user, { displayName });

      alert("User successfully created");

      resetForm();
    } catch (error) {
      alert("Cannot create user", error.code);
    }
  };

 return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={formSubmitHandler}>
        <FormInput
          label={"Display Name"}
          inputValues={{
            required: true,
            type: "text",
            onChange: formDataChangeHandler,
            name: "displayName",
            value: displayName,
          }}
        />

        <FormInput
          label={"Email"}
          inputValues={{
            required: true,
            type: "email",
            onChange: formDataChangeHandler,
            name: "email",
            value: email,
          }}
        />

        <FormInput
          label={"Password"}
          inputValues={{
            required: true,
            type: "password",
            onChange: formDataChangeHandler,
            name: "password",
            value: password,
          }}
        />

        <FormInput
          label={"Confirm Password"}
          inputValues={{
            required: true,
            type: "password",
            onChange: formDataChangeHandler,
            name: "confirmPassword",
            value: confirmPassword,
          }}
        />

        <Button type={"submit"}>Sign Up With Email & Password</Button>
      </form>
    </div>
  );
};

export default SignUpForm;

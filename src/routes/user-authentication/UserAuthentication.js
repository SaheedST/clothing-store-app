import SignInForm from "../../components/signin-form/SignInForm";
import SignUpForm from "../../components/signup-form/SignUpForm";
import './UserAuthentication.scss'


const UserAuthentication = () => {
  
  

  return (
    <div className="forms-layout">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default UserAuthentication;

import "./FormInput.scss";
const FormInput = ({ label, inputValues }) => {
  return (
    <div className="group">
      <input className="form-input" {...inputValues} />
      {label && (
        <label
          className={`${
            inputValues.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;

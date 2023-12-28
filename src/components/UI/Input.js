import React, { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, isInput = true, ...props },
  ref,
) {
  return (
    <p className="input-field">
      <label>{label}</label>
      {isInput ? (
        <input ref={ref} type="text" {...props} />
      ) : (
        <textarea ref={ref} cols="30" rows="10" {...props}></textarea>
      )}
    </p>
  );
});

export default React.memo(Input);

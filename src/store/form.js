import { useState } from 'react';

const useForm = (callback) => {

  // useState is used here, just to track values and return those as `setters`
  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    console.log('WE DID IT')
    if (event) event.preventDefault();
    callback(values);
  };

  const handleChange = (event) => {
    // event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;

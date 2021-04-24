import React, { useState, useEffect } from "react";
import { Route } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

import schema from './validation/formSchema';
import Form from './Form';
import Home from './Home';

const initialFormValues = {
  name:'',
  size:'',
  pepperoni:false,
  sausage:false,
  olives:false,
  pineapple:false,
  special:'',
}

const initialFormErrors = {
  name:'',
  size:'',
  special:'',
}

const initialOrders = [];
const initialDisabled = true;

const App = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewOrder = (newOrder) => {
    axios
      .post("https://reqres.in/api/orders", newOrder)
      .then((res) => {
        setOrders([res.data, ...orders]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
        debugger;
      });
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name) 
      .validate(value) 
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value, 
    });
  };

  const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      special: formValues.special.trim(),
      // toppings: ['pepperoni', 'sausage', 'olives', 'pineapple'].filter(
      //   (topping) => formValues[topping]
      // ),
      pepperoni: formValues.pepperoni,
      sausage: formValues.sausage,
      olives: formValues.olives,
      pineapple: formValues.pineapple,
    };

    postNewOrder(newOrder);
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <>
      <h1>Lambda Eats</h1>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/pizza'>
        <Form
          values={formValues}
          change={inputChange}
          submit={formSubmit}
          disabled={disabled}
          errors={formErrors}
        />
      </Route>
    </>
  );
};
export default App;

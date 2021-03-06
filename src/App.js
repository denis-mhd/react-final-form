import React from "react";
import "./App.css";
import { Form, Field, FormSpy } from "react-final-form";
import RenderCount from "./components/RenderCount";
import createDecorator from "final-form-focus";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const showResults = async (values) => {
  await sleep(500); // simulate server latency
  window.alert(JSON.stringify(values, undefined, 2));
};

const focusOnError = createDecorator();
const required = (value) => (value ? undefined : "Required");

function App() {
  return (
    <div className="container">
      <h1> React Final Form</h1>
      <br />
      <Form
        onSubmit={showResults}
        decorators={[focusOnError]}
        subscription={{
          submitting: true,
        }}
      >
        {({ handleSubmit, values, submitting }) => (
          <form onSubmit={handleSubmit}>
            <RenderCount />
            <Field
              name="firstName"
              placeholder="First Name"
              validate={required}
              subscription={{
                value: true,
                active: true,
                error: true,
                touched: true,
              }}
            >
              {({ input, meta, placeholder }) => (
                <div className={meta.active ? "active" : ""}>
                  <label>First Name</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="lastName" placeholder="Last Name" validate={required}>
              {({ input, meta, placeholder }) => (
                <div className={meta.active ? "active" : ""}>
                  <label>Last Name</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="email" placeholder="E-mail" validate={required}>
              {({ input, meta, placeholder }) => (
                <div className={meta.active ? "active" : ""}>
                  <label>E-mail</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <FormSpy subscription={{ values: true }}>
              {({ values }) => (
                <pre>{JSON.stringify(values, undefined, 2)}</pre>
              )}
            </FormSpy>
          </form>
        )}
      </Form>
    </div>
  );
}

export default App;

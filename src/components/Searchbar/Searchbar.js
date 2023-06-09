import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { BtnLabel, FormBtn, Header } from './Searchbar.styled';
import { Form, Field } from './Searchbar.styled';
import { BiSearch } from 'react-icons/bi';
let initialValues = { value: '' };

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = values => {
    initialValues = values;
    return onSubmit(values);
  };
  return (
    <Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <FormBtn type="submit">
            <BtnLabel>
              <BiSearch size="35" />
            </BtnLabel>
          </FormBtn>
          <Field
            name="value"
            type="text"
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

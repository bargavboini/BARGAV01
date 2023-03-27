import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import FeatherIcon from 'feather-icons-react';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './index.scss';
import { getProductDetail } from '../../fetch';

export interface ProductValues {
  name: string;
  quantity: number | '';
  image_url: string;
}

interface Props {
  handleSubmit: (
    values: ProductValues,
    formikHelpers: FormikHelpers<ProductValues>
  ) => void;
  editing?: boolean;
  handleBack: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  quantity: yup.string().required(),
  image_url: yup.string(),
});

export default function ProductForm({
  handleSubmit,
  editing,
  handleBack,
}: Props) {
  const { productId } = useParams();

  const [initialValues, setInitialValues] = useState<ProductValues>({
    name: '',
    quantity: '',
    image_url: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChangeFiles = () => {
    // change file here
  };
  const handleClickUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (editing && productId) {
      getProductDetail(productId).then((res) => {
        if (res.status === 200) {
          setInitialValues({
            name: res.data.name,
            quantity: res.data.quantity,
            image_url: '',
          });
        }
      });
    }
  }, [editing]);

  return (
    <div className="product_create_container ">
      <Button onClick={handleBack} className="btn-back" variant="link">
        <FeatherIcon icon="arrow-left" />
      </Button>
      <div className="create_form shadow">
        <div className="title">
          {editing ? 'Edit the product' : 'Create a new product'}
        </div>

        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          enableReinitialize
          initialValues={initialValues}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                <Form.Label column sm="2">
                  Product image
                </Form.Label>
                <Col sm="10">
                  <div className="d-flex flex-column gap-2">
                    <Image width={200} src="https://picsum.photos/200" />
                    <input
                      onChange={handleChangeFiles}
                      ref={inputRef}
                      type="file"
                      hidden
                    />
                    <div>
                      <Button
                        style={{ width: 200 }}
                        size="sm"
                        className="d-inline-block"
                        variant="outline-primary"
                        onClick={handleClickUpload}
                      >
                        <FeatherIcon icon="upload" />
                        upload
                      </Button>
                    </div>
                  </div>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                <Form.Label column sm="2">
                  Name<span className="text-danger">*</span>
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    name="name"
                    value={values.name}
                    placeholder="Enter name"
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Label column sm="2">
                  Quantity<span className="text-danger">*</span>
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    isValid={touched.quantity && !errors.quantity}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.quantity}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Row>
                <Col sm="2"></Col>
                <Col>
                  <Button
                    disabled={isSubmitting}
                    className="px-4"
                    variant="primary"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      'Save'
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

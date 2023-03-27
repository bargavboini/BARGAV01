import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikHelpers } from 'formik';

import './index.scss';
import ProductForm, { ProductValues } from '../components/product-form';
import { createProduct } from '../fetch';
import { NOTIFICATION_STATUS } from '../../../types';
import { MyAppContext } from '../../../app-context';

function Product() {
  const navigate = useNavigate();

  const { setShowNotification } = useContext(MyAppContext);

  const handleBack = () => {
    navigate('/');
  };

  const handleSubmit = (
    values: ProductValues,
    { setSubmitting }: FormikHelpers<ProductValues>
  ) => {
    setSubmitting(true);
    createProduct(values)
      .then(() => {
        if (setShowNotification) {
          setShowNotification({
            show: true,
            title: '',
            message: 'Create a new product successfully',
            status: NOTIFICATION_STATUS.SUCCESS,
          });
        }
        navigate('/');
      })
      .catch(() => {
        if (setShowNotification) {
          setShowNotification({
            show: true,
            title: '',
            message: 'Create the product failed',
            status: NOTIFICATION_STATUS.DANGER,
          });
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return <ProductForm handleSubmit={handleSubmit} handleBack={handleBack} />;
}

export default Product;

import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';

import ProductForm, { ProductValues } from '../components/product-form';
import { updateProduct } from '../fetch';
import { MyAppContext } from '../../../app-context';
import { NOTIFICATION_STATUS } from '../../../types';
import './index.scss';

function Product() {
  const navigate = useNavigate();
  const { setShowNotification } = useContext(MyAppContext);

  const { productId } = useParams();

  const handleBack = () => {
    navigate('/');
  };
  const handleSubmit = (
    values: ProductValues,
    { setSubmitting }: FormikHelpers<ProductValues>
  ) => {
    if (productId) {
      setSubmitting(true);
      updateProduct(productId, values)
        .then(() => {
          if (setShowNotification) {
            setShowNotification({
              show: true,
              title: '',
              message: 'Edit the product successfully',
              status: NOTIFICATION_STATUS.SUCCESS,
            });
          }
        })
        .catch(() => {
          if (setShowNotification) {
            setShowNotification({
              show: true,
              title: '',
              message: 'Edit the product failed',
              status: NOTIFICATION_STATUS.DANGER,
            });
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };
  return (
    <ProductForm handleSubmit={handleSubmit} editing handleBack={handleBack} />
  );
}

export default Product;

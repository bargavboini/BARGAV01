import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

import './layout.scss';
import { useContext } from 'react';
import { MyAppContext } from 'app-context';
import { DEFAULT_NOTIFICATION } from '../app-context';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { showNotification, setShowNotification } = useContext(MyAppContext);

  return (
    <div className="d-flex overflow-hidden vh-100">
      <main
        style={{ flex: 1, padding: 40 }}
        className="flex-1 overflow-auto bg-light"
      >
        {children}
      </main>

      <ToastContainer className="p-3" position={'top-end'}>
        <Toast
          className="d-inline-block m-1"
          bg={showNotification.status}
          onClose={() =>
            setShowNotification && setShowNotification(DEFAULT_NOTIFICATION)
          }
          show={showNotification.show}
          delay={2000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className={'text-white'}>
            {showNotification.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

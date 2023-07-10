import React from 'react';

import Card from './Card';
import Button from './Button';
import classes from './ErrorModal.module.css';

const ErrorModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>Opss .. Something Went Wrong !!</h2>
        </header>
        <div className={classes.content}>
          {props.title && (
            <p>
              Double Check Your Info Please<br />
              {props.title}
            </p>
          )}
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onConfirm} className=' text-center'>
            Okay
          </Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;

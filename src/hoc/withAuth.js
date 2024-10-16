import React, { useEffect } from 'react';

const withLogger = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      console.log(`Компонент ${WrappedComponent.name} был загружен`);

      return () => {
        console.log(`Компонент ${WrappedComponent.name} был удален`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withLogger;

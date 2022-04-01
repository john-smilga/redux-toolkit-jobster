export const ErrorAlert = ({ alertText }) => {
  return (
    <div className='alert alert-danger'>
      {alertText || 'there was an error'}
    </div>
  );
};
export const SuccessAlert = ({ alertText }) => {
  return (
    <div className='alert alert-success'>
      {alertText || 'there was an error'}
    </div>
  );
};

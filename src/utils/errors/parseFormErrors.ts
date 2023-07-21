type FormErrorType = {
  rule: string;
  field: string;
  message: string;
  args: any;
};

const parseFormErrors = (errors: FormErrorType[]) => {
  const parsedErrors: {
    [key: string]: string;
  } = {};
  errors.forEach((error) => {
    parsedErrors[error.field] = error.message;
  });
  return parsedErrors;
};

export default parseFormErrors;

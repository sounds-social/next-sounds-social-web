export const getErrorsFromResponse = (response: any) => {
  let errors;

  if (response.status === 422) {
    errors = Object.values(response.data.errors).map((nestedError: any) => {
      return nestedError[0];
    });
  }

  if (response.status === 401) {
    errors = [response.data.message];
  }

  return errors;
};

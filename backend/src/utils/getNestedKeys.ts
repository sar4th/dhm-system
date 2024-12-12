export const getNestedKeys = (obj: { [x: string]: any }, key: string) => {
  if (obj[key]) {
    return obj[key];
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getRandomNumber = () => Math.floor(Math.random() * 10000000) + 1;

export const handleConvertArrayToObject = (value: any) =>
  value?.reduce((a: any, v: any) => ({ ...a, [`item${v.id}`]: v }), {});

export const handleConvertObjectToArray = (object: any) => {
  const arr = Object.entries(object);
  return arr?.map((item) => item?.[1]);
};

export const handleConvertArrayToChoicesObject = (value: any) =>
  value?.reduce((a: any, v: any) => ({ ...a, [`${v.index}`]: v?.name }), {});

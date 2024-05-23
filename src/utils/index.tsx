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

// export const regexMissingWord = new RegExp(
//   '(${ANSWER_1}|${ANSWER_2}|${ANSWER_3}|${ANSWER_4}|${ANSWER_5}|${ANSWER_6}|${ANSWER_7}|${ANSWER_8}|${ANSWER_9}|${ANSWER_10})',
//   'g'
// );

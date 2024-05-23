import {
  getRandomNumber,
  handleConvertArrayToChoicesObject,
  handleConvertArrayToObject,
  handleConvertObjectToArray,
} from '.';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleResponseDataForm = (response: any, type: number) => {
  if (type === 1) {
    return JSON.stringify([Number(response)]);
  }

  if (type === 2) {
    return JSON.stringify(response?.map((item) => Number(item)));
  }

  if (type === 3) {
    return JSON.stringify([[response]]);
  }

  if (type === 4) {
    return JSON.stringify([
      handleConvertArrayToChoicesObject(
        handleConvertObjectToArray(response)?.map((item: any, index) => ({
          name: item?.name,
          index: index + 1,
        }))
      ),
      {
        1: 'Đúng',
        2: 'Sai',
      },
    ]);
  }

  if (type === 5) {
    return JSON.stringify(handleConvertObjectToArray(response)?.map((item: any) => Number(item?.name)));
  }

  return '';
};

export const handleResponseFromQuestionBankDetail = (response: string, type: number) => {
  const responseConvert = JSON.parse(response);

  if (type === 1) {
    return responseConvert?.[0] || '';
  }

  if (type === 2) {
    return responseConvert || [];
  }

  if (type === 3) {
    return responseConvert?.[0]?.[0] || '';
  }

  if (type === 4) {
    return handleConvertArrayToObject(
      handleConvertObjectToArray(responseConvert)?.map((item) => ({ id: getRandomNumber(), name: item }))
    );
  }

  if (type === 5) {
    return handleConvertArrayToObject(responseConvert?.map((item) => ({ id: getRandomNumber(), name: item })));
  }

  return '';
};

export const handleConvertQuestionBankDataForm = (values: any) => {
  const res = values?.questionBank?.map((item) => ({
    body: item?.body?.replace('___', '{ANSWER_1}'),
    instruction: item?.instruction,
    type: item?.type,
    choices:
      item?.type === 6 || item?.type === 3
        ? ''
        : JSON.stringify(
            handleConvertArrayToChoicesObject(item?.choices?.map((i, index) => ({ name: i?.name, index })))
          ),
    response: handleResponseDataForm(item?.response, item?.type),
  }));

  return res;
};

import { handleConvertArrayToChoicesObject, handleConvertArrayToObject, handleConvertObjectToArray } from '.';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleResponseDataForm = (response: any, type: number) => {
  if (type === 1) {
    return JSON.stringify([Number(response)]);
  }

  if (type === 2) {
    return JSON.stringify(response?.map((item) => Number(item)));
  }

  if (type === 3) {
    return JSON.stringify([handleConvertObjectToArray(response)?.map((item) => (item as any)?.name)]);
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
  const responseConvert = JSON.parse(response || '{}');

  if (type === 1) {
    return responseConvert?.[0] || '';
  }

  if (type === 2) {
    return responseConvert || [];
  }

  if (type === 3) {
    return handleConvertArrayToObject(responseConvert?.[0]?.map((item, index) => ({ id: index + 1, name: item })));
  }

  if (type === 4) {
    return handleConvertArrayToObject(
      handleConvertObjectToArray(responseConvert)?.map((item, index) => ({ id: index + 1, name: item }))
    );
  }

  if (type === 5) {
    return handleConvertArrayToObject(responseConvert?.map((item, index) => ({ id: index + 1, name: item })));
  }

  return '';
};

export const handleFormatMissingTextBeforeSubmit = (text: string) => {
  const answers = new Array(50).fill(0)?.map((_, index) => `{ANSWER_${index + 1}}`);

  const replacedTextParts = text.split('___');
  let replacedText = replacedTextParts[0];

  for (let i = 1; i < replacedTextParts.length; i += 1) {
    const answer = answers[i - 1] !== undefined ? answers[i - 1] : '___';
    replacedText += answer + replacedTextParts[i];
  }

  return replacedText;
};

export const handleConvertQuestionBankDataForm = (values: any) => {
  const res = values?.questionBank?.map((item) => ({
    body: item?.type === 3 ? handleFormatMissingTextBeforeSubmit(item?.body) : item?.body,
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

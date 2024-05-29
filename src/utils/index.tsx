import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getRandomNumber = () => Math.floor(Math.random() * 10000000) + 1;

export const handleConvertArrayToObject = (value: any) =>
  value?.reduce((a: any, v: any) => ({ ...a, [`item${v.id}`]: v }), {});

export const handleConvertAnswerArrayToObject = (value: any) =>
  value?.reduce((a: any, v: any) => ({ ...a, [`${v.id}`]: v?.answer }), {});

export const handleConvertObjectToArray = (object: any) => {
  const arr = Object.entries(object);
  return arr?.map((item) => item?.[1]);
};

export const handleConvertArrayToChoicesObject = (value: any) =>
  value?.reduce((a: any, v: any) => ({ ...a, [`${v.index}`]: v?.name }), {});

export const handleGetReplaceMessingText = (text: string) => {
  const replacedText = text.replace(/\{ANSWER_\d\}/g, '___');

  return replacedText;
};

export const handleGetQuestionAnswerData = (questions: QuestionBankType[]) => {
  const res = questions?.map((item) => {
    const answerSingle = item?.answer ? JSON.parse(item?.answer) : null;
    const answerMultiple = item?.answer ? JSON.parse(item?.answer) : null;
    const answerEssay = item?.answer ? JSON.parse(item?.answer) : null;

    if (item?.type === 1) {
      return {
        id: item?.id || 0,
        answer: answerSingle,
      };
    }

    if (item?.type === 2 || item?.type === 3 || item?.type === 4) {
      return {
        id: item?.id || 0,
        answer: answerMultiple,
      };
    }

    return {
      id: item?.id || 0,
      answer: answerEssay,
    };
  });

  return res;
};

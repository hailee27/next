import React from 'react';
import { Checkbox, Space } from 'antd';

import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';
import { handleConvertObjectToArray } from '@/utils';

interface PropsType {
  question: QuestionBankType;
  index: number;
}

const MultipleAnswerQuestion = ({ question, index }: PropsType) => {
  const choices = handleConvertObjectToArray(JSON.parse(question?.choices || '{}'));
  const choicesOptions = (choices || [])?.map((item, key) => ({ value: key + 1, label: item || '' }));

  return (
    <div>
      <p className="font-semibold mb-4">
        Question {index}: <span className="">{question?.body}</span>?
      </p>
      <Checkbox.Group>
        <Space direction="vertical">
          {choicesOptions?.map((item) => <Checkbox value={item?.value}>{item?.label as string}</Checkbox>)}
        </Space>
      </Checkbox.Group>
    </div>
  );
};

export default MultipleAnswerQuestion;

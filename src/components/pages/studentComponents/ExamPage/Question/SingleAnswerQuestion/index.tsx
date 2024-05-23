import { Radio, Space } from 'antd';
import React from 'react';

import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';
import { handleConvertObjectToArray } from '@/utils';

interface PropsType {
  question: QuestionBankType;
  index: number;
}

const SingleAnswerQuestion = ({ question, index }: PropsType) => {
  const choices = handleConvertObjectToArray(JSON.parse(question?.choices || '{}'));
  const choicesOptions = (choices || [])?.map((item, key) => ({ value: key + 1, label: item || '' }));

  return (
    <div>
      <p className="font-semibold mb-4">
        Question {index}: <span className="">{question?.body}</span>?
      </p>
      <Radio.Group>
        <Space direction="vertical">
          {choicesOptions?.map((item) => <Radio value={item?.value}>{item?.label as string}</Radio>)}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default SingleAnswerQuestion;

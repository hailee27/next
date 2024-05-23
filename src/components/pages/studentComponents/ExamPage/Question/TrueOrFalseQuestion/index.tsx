import React from 'react';
import { Radio } from 'antd';

import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';
import { handleConvertObjectToArray } from '@/utils';

interface PropsType {
  question: QuestionBankType;
  index: number;
}

const TrueOrFalseQuestion = ({ question, index }: PropsType) => {
  const choices = handleConvertObjectToArray(JSON.parse(question?.choices || '{}'));
  const choicesOptions = (choices || [])?.map((item, key) => ({ value: key + 1, label: item || '' }));

  return (
    <div>
      <p className="font-semibold mb-4">
        Question {index}: <span className="">{question?.body}</span>?
      </p>
      <div className="grid grid-cols-1 gap-y-4">
        {choicesOptions?.map((i) => (
          <div className="flex items-center gap-x-4" key={i?.value}>
            <p className="text-[12px] font-medium">{i?.label as string}</p>
            <Radio.Group
              options={[
                { value: 1, label: 'True' },
                { value: 2, label: 'false' },
              ]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrueOrFalseQuestion;

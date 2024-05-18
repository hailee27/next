/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Form, FormInstance, FormListFieldData, Radio } from 'antd';

import BasicArea from '@/components/common/forms/BasicArea';
import BasicButton from '@/components/common/forms/BasicButton';

import ChoicesComponents from '../ChoicesComponent';
import ResponseComponent from '../ResponseComponent';

interface PropsType {
  item: FormListFieldData;
  form: FormInstance<any>;
  index: number;
  setFormChange: Dispatch<SetStateAction<boolean>>;
  idEdit: number;
  remove: () => void;
}

const QuestionBankForm = ({ item, form, index, setFormChange, idEdit, remove }: PropsType) => {
  const questionTypeForm = form.getFieldValue(['questionBank', item?.name, 'type']);
  const responseForm = form.getFieldValue(['questionBank', item?.name, 'response']);

  useEffect(() => {
    if (responseForm) {
      form.setFieldValue(['questionBank', item?.name, 'response'], '');
      setFormChange((prev) => !prev);
    }
  }, [questionTypeForm]);

  return (
    <div className="border-b py-4" key={item?.key}>
      <div className="flex items-center justify-between">
        <p className="mb-3 font-bold text-[13px] uppercase">Question {Number(item?.key) + 1}</p>
        {!idEdit && (
          <BasicButton
            className="text-[12px] font-bold uppercase text-[#E11D48]"
            onClick={() => remove()}
            styleType="text"
            type="dashed"
          >
            Delete
          </BasicButton>
        )}
      </div>

      <Form.Item
        label="Question"
        name={[index, 'body']}
        rules={[{ required: true, message: 'Please input question!' }]}
      >
        <BasicArea placeholder="question" rows={4} />
      </Form.Item>

      {questionTypeForm !== 6 && questionTypeForm !== 3 && <ChoicesComponents questionKey={index} />}

      <Form.Item label="Instruction" name={[index, 'instruction']}>
        <BasicArea placeholder="instruction" rows={2} />
      </Form.Item>
      {questionTypeForm !== 6 && <ResponseComponent form={form} item={item} questionType={questionTypeForm} />}

      <Form.Item label="Type" name={[index, 'type']} rules={[{ required: true, message: 'Please choose type!' }]}>
        <Radio.Group
          disabled={!!idEdit}
          options={[
            { value: 1, label: 'Single Answer' },
            { value: 2, label: 'Multiple Answer' },
            { value: 3, label: 'Fill Missing Words' },
            { value: 4, label: 'True Of False' },
            { value: 5, label: 'Arrange' },
            { value: 6, label: 'Write An Essay' },
          ]}
        />
      </Form.Item>
    </div>
  );
};

export default QuestionBankForm;

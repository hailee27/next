/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import { Checkbox, Form, FormInstance, FormListFieldData, Input, Radio } from 'antd';

interface PropsType {
  questionType: number;
  item: FormListFieldData;
  form: FormInstance<any>;
}

const ResponseComponent = ({ questionType, item, form }: PropsType) => {
  const choicesForm = form.getFieldValue(['questionBank', item?.key, 'choices']);
  const responseForm = form.getFieldValue(['questionBank', item?.key, 'response']);
  const bodyForm = form.getFieldValue(['questionBank', item?.key, 'body']);

  const missingTextResponse = (bodyForm || '')?.split('___')?.length - 1;

  const noChoice = () => (
    <div className="mb-4">
      <p className="">Response</p>
      <p className="uppercase text-[11px] font-bold text-[#00000040] mt-2">Please add/edit choices</p>
    </div>
  );

  if (questionType === 3) {
    return (
      <div className="mb-6">
        <p className="mb-4">Response</p>
        <Form.List name={[item?.key, 'response']}>
          {() => (
            <div className="grid grid-cols-1 gap-y-4">
              {new Array(missingTextResponse)?.fill(0)?.map((_, index) => (
                <div className="flex items-center gap-x-4" key={index as number}>
                  <p className="uppercase text-[11px] font-bold text-[#AEB9C2]">Missing Word {index + 1}</p>
                  <Form.Item
                    className="mb-0"
                    label=""
                    name={[`item${index + 1}`, 'name']}
                    rules={[{ required: true, message: 'Please input response!' }]}
                  >
                    <Input placeholder="response" />
                  </Form.Item>
                </div>
              ))}
            </div>
          )}
        </Form.List>
      </div>
    );
  }

  if (questionType === 1 && typeof responseForm !== 'object') {
    if (!choicesForm) {
      return noChoice();
    }
    return (
      <Form.Item
        label="Response"
        name={[item?.key, 'response']}
        rules={[{ required: true, message: 'Please select response!' }]}
      >
        <Radio.Group
          options={(choicesForm || [])?.map((_, index) => ({ value: index + 1, label: `choice ${index + 1}` }))}
        />
      </Form.Item>
    );
  }

  if (questionType === 2 && typeof responseForm !== 'number') {
    if (!choicesForm) {
      return noChoice();
    }
    return (
      <Form.Item
        label="Response"
        name={[item?.key, 'response']}
        rules={[{ required: true, message: 'Please select response!' }]}
      >
        <Checkbox.Group
          options={(choicesForm || [])?.map((_, index) => ({ value: index + 1, label: `choice ${index + 1}` }))}
        />
      </Form.Item>
    );
  }

  if (questionType === 4) {
    if (!choicesForm) {
      return noChoice();
    }

    return (
      <div className="mb-6">
        <p className="mb-4">Response</p>
        <Form.List name={[item?.key, 'response']}>
          {() => (
            <div className="grid grid-cols-1 gap-y-4">
              {choicesForm?.map((i, index) => (
                <div className="flex items-center gap-x-4" key={i?.id}>
                  <p className="uppercase text-[11px] font-bold text-[#AEB9C2]">Choice {index + 1}</p>
                  <Form.Item
                    className="mb-0"
                    label=""
                    name={[`item${i?.id}`, 'name']}
                    rules={[{ required: true, message: 'Please input response!' }]}
                  >
                    <Radio.Group
                      options={[
                        { value: 1, label: 'True' },
                        { value: 2, label: 'false' },
                      ]}
                    />
                  </Form.Item>
                </div>
              ))}
            </div>
          )}
        </Form.List>
      </div>
    );
  }

  if (questionType === 5) {
    if (!choicesForm) {
      return noChoice();
    }

    return (
      <div className="mb-6">
        <p className="mb-4">Response</p>
        <Form.List name={[item?.key, 'response']}>
          {() => (
            <div className="grid grid-cols-1 gap-y-4">
              {choicesForm?.map((i, index) => (
                <div className="flex items-center gap-x-4" key={i?.id}>
                  <p className="uppercase text-[11px] font-bold text-[#AEB9C2]">Choice {index + 1}</p>
                  <Form.Item
                    className="mb-0"
                    label=""
                    name={[`item${i?.id}`, 'name']}
                    rules={[{ required: true, message: 'Please input response!' }]}
                  >
                    <Input placeholder="stt" />
                  </Form.Item>
                </div>
              ))}
            </div>
          )}
        </Form.List>
      </div>
    );
  }

  return '';
};

export default ResponseComponent;

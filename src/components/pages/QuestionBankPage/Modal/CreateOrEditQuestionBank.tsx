/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Form, message, Modal, Spin } from 'antd';

import {
  PostQuestionBankResponse,
  useLazyGetDetailQuestionBankQuery,
  usePostQuestionBankMutation,
  usePutQuestionBankMutation,
} from '@/redux/endpoints/questionBank';
import BasicButton from '@/components/common/forms/BasicButton';
import { getRandomNumber, handleConvertObjectToArray } from '@/utils';
import { handleConvertQuestionBankDataForm, handleResponseFromQuestionBankDetail } from '@/utils/questionBank';

import QuestionBankForm from '../form/QuestionBankForm';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  getList: () => void;
  idEdit: number;
}

const questionExample = {
  parentId: 0,
  isParent: true,
  body: '',
  choices: '',
  instruction: '',
  response: '',
  type: 1,
};

const CreateOrEditQuestionBank = ({ openModal, setOpenModal, getList, idEdit }: PropsType) => {
  const [form] = Form.useForm();
  const [postQuestionBank, { isLoading }] = usePostQuestionBankMutation();
  const [putQuestionBank, { isLoading: isLoadingUpdate }] = usePutQuestionBankMutation();
  const [getDetail, { data, isFetching }] = useLazyGetDetailQuestionBankQuery();
  const [formChange, setFormChange] = useState(false);

  useEffect(() => {
    if (idEdit) {
      getDetail({ id: idEdit });
    }
  }, [idEdit]);

  useEffect(() => {
    const questionDetail = data?.result;
    if (questionDetail?.id) {
      form.setFieldValue('questionBank', [
        {
          body: questionDetail?.body,
          instruction: questionDetail?.instruction,
          type: questionDetail?.type,
          choices:
            questionDetail?.type === 3 || questionDetail?.type === 6
              ? ''
              : handleConvertObjectToArray(JSON.parse(questionDetail?.choices || '{}'))?.map((item) => ({
                  name: item,
                  id: getRandomNumber(),
                })),
          response: handleResponseFromQuestionBankDetail(questionDetail?.response, questionDetail?.type),
        },
      ]);
    }
  }, [data]);

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  return (
    <Spin spinning={isFetching || isLoading || isLoadingUpdate}>
      <Modal
        footer={null}
        onCancel={handleCancel}
        open={openModal}
        title={idEdit ? 'Update Question Information' : 'Create Question Bank'}
        width={1000}
      >
        <Form
          autoComplete="off"
          form={form}
          layout="vertical"
          name="class"
          onChange={() => {
            setFormChange(!formChange);
          }}
          onFinish={(values) => {
            const submitData = handleConvertQuestionBankDataForm(values);

            if (idEdit) {
              putQuestionBank({ ...submitData?.[0], id: idEdit }).then((res) => {
                if ((res as unknown as PostQuestionBankResponse)?.data?.status) {
                  message.success('Cập nhật thông tin câu hỏi thành công');
                  handleCancel();
                  getList();
                } else {
                  message.error((res as unknown as { error: PostQuestionBankResponse })?.error?.data?.message);
                }
              });
            } else {
              postQuestionBank({ questions: submitData }).then((res) => {
                if ((res as unknown as PostQuestionBankResponse)?.data?.status) {
                  message.success('Tạo mới danh sách câu hỏi thành công');
                  handleCancel();
                  getList();
                } else {
                  message.error((res as unknown as { error: PostQuestionBankResponse })?.error?.data?.message);
                }
              });
            }
          }}
        >
          <Form.List name="questionBank">
            {(fields, { add, remove }) => (
              <>
                {!idEdit && (
                  <div className="flex justify-end">
                    <BasicButton
                      className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
                      onClick={() => add({ ...questionExample, id: getRandomNumber() })}
                      role="presentation"
                      styleType="rounded"
                    >
                      Add Question
                    </BasicButton>
                  </div>
                )}
                {fields?.map((item, index) => (
                  <QuestionBankForm
                    form={form}
                    idEdit={idEdit}
                    index={index}
                    item={item}
                    remove={() => {
                      remove(item?.name);
                    }}
                    setFormChange={setFormChange}
                  />
                ))}
                {fields?.length === 0 && (
                  <div className="bg-[#fff] p-2 my-2">
                    <div className="text-center text-[#00000040]">No data</div>
                  </div>
                )}
              </>
            )}
          </Form.List>

          <div className="gap-x-3 flex items-center justify-end mt-2">
            <BasicButton onClick={() => handleCancel()} styleType="rounded">
              Cancel
            </BasicButton>
            <BasicButton
              className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
              htmlType="submit"
              styleType="rounded"
            >
              Save
            </BasicButton>
          </div>
        </Form>
      </Modal>
    </Spin>
  );
};

export default CreateOrEditQuestionBank;

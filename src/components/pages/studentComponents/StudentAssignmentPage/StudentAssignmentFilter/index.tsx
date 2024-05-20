import React from 'react';
import { DatePicker, Form, Input, Select } from 'antd';

import BasicButton from '@/components/common/forms/BasicButton';
import { StudentGetListAssignmentParams } from '@/redux/endpoints/student/class';
import BasicStudentSelectClass from '@/components/common/BasicStudentSelectClass';

interface PropsType {
  onSubmit: (v: StudentGetListAssignmentParams) => void;
  additionalButtons?: JSX.Element | JSX.Element[];
}

const StudentAssignmentFilter = ({ onSubmit, additionalButtons }: PropsType) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    form.submit();
  };

  return (
    <div className="border p-4 bg-[#fff] shadow-md rounded">
      <Form className="space-y-[16px]" form={form} onFinish={onSubmit}>
        <div className="grid grid-cols-4 gap-6">
          <Form.Item name="class" noStyle>
            <BasicStudentSelectClass className="flex-1 h-10" placeholder="Class" />
          </Form.Item>

          <Form.Item name="status" noStyle>
            <Select
              className="flex-1 h-10"
              options={[
                {
                  value: 1,
                  label: 'Active',
                },
                {
                  value: 2,
                  label: 'Expired',
                },
                {
                  value: 3,
                  label: 'Complete',
                },
              ]}
              placeholder="Status"
            />
          </Form.Item>

          <Form.Item name="search" noStyle>
            <Input className="flex-1 h-10" placeholder="Name" />
          </Form.Item>

          <Form.Item name="createdAt" noStyle>
            <DatePicker placeholder="Created At" />
          </Form.Item>
        </div>

        <div className="flex items-center justify-between !mt-4">
          <div className="space-x-[16px]">{additionalButtons}</div>
          <div className="flex items-center gap-x-3">
            <BasicButton className="font-[700]" onClick={onReset} styleType="link">
              Reset
            </BasicButton>
            <BasicButton className="text-[13px] font-[700]" htmlType="submit" styleType="rounded">
              Search
            </BasicButton>
          </div>
        </div>

        <div className="uppercase text-[11px] font-bold text-[#80888F]">
          Please select a class and status to view assignment list
        </div>
      </Form>
    </div>
  );
};

StudentAssignmentFilter.defaultProps = {
  additionalButtons: undefined,
};

export default StudentAssignmentFilter;

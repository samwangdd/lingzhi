import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Form, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import ProFields from '@/ProFields';

interface Props {
  columns: any;
  title: string;
  onSubmit: (values: any) => void;
  onSuccess?: () => void;
  record?: any;
  editData?: any;
}

export interface BaseModelRef {
  toggleVisible: () => void;
  form: FormInstance<any>;
}

const BaseModel = (props: Props, ref) => {
  const { onSuccess, record, columns, title, onSubmit } = props;
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();
  const toggle = () => {
    setVisible(!visible);
    if (!visible) form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(record);
  }, [record, form]);

  useImperativeHandle(ref, () => ({ toggleVisible: toggle, form: form }));

  const onOk = async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    const raw = { ...record, ...value };
    onSubmit && onSubmit(raw);
    onSuccess && onSuccess();
  };

  return (
    <Modal forceRender visible={visible} onOk={onOk} onCancel={toggle} title={title}>
      <Form form={form} labelCol={{ span: 6 }}>
        <ProFields columns={columns} wrapConfig={{ span: 20 }} />
      </Form>
    </Modal>
  );
};

export default forwardRef(BaseModel);

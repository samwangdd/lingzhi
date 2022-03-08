import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { awaitTo } from '@/utils/index';
import { changeProps, deleteProps } from '../../utils';
import styles from './index.module.scss';

const DTreeNodeEditing = ({ node, changeData, treeData, onSubmit }) => {
  const [value, setValue] = useState(node.title);

  const onOk = async (e) => {
    e.stopPropagation(); // 阻止冒泡
    const [err, data] = await awaitTo<any>(onSubmit && onSubmit({ ...node, title: value }));
    if (!err) {
      const raw = changeProps(treeData, node.key, { ...data, title: value, isEditing: false });
      changeData(raw);
      message.success('操作成功');
    }
  };

  const onCancel = (e) => {
    e.stopPropagation();
    const raw = node.isTemporary
      ? deleteProps(treeData, node.key)
      : changeProps(treeData, node.key, { isEditing: false });
    changeData(raw);
  };

  const onChange = (e) => {
    e.stopPropagation();
    setValue(e.target.value);
  };

  const onClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles['tree-node-editing-wrapper']}>
      <Input value={value} onChange={onChange} onClick={onClick} />
      <Button
        size="small"
        type="link"
        icon={<CheckOutlined style={{ color: 'green' }} />}
        onClick={onOk}
      />
      <Button size="small" type="link" icon={<CloseOutlined />} onClick={onCancel} />
    </div>
  );
};

export default DTreeNodeEditing;

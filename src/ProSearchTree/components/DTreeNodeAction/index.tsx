import React from 'react';
import { Button, message, Modal } from 'antd';
import {
  SisternodeOutlined,
  SubnodeOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import cn from 'classnames';
import { v4 as uuidV4 } from 'uuid';
import { awaitTo } from '@/utils/index';
import { changeProps, deleteProps, getParentKey, insertChild, insertObj } from '../../utils';
import styles from '../DTreeNode/index.module.scss?module';
import { useCount } from '../../expandedKeysContext';

const DTreeNodeAction = ({ node, changeData, treeData, operate, setOperateType }) => {
  // 将节点改为编辑态
  const editTitle = (e) => {
    e.stopPropagation(); // 阻止冒泡
    setOperateType('update');
    const raw = changeProps(treeData, node.key, { isEditing: true });
    changeData(raw);
  };

  // 添加同级节点
  const addSisternode = (e) => {
    e.stopPropagation(); // 阻止冒泡
    setOperateType('addSister');
    let suffix = node.children?.length || 0; // 获取同级节点数
    let gKey = `${node.key}-${suffix}`;
    const pKey = getParentKey(gKey, treeData) || '0';
    // 检测构造的 key 是否存在（父节点），若存在则重新构造 key
    while (pKey) {
      suffix++;
      gKey = `${pKey}-${suffix}`;
      break;
    }
    const data = insertObj(treeData, node.key, {
      id: uuidV4(),
      key: gKey,
      title: undefined,
      isEditing: true,
      isTemporary: true, // 临时数据，取消「新增」时会删除
    });

    changeData(data);
  };
  const { dispatch } = useCount();

  // 添加子节点
  const addSubnode = (e) => {
    e.stopPropagation(); // 阻止冒泡
    dispatch({ type: 'addKeys', payload: [node.key] }); // 展开当前节点
    setOperateType('addSub');
    let suffix = node.children?.length || 0; // 获取同级节点数
    let gKey = `${node.key}-${suffix}`;
    const pKey = getParentKey(gKey, treeData);
    // 检测构造的 key 是否存在（父节点），若存在则重新构造 key
    while (pKey) {
      suffix++;
      gKey = `${pKey}-${suffix}`;
      break;
    }
    const data = insertChild(treeData, node.key, {
      id: uuidV4(),
      parentId: node.id, // TODO: 要是用户没有 parentId，如何自定义？
      key: gKey,
      title: undefined,
      isEditing: true,
      isTemporary: true,
    });
    changeData(data);
  };

  // 删除节点
  const deleteGroup = (e) => {
    e.stopPropagation(); // 阻止冒泡
    setOperateType('delete');
    Modal.confirm({
      title: '确认删除？',
      icon: <ExclamationCircleOutlined />,
      content: '该节点删除后无法恢复',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const onSubmit = operate.filter((o) => o.action === 'delete')[0]?.onSubmit;
        const [err] = await awaitTo(onSubmit && onSubmit(node));
        if (!err) {
          const raw = deleteProps(treeData, node.key);
          changeData(raw);
          message.success('操作成功');
        }
      },
    });
  };

  return (
    <div className={cn(styles['d-tree-node-actions'], 'pl-8')}>
      {operate?.map((o) => {
        switch (o.action) {
          case 'update':
            return (
              <Button
                size="small"
                type="link"
                icon={<EditOutlined style={{ color: 'gray' }} />}
                onClick={editTitle}
              />
            );
          case 'delete':
            return (
              <Button
                size="small"
                type="link"
                icon={<DeleteOutlined style={{ color: 'gray' }} />}
                onClick={deleteGroup}
              />
            );
          case 'addSub':
            return (
              <Button
                size="small"
                type="link"
                icon={<SubnodeOutlined style={{ color: 'gray' }} />}
                onClick={addSubnode}
              />
            );
          case 'addSister':
            return (
              <Button
                size="small"
                type="link"
                icon={<SisternodeOutlined style={{ color: 'gray' }} />}
                onClick={addSisternode}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default DTreeNodeAction;

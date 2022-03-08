import React from 'react';
import DTreeNodeAction from '../DTreeNodeAction';
import DTreeNodeEditing from '../DTreeNodeEditing';
import styles from './index.less';

// FIXME: 组件设计的不够优雅，需要重构
// 比如 operateType 状态管理有点混乱
// DTreeNodeEditing 与 DTreeNodeAction 组件应该合并， 目前增、改在 DTreeNodeEditing 中，删除在 DTreeNodeAction 中
const DTreeNode = ({
  node,
  searchValue,
  changeData,
  treeData,
  operate,
  setOperateType,
  operateType,
}) => {
  const { title } = node;
  const index = (title as string)?.indexOf(searchValue);
  const beforeStr = (title as string)?.substr(0, index);
  const afterStr = (title as string)?.substr(index + searchValue.length);

  const jointText =
    index > -1 ? (
      <span>
        {beforeStr}
        <span className={styles['filter-value']}>{searchValue}</span>
        {afterStr}
      </span>
    ) : (
      <span>{title}</span>
    );

  return (
    <div className={styles['d-tree-node']}>
      {node?.isEditing ? (
        <DTreeNodeEditing
          node={node}
          changeData={changeData}
          treeData={treeData}
          onSubmit={
            operate.filter((i) => {
              return i.action === operateType;
            })[0]?.onSubmit
          }
        />
      ) : (
        <div className={styles['title']}>
          {jointText}
          {!node.isOperate ? (
            <span></span>
          ) : (
            <DTreeNodeAction
              node={node}
              changeData={changeData}
              treeData={treeData}
              operate={operate}
              setOperateType={setOperateType}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DTreeNode;

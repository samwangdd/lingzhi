import React, { Key, useCallback, useEffect, useState } from 'react';
import { Tree, Input, Alert } from 'antd';
import { DataNode } from 'antd/lib/tree';
import cloneDeepWith from 'lodash/cloneDeepWith';
import { getParentKey, matchString } from './utils';
import DTreeNode from './components/DTreeNode';

const { ErrorBoundary } = Alert;

export type Action = 'addSister' | 'addSub' | 'update' | 'delete';
interface OperateProps {
  action: Action;
  onSubmit: (values) => Promise<any>;
}
interface SearchTreeProps {
  data: DataNode[];
  onSelect: (keys: Key[], info: any) => void;
  operate: OperateProps[];
  maxLevel?: number;
}

const SearchTree = (props: SearchTreeProps) => {
  const { data, onSelect, operate } = props;
  const _dataClone = cloneDeepWith(data);
  const [dataClone, setDataClone] = useState(_dataClone);
  // FIXME: 属性层级传递过多
  const [operateType, setOperateType] = React.useState<Action | undefined>();
  const [expandedKeys, setExpandedKeys] = React.useState<string[]>([]);

  useEffect(() => {
    setDataClone(_dataClone);
    setExpandedKeys([_dataClone[0]?.key]);
  }, [data]);

  const [searchValue, setSearchValue] = React.useState('');
  const [autoExpandParent, setAutoExpandParent] = React.useState(true);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e) => {
    const value = e.target.value;
    // FIXME: expandedKeys 索引不正确
    const expandedKeys = matchString(value, dataClone)
      .map((item) => getParentKey(item, dataClone))
      .filter((item, i, self) => {
        return item && self.indexOf(item) === i;
      });

    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const loop = useCallback(
    (_data) =>
      _data?.map((item) => {
        const title = (
          <DTreeNode
            node={item}
            searchValue={searchValue}
            changeData={setDataClone}
            treeData={dataClone}
            operate={operate}
            operateType={operateType}
            setOperateType={setOperateType}
          />
        );

        if (item.children) {
          return { ...item, title, children: loop(item.children) };
        }

        return {
          ...item,
          title,
        };
      }),
    [dataClone, searchValue]
  );

  return (
    <ErrorBoundary>
      <div>
        <Input style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
        <Tree
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={loop(dataClone)}
          onSelect={onSelect}
        />
      </div>
    </ErrorBoundary>
  );
};

export default SearchTree;

import cloneDeep from 'lodash/cloneDeep';
import isPlainObject from 'lodash/isPlainObject';

// 已有对象添加属性
export const addProps = (props) => (obj) => {
  if (isPlainObject(obj)) {
    if (obj.children) {
      Object.entries(props).forEach(([key, value]) => {
        obj[key] = value;
      });
      return addProps(props)(obj.children);
    }
    return { ...obj, ...props };
  }
};

// 改变对象属性
export const changeProps = (data, key, props) => {
  const dataClone = cloneDeep(data);

  for (let i = 0; i < dataClone.length; i++) {
    const item = dataClone[i];

    if (item.key === key) {
      Object.entries(props).forEach(([k, v]) => {
        item[k] = v;
      });
    } else if (item.children) {
      item.children = changeProps(item.children, key, props);
    }
  }
  return dataClone;
};

export const deleteProps = (data, key) => {
  const dataClone = cloneDeep(data);
  for (let i = 0; i < dataClone.length; i++) {
    const item = dataClone[i];
    if (item.key === key) {
      dataClone.splice(i, 1);
      break; // 删除后跳出循环
    } else if (item.children) {
      item.children = deleteProps(item.children, key);
    }
  }
  return dataClone;
};

// 插入对象
export const insertObj = (arr, key, props) => {
  const dataClone = cloneDeep(arr);

  for (let i = 0; i < dataClone.length; i++) {
    const item = dataClone[i];
    if (item.key === key) {
      dataClone.splice(i + 1, 0, props);
      break;
    } else if (item.children) {
      item.children = insertObj(item.children, key, props);
    }
  }

  return dataClone;
};

// 插入 children 子节点
export const insertChild = (arr, key, props) => {
  const _data = cloneDeep(arr);
  for (let i = 0; i < _data.length; i++) {
    const node = _data[i];
    if (node.key === key) {
      if (node.children) {
        node.children.push(props);
        break;
      } else {
        node.children = [props];
        break;
      }
    } else if (node.children) {
      node.children = insertChild(node.children, key, props);
    }
  }
  return _data;
};

// 获取父节点
export const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

// （通过 key）获取 id
export const getId = (key, tree) => {
  let id;
  for (let i = 0; i < tree.length; i++) {
    const element = tree[i];
    if (element.key === key) {
      id = element.id;
      break;
    } else if (element.children) {
      id = getId(key, element.children);
    }
  }
  return id;
};

// 匹配关键字，用于搜索
export const matchString = (str, tree, _list?) => {
  let list: string[] = _list || [];
  for (let i = 0; i < tree.length; i++) {
    const element = tree[i];
    if (element.title.indexOf(str) > -1) {
      list.push(element.key);
    } else if (element.children) {
      matchString(str, element.children, list);
    }
  }
  return list;
};

// 获取同级节点个数
export const getSisterLen = (key, tree) => {
  let sisterLen = 0;

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.key === key) {
      sisterLen = tree.length;
      break;
    } else if (node.children) {
      sisterLen = getSisterLen(key, node.children);
    }
  }
  return sisterLen;
};

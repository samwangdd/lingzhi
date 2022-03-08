import React, { ReactChild } from 'react';
import { Col, Form, Input, Select } from 'antd';
import { ColumnType, TableProps } from 'antd/lib/table';
import { ColProps } from 'antd/lib/grid';
import { replaceKeys } from '@/utils';

export interface IColumn extends ColumnType<any>, TableProps<any> {
  title: any;
  component?: string | React.ReactNode;
  config?: { [key: string]: any }; // 属性配置，用于 component 上
  hideInSearch?: boolean;
  valueEnum?: { key: string; value: string | number }[];
  rules?: { [key: string]: string | boolean | RegExp }[];
}

export interface RenderFieldsProps {
  columns: IColumn[];
  wrapConfig?: ColProps; // 包装（布局）组件属性
}

const RenderFields: React.FC<RenderFieldsProps> = (props) => {
  const { columns, wrapConfig = { span: 6 }, children } = props;
  const _children: ReactChild[] = children ? [children as ReactChild] : [];

  const filter = columns?.filter((item) => !Boolean(item.hideInSearch));

  for (let i = 0; i < filter.length; i++) {
    const { title: label, dataIndex: name, component: Comp, config, valueEnum, rules } = filter[i];

    _children.push(
      <Col key={i} {...wrapConfig}>
        <Form.Item name={name} label={label} rules={rules}>
          {!Comp ? (
            <Input />
          ) : typeof Comp === 'string' ? (
            <Component type={Comp} valueEnum={valueEnum} {...config}></Component>
          ) : (
            Comp
          )}
        </Form.Item>
      </Col>,
    );
  }

  return <>{_children}</>;
};

const Component = ({ type, valueEnum, ...config }) => {
  switch (type) {
    case 'Select':
      const raw = replaceKeys(valueEnum, { key: 'name' });
      return (
        <Select {...config}>
          {raw?.map((o: { value: string; name: string }) => (
            <Select.Option {...o} value={o.value} key={o.value}>
              {o.name}
            </Select.Option>
          ))}
        </Select>
      );
    default:
      return <Input />;
  }
};

export default RenderFields;

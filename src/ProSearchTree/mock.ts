export const data = {
  id: 1,
  title: '医联',
  parentId: 0,
  key: '0',
  children: [
    {
      id: 8,
      title: '医生服务部',
      parentId: 1,
      key: '0-2',
      children: [
        {
          id: 19,
          title: '医生运营',
          parentId: 8,
          key: '0-2-0',
          children: [
            {
              id: 23,
              title: '运营a',
              parentId: 19,
              key: '0-2-0-0',
              children: null,
            },
            {
              id: 25,
              title: '运营c',
              parentId: 19,
              key: '0-2-0-2',
              children: null,
            },
            {
              id: 26,
              title: 'yyD',
              parentId: 19,
              key: '0-2-0-3',
              children: null,
            },
            {
              id: 27,
              title: 'yyF',
              parentId: 19,
              key: '0-2-0-4',
              children: null,
            },
            {
              id: 28,
              title: 'asd',
              parentId: 19,
              key: '0-2-0-5',
              children: null,
            },
            {
              id: 29,
              title: '123',
              parentId: 19,
              key: '0-2-0-6',
              children: null,
            },
            {
              id: 30,
              title: '666',
              parentId: 19,
              key: '0-2-0-7',
              children: null,
            },
          ],
        },
        {
          id: 32,
          title: '老APP',
          parentId: 8,
          key: '0-2-1',
          children: null,
        },
      ],
    },
    {
      id: 3,
      title: '子节点2',
      parentId: 1,
      key: '0-3',
      children: [
        {
          id: 5,
          title: '技术工程部',
          parentId: 3,
          key: '0-3-1',
          children: [
            {
              id: 17,
              title: '工程组',
              parentId: 5,
              key: '0-3-1-0',
              children: null,
            },
            {
              id: 22,
              title: '商务部',
              parentId: 5,
              key: '0-3-1-1',
              children: null,
            },
            {
              id: 31,
              title: '运维组',
              parentId: 5,
              key: '0-3-1-2',
              children: null,
            },
          ],
        },
      ],
    },
  ],
};

const treeData = [
  {
    id: 1,
    title: 'Root',
    parentId: 0,
    key: '0',
    children: [
      {
        id: 8,
        title: 'Sale',
        parentId: 1,
        key: '0-2',
        children: [
          {
            id: 19,
            title: 'Marketing',
            parentId: 8,
            key: '0-2-0',
            children: null,
          },
        ],
      },
      {
        id: 3,
        title: 'Dev',
        parentId: 1,
        key: '0-3',
        children: [
          {
            id: 5,
            title: 'DevOps',
            parentId: 3,
            key: '0-3-1',
            children: [
              {
                id: 17,
                title: 'DevOps-1',
                parentId: 5,
                key: '0-3-1-0',
                children: null,
              },
            ],
          },
        ],
      },
    ],
  },
];

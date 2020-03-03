export default () => [
  {
    title: 'Name', // translate
    name: 'name',
    searchItem: {
      group: '1',
    },
  },
  {
    title: 'Role',// translate
    name: 'role',
    dict: [
      {code: '1', codeName: 'Administrator'},// translate
      {code: '2', codeName: 'Edit'},// translate
      {code: '3', codeName: 'Tourist'},// translate
    ],
    searchItem: {
      type: 'select',
      group: '1',
    }
  },
  {
    title: 'Birthday',// translate
    name: 'birthday',
    searchItem: {
      type: 'date',
      width: 120,
    }
  }
];

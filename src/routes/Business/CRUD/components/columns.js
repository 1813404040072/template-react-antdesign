import React from 'react';
import intl from 'react-intl-universal';

import DataTable from '../../../../components/DataTable';
import Icon from '../../../../components/Icon';
import Button from '../../../../components/Button';
import messages from '../messages';

export default (self, employees) => [

  {
    title: intl.formatMessage(messages.companyName),
    name: 'deptName',
    tableItem: {},
    searchItem: {
      group: 'abc'
    },
    formItem: {}
  },
  {
    title: intl.formatMessage(messages.distribution),
    name: 'distributionNetwork',
    dict: [
      { code: '0', codeName: intl.formatMessage(messages.city) },
      { code: '1', codeName: intl.formatMessage(messages.rural) }],
    tableItem: {},
    formItem: {
      type: 'select'
    },
    searchItem: {
      type: 'select'
    }
  },
  {
    title: intl.formatMessage(messages.jobLocation),
    name: 'address',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: intl.formatMessage(messages.jobType),
    name: 'type',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: intl.formatMessage(messages.startingTime),
    name: 'planBeginTime',
    tableItem: {},
    formItem: {
      type: 'datetime'
    },
    searchItem: {
      type: 'datetime'
    }
  },
  {
    title: intl.formatMessage(messages.completionTime),
    name: 'planEndTime',
    tableItem: {},
    formItem: {
      type: 'datetime'
    },
    searchItem: {
      type: 'datetime'
    }
  },
  {
    title: intl.formatMessage(messages.arrivalStaff),
    name: 'workEmployee',
    tableItem: {
      render: text => text.map(item => item.title).join(',')
    },
    formItem: {
      type: 'transfer',
      modal: true,
      dataSource: employees,
      normalize: value => value.map(item => item.key)
    }
  },
  {
    title: intl.formatMessage(messages.contentsHomework),
    name: 'content',
    formItem: {
      type: 'editor'
    }
  },
  {
    title: intl.formatMessage(messages.operating),
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip="Edit" onClick={() => self.onUpdate(record)}>
            <Icon type="edit" />
          </Button>
          <Button tooltip="Delete" onClick={() => self.onDelete(record)}>
            <Icon type="trash" />
          </Button>
        </DataTable.Oper>
      )
    }
  }
];

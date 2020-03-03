import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Modal } from 'antd';
import intl from 'react-intl-universal';
import $$ from 'cmn-utils/lib';

import messages from '../messages';
import BaseComponent from '../../../../components/BaseComponent';
import Toolbar from '../../../../components/Toolbar';
import SearchBar from '../../../../components/SearchBar';
import DataTable from '../../../../components/DataTable';
import { ModalForm } from '../../../../components/Modal';
import createColumns from './columns';
import './index.less';
const { Content, Header, Footer } = Layout;
const {Pagination} = DataTable;

@connect(({ crud, loading }) => ({
  crud,
  loading: loading.models.crud
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    rows: []
  };

  handleAdd() {}

  handleUpdate() {}

  handleDelete = records => {
    const { rows } = this.state;
    const { dispatch } = this.props;

    dispatch({
      type: 'crud/remove',
      payload: {
        records,
        success: () => {
          this.setState({
            rows: rows.filter(
              item => !records.some(jtem => jtem.rowKey === item.rowKey)
            )
          });
        }
      }
    });
  };

  onDelete = record => {
    if (!record) return;
    if ($$.isArray(record) && !record.length) return;

    const content = `Do you want to delete this ${
      $$.isArray(record) ? record.length : ''}item?`;

    Modal.confirm({
      title: intl.formatMessage(messages.noticeC),
      content,
      onOk: () => {
        this.handleDelete($$.isArray(record) ? record : [record]);
      },
      onCancel() {}
    });
  };

  onAdd = () => {
    this.setState({
      record: null,
      visible: true
    });
  };

  onUpdate = record => {
    this.setState({
      record,
      visible: true
    });
  };

  render() {
    const { crud, loading, dispatch } = this.props;
    const { pageData, employees } = crud;
    const columns = createColumns(this, employees);
    const { rows, record, visible } = this.state;

    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'crud/getPageInfo',
          payload: {
            pageData: pageData.filter(values).jumpPage(1, 10)
          }
        });
      }
    };

    const dataTableProps = {
      loading,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      selectType: 'checkbox',
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'crud/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        });
      },
      onSelect: (keys, items) => this.setState({ rows: items })
    };

    const modalFormProps = {
      loading,
      record,
      visible,
      columns,
      modalOpts: {
        width: 700
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        });
      },

      onSubmit: values => {
        dispatch({
          type: 'crud/save',
          payload: {
            values,
            success: () => {
              this.setState({
                record: null,
                visible: false
              });
            }
          }
        });
      }
    };

    return (
      <Layout className="full-layout crud-page">
        <Header>
          <Toolbar
            appendLeft={
              <Button.Group>
                <Button type="primary" icon="plus" onClick={this.onAdd}>
                  {intl.formatMessage(messages.new)}
                </Button>
                <Button
                  disabled={!rows.length}
                  onClick={() => this.handleDelete(rows)}
                  icon="delete"
                >
                  {intl.formatMessage(messages.delete)}
                </Button>
              </Button.Group>
            }
            pullDown={<SearchBar type="grid" {...searchBarProps} />}
          >
            <SearchBar group="abc" {...searchBarProps} />
          </Toolbar>
        </Header>
        <Content>
          <DataTable {...dataTableProps} />
        </Content>
        <Footer>
          <Pagination {...dataTableProps} />
        </Footer>
        <ModalForm {...modalFormProps} />
      </Layout>
    );
  }
}

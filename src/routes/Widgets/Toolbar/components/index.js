import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Icon } from 'antd';
import intl from 'react-intl-universal';
import BaseComponent from '../../../../components/BaseComponent';
import Panel from '../../../../components/Panel';
import Toolbar from '../../../../components/Toolbar';
import SearchBar from '../../../../components/SearchBar';
import createColumns from './columns';
import messagesCrud from '../../../Business/CRUD/messages';
import './index.less';
const { Content } = Layout;

/**
 * Toolbar
 */
@connect()
export default class extends BaseComponent {
  render() {
    const columns = createColumns(this);

    const searchBarProps = {
      columns,
      onSearch: (values) => {
        console.log(values)
      }
    };

    return (
      <Layout className="full-layout page toolbar-page">
        <Content>
          <Panel title="Basic usage">
            <Toolbar
              className="toolbar-demo"
              appendLeft={
                <Button.Group>
                  <Button type="primary"><Icon type="plus" />{intl.formatMessage(messagesCrud.new)}</Button>
                  <Button><Icon type="delete" />{intl.formatMessage(messagesCrud.delete)}</Button>
                </Button.Group>
              }
            />
          </Panel>
          <Panel title="Combine SearchBar">
            <Toolbar
              className="toolbar-demo"
              appendLeft={
                <Button.Group>
                  <Button type="primary"><Icon type="plus" />{intl.formatMessage(messagesCrud.new)}</Button>
                  <Button><Icon type="delete" />{intl.formatMessage(messagesCrud.delete)}</Button>
                </Button.Group>
              }
            >
              <SearchBar {...searchBarProps} />
            </Toolbar>
          </Panel>
          <Panel title="Combine SearchBar and drop down to show more">
            <Toolbar
              className="toolbar-demo"
              appendLeft={
                <Button.Group>
                  <Button type="primary"><Icon type="plus" />{intl.formatMessage(messagesCrud.new)}</Button>
                  <Button><Icon type="delete" />{intl.formatMessage(messagesCrud.delete)}</Button>
                </Button.Group>
              }
              pullDown={
                <SearchBar type="grid" {...searchBarProps} />
              }
            >
              <SearchBar {...searchBarProps} group='1' />
            </Toolbar>
          </Panel>
        </Content>
      </Layout>
    );
  }
}

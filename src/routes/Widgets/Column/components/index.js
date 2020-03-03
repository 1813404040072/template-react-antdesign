import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Form } from 'antd';
import intl from 'react-intl-universal';

import { routerLinks } from "../../../constant";
import BaseComponent from '../../../../components/BaseComponent';
import Panel from '../../../../components/Panel';
import messages from '../messages';
import messagesBaseComponent from '../../BaseComponent/messages';
const { Content } = Layout;

@connect()
class Columns extends BaseComponent {
  render() {
    const { match } = this.props;
    return (
      <Layout className="full-layout page column-page">
        <Content>
          <Panel title={intl.formatMessage(messagesBaseComponent.description)}>
            <h3>{intl.formatMessage(messages.columnSyntax)}</h3>
            <p>
              {intl.formatMessage(messages.columnText)}
              <a
                style={{ textDecoration: 'underline', }}
                href="https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/columns.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage(messages.columnConfiguration)}
              </a>
            </p>
            <Button
              icon="bulb"
              type="primary"
              onClick={() => this.history.push(routerLinks['BusinessCRUD'].replace(routerLinks['TypeRouter'], `/${match.params.type}/`))}
            >
              {intl.formatMessage(messages.columnCRUD)}
            </Button>
          </Panel>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(Columns);

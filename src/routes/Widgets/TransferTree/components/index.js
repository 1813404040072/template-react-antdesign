import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col } from 'antd';
import $$ from 'cmn-utils';
import BaseComponent from '../../../../components/BaseComponent';
import Panel from '../../../../components/Panel';
import TransferTree from '../../../../components/TransferTree';
const { Content } = Layout;

@connect(({ transferTree, loading }) => ({
  transferTree,
  loading: loading.models.transferTree
}))
export default class extends BaseComponent {
  onLoadData = treeNode => {
    const { transferTree, dispatch } = this.props;
    const { asyncDataSource } = transferTree;
    return new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
        return asyncDataSource;
      }
      return dispatch({
        type: 'transferTree/@request',
        afterResponse: ({ data }) => {
          const temp = { ...treeNode };
          temp.props.dataRef.children = data;
          resolve(temp);
          return asyncDataSource;
        },
        payload: {
          valueField: 'asyncDataSource',
          url: '/tree/getAsyncData',
          data: treeNode.props.eventKey
        }
      });
    });
  };

  onAsyncSearch = searchText => $$.post('/tree/getAsyncSearchData', {search: searchText}).then(({data}) => data)

  render() {
    const { transferTree } = this.props;
    const { dataSource, asyncDataSource } = transferTree;
    const { loading } = this.props;
    return (
      <Layout className="full-layout page transfer-tree-page">
        <Content>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title= "Miniature tree type">
                <TransferTree dataSource={dataSource} loading={loading} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title= "Asynchronous tree shrink frame" >
                <TransferTree
                  dataSource={asyncDataSource}
                  loadData={this.onLoadData}
                  asyncSearch={this.onAsyncSearch}
                  loading={loading}
                  showSearch
                />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title= "Default targetNodes">
                <TransferTree
                  dataSource={dataSource}
                  loading={loading}
                  targetNodes={[
                    { key: '341522', title: 'Huoqiu County' },
                    { key: '340506', title: 'Bowang District' },
                  ]}
                  showSearch
                />
              </Panel>
            </Col>
            <Col span={12} />
          </Row>
        </Content>
      </Layout>
    );
  }
}

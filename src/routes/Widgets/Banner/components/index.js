import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from '../../../../components/BaseComponent';
import BannerMng from '../../../../components/BannerMng';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  state = {
    dataSource: [
      { title: '1', link: '/abc', file: 'https://placeimg.com/640/480/animals' },
      { title: '2', link: '/abd', file: 'https://placeimg.com/640/480/arch' },
      { title: '3', link: '/abe', file: 'https://placeimg.com/640/480/nature' },
      { title: '4', link: '/abf', file: 'https://placeimg.com/640/480/people' },
    ],
  };

  onChange = datas => {
    console.log(datas);
  };

  render() {
    const { dataSource } = this.state;
    return (
      <Layout className="full-layout page banner-page">
        <Content>
          <BannerMng dataSource={dataSource} onChange={this.onChange} />
          <br />
          <BannerMng onChange={this.onChange} />
        </Content>
      </Layout>
    );
  }
}

import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Button } from 'antd';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import intl from 'react-intl-universal';
import messages from '../messages';
import messagesPrint from '../../../../components/Print/messages';
import messagesBaseComponent from '../../BaseComponent/messages';
import BaseComponent from '../../../../components/BaseComponent';
import Panel from '../../../../components/Panel';
import Print from '../../../../components/Print';
import EC from '../../../../components/Charts/ECharts/EC';
import Report from './Report';
import Dynamic from './Dynamic';
const { Content } = Layout;

@connect()
export default class Blank extends BaseComponent {
  state = {
    element1: null,
    element2: null,
  };

  saveElement1 = node => {
    this.setState({
      element1: node
    });
  };

  saveElement2 = node => {
    this.setState({
      element2: node
    });
  };

  getOption = () => ({
    title: {
      text: intl.formatMessage(messages.userAccessSource),
      subtext: intl.formatMessage(messages.purelyFictitious),
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['Direct interview', 'Email marketing', 'Alliance advertising', 'Video', 'Search engine']
    },
    series: [
      {
        name: 'Access source',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: 'Direct interview' },
          { value: 310, name: 'Email marketing' },
          { value: 234, name: 'Alliance advertising' },
          { value: 135, name: 'Video' },
          { value: 1548, name: 'Search engine' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  render() {
    const { element1, element2 } = this.state;
    const comps = (
      <div>
        <table border="1" style={{width: '100%'}}>
          <thead>
            <tr>
              <th style={{textAlign: 'center', color: 'aqua'}}>{intl.formatMessage(messages.name)}</th>
              <th style={{textAlign: 'center', color: 'aqua'}}>{intl.formatMessage(messages.grade)}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{textAlign: 'center'}}>{intl.formatMessage(messages.anyName1)}</td>
              <td style={{textAlign: 'center'}}>{intl.formatMessage(messages.firstGrade)}</td>
            </tr>
            <tr>
              <td style={{textAlign: 'center'}}>{intl.formatMessage(messages.anyName2)}</td>
              <td style={{textAlign: 'center'}}>{intl.formatMessage(messages.secondGrade)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    return (
      <Layout className="full-layout page print-page">
        <Content>
          <Panel title={intl.formatMessage(messagesBaseComponent.description)} ref={this.saveElement1}>
            <h3>{intl.formatMessage(messages.usagePrint)}</h3>
            <p>{intl.formatMessage(messages.supportPrint)}</p>
          </Panel>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="String & HTML text">
                <div>{`<span style="color: red">I will hunt tiger tonight</span>`}</div>
                <br />
                <Print content={`<span style="color: red">I will hunt tiger tonight</span>`} />
              </Panel>
              <Panel title="Unrendered React component">
                <div>{comps}</div>
                <br />
                <Print
                  trigger={<Button icon="printer">{intl.formatMessage(messagesPrint.print)}</Button>}
                  content={comps}
                />
              </Panel>
              <Panel title="Report example">
                <div>{intl.formatMessage(messages.clickButtonPrint)}</div>
                <br />
                <Print
                  trigger={<Button icon="printer">{intl.formatMessage(messagesPrint.print)}</Button>}
                  content={<Report />}
                />
              </Panel>
              <Panel title="Dynamically getting content">
                <div>{intl.formatMessage(messagesPrint.print)} EMOJI</div>
                <br />
                <Print
                  trigger={<Button icon="printer">{intl.formatMessage(messagesPrint.print)}</Button>}
                  content={<Dynamic />}
                />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="DOM element corresponding to ref | React node">
                <div>{intl.formatMessage(messages.topDescriptionPrint)}</div>
                <br />
                {element1 ? (
                  <Print
                    trigger={<Button icon="printer">{intl.formatMessage(messagesPrint.print)}</Button>}
                    content={element1}
                  />
                ) : null}
              </Panel>
              <Panel title="Canvas chart">
                <div style={{ height: 300 }}>
                  <EC option={this.getOption()} ref={this.saveElement2} />
                </div>
                <br />
                {element2 ? (
                  <Print
                    canvas
                    trigger={<Button icon="printer">{intl.formatMessage(messagesPrint.print)}</Button>}
                    content={element2}
                  />
                ) : null}
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

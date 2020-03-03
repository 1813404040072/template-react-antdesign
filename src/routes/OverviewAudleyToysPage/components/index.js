import React from 'react';
import { connect  } from 'dva';
import { Layout, Tabs, Card, Avatar, List, Typography, Calendar, Badge, Progress } from 'antd';
import intl from 'react-intl-universal';

import BaseComponent from '../../../components/BaseComponent';
import Panel from '../../../components/Panel';
import Form from '../../../components/Form';
import TransferTree from '../../../components/TransferTree';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';

import messages from '../messages';
import './index.less';
const { Content } = Layout;
const { TabPane } = Tabs;
const { Ripple } = Button;
const { Meta } = Card;

@connect(({ overviewaudleytoyspage, loading }) => ({
  overviewaudleytoyspage,
  loading: loading.models.overviewaudleytoyspage
}))
export default class extends BaseComponent {
  constructor(props){
    super(props)
    this.state = {
      listView: [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ],
      form: [
        {
          title: 'Label Mask',
          name: 'user_name',
          formItem: {
            mask: '1111 1111 1111 1111',
            rules: [
              {
                required: true,
                message: 'please enter user name'
              }
            ]
          }
        },
        {
          title: 'Textbox',
          name: 'user_password',
          formItem: {
            type: 'password',
            repeat: true
          }
        },
        {
          title: 'Colour',
          name: 'color',
          formItem: {
            type: 'transfer',
            initialValue: [1, 3],
            dataSource: [
              { key: 1, title: 'red' },
              { key: 2, title: 'yellow' },
              { key: 3, title: 'blue' },
              { key: 4, title: 'green' }
            ],
            onChange: (form, value) => console.log('---:', value),
            // listStyle: {
            //   width: 114
            // },
            rules: [{ required: true, message: 'Choose at least one color!' }]
          }
        },
        {
          title: 'Numeric Up Down',
          name: 'ordder',
          formItem: {
            type: 'number'
          }
        },
        {
          title: 'Combo box',
          name: 'roleType',
          dict: [
            { code: '111', codeName: '111' },
            { code: '222', codeName: '222' },
            { code: '333', codeName: '333' }
          ],
          formItem: {
            type: 'select'
          }
        },
        {
          title: 'Date picker',
          name: 'date',
          formItem: {
            type: 'date'
          }
        },
        {
          title: 'Time picker',
          name: 'time',
          formItem: {
            type: 'time'
          }
        },
        {
          title: 'Date range',
          name: 'rangedate',
          formItem: {
            type: 'date~'
          }
        },
        {
          title: 'Dropdown Tree',
          name: 'key1',
          formItem: {
            type: 'cascade',
            options: [
              {
                value: '1',
                label: 'Value 1',
                children: [
                  {
                    value: '1-1',
                    label: 'Value 1-1'
                  }
                ]
              },
              {
                value: '2',
                label: 'Value 2',
                children: [
                  {
                    value: '2-1',
                    label: 'Value 2-1'
                  }
                ]
              }
            ]
          }
        },
        {
          title: 'Radio',
          name: 'radio1',
          dict: [
            { code: '1', codeName: 'Value 1' },
            { code: '2', codeName: 'Value  2' },
            { code: '3', codeName: 'Beijing' },
            { code: '4', codeName: 'Chengdu' }
          ],
          formItem: {
            type: 'radio'
          }
        },
        {
          title: 'Radio 2',
          name: 'radio2',
          dict: [
            { code: '1', codeName: 'Value 1' },
            { code: '2', codeName: 'Value  2' },
            { code: '3', codeName: 'Beijing' },
            { code: '4', codeName: 'Chengdu' }
          ],
          formItem: {
            type: 'radio'
          }
        },
        {
          title: 'Radio Button',
          name: 'radio2',
          dict: [
            { code: '1', codeName: 'Hangzhou' },
            { code: '2', codeName: 'Shanghai' },
            { code: '3', codeName: 'Beijing' },
            { code: '4', codeName: 'Chengdu' }
          ],
          formItem: {
            type: 'radio',
            buttonStyle: 'solid'
          }
        },
        {
          title: 'Checkbox',
          name: 'radio3',
          dict: [
            { code: '1', codeName: 'Hangzhou' },
            { code: '2', codeName: 'Shanghai' },
            { code: '3', codeName: 'Beijing' },
            { code: '4', codeName: 'Chengdu' }
          ],
          formItem: {
            type: 'checkbox'
          }
        }
      ],
      percent: 0,
    }
  }

  dateCellRender = (value) => {
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  }

  monthCellRender = (value) => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }

  increase = () => {
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  };

  decline = () => {
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  };

  render() {
    const { form, listView } = this.state;
    const { overviewaudleytoyspage, loading } = this.props;
    const { dataSource } = overviewaudleytoyspage;

    return (
      <Layout className="full-layout page overviewaudleytoyspage-page">
        <Content>
          <Card>
            <Tabs>
              <TabPane tab="Test Scenarios" key="1">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="Activity" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Profile" key="3">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="Settings" key="4">
                Content of Tab Pane 4
              </TabPane>
              <TabPane tab="Admin" key="5">
                Content of Tab Pane 5
              </TabPane>
              <TabPane tab="Password" key="6">
                Content of Tab Pane 6
              </TabPane>
            </Tabs>
          </Card>
          <Card className="group-box">
            <Meta title="Group Box"/>
            <div>
              <Progress percent={this.state.percent} />
              <Button type="primary" onClick={this.decline} icon="minus" />
              <Button type="primary" onClick={this.increase} icon="plus" />
            </div>
          </Card>
          <Panel title="Button Tooltip" className="button-page">
            <div>
              <Button tooltip="Tooltip" type="primary">Primary</Button>
              <Button tooltip="Tooltip">Tooltip Default</Button>
              <Button tooltip="Tooltip" type="dashed">Dashed</Button>
              <Button tooltip="Tooltip" type="danger">Danger</Button>
            </div>
            <div>
              <Button tooltip="Tooltip" ghost>Default</Button>
              <Button tooltip="Tooltip" ghost type="primary">Primary</Button>
              <Button tooltip="Tooltip" ghost type="danger">Danger</Button>
            </div>
            <div>
              <Ripple>Default</Ripple>
              <Ripple type="primary"><Icon font="iconfont" type="left" /> Primary</Ripple>
              <Ripple type="danger">Danger <Icon font="iconfont" type="right" /></Ripple>
              <Ripple type="primary"><Icon font="iconfont" type="search" /></Ripple>
            </div>
            <div>
              <Ripple ghost>Default</Ripple>
              <Ripple ghost type="primary">Primary</Ripple>
              <Ripple ghost type="danger">Danger</Ripple>
            </div>
          </Panel>
          <Panel title="Avatar">
            <Avatar style={{ marginRight: '10px' }} size={120} icon="user" src="https://via.placeholder.com/120/0000FF/FFFFFF/?text=Avatar" />
            <Avatar shape="square" size={120} src="https://via.placeholder.com/120/0000FF/FFFFFF/?text=Avatar" />
          </Panel>
          <Panel title="Calendar">
            <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />,
          </Panel>
          <Panel title="List View">
            <List
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={listView}
              renderItem={(item, index) => (
                <List.Item>
                  <Typography.Text mark>[{index + 1}]</Typography.Text> {item}
                </List.Item>
              )}
            />
            <List
              style={{ marginTop: '10px' }}
              itemLayout="horizontal"
              dataSource={listView}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </Panel>
          <Panel title="Progress Bar">
            <Progress percent={30} />
            <Progress percent={50} status="active" />
            <Progress percent={70} status="exception" />
            <Progress percent={100} />
            <Progress percent={50} showInfo={false} />
            <Progress
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={99.9}
            />
            <Progress
              strokeColor={{
                from: '#108ee9',
                to: '#87d068',
              }}
              percent={99.9}
              status="active"
            />
            <Progress
              type="circle"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={90}
            />
            <Progress
              type="circle"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={100}
            />
          </Panel>
          <Panel title="Tree View">
            <TransferTree dataSource={dataSource} loading={loading} />
          </Panel>
          <Panel title="Form">
            <Form columns={form} onSubmit={this.onSubmit} />
          </Panel>
        </Content>
      </Layout>
    );
  }
}

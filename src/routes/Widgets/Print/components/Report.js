import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { Checkbox } from 'antd';
import messages from '../messages';
import './report.less';
const CheckboxGroup = Checkbox.Group;

class Report extends PureComponent {
  render() {
    const plainOptions = [
      {value: '1066001', label: 'Development and implementation'},
      {value: '1066002', label: 'Test'},
      {value: '1066003', label: 'Test run'},
    ];
    return (
      <div className="system-audit-pring">
        <table className="tg">
          <tbody>
            <tr>
              <th className="tg-wp8o" colSpan="5">
                <h1>{intl.formatMessage(messages.deploymentSigning)}</h1>
                <h3 className="version">{intl.formatMessage(messages.versionNumber)}：20181121</h3>
              </th>
            </tr>
            <tr>
              <td className="tg-obcv left1" rowSpan="5">{intl.formatMessage(messages.applicantFill)}</td>
              <td className="tg-obcv left2 hfixed">{intl.formatMessage(messages.systemName)}</td>
              <td className="tg-73oq" colSpan="3" />
            </tr>
            <tr>
              <td className="tg-obcv left2 hfixed">{intl.formatMessage(messages.systemStatus)}</td>
              <td className="tg-73oq" colSpan="3">
                <CheckboxGroup options={plainOptions} />
              </td>
            </tr>
            <tr>
              <td className="tg-obcv left2 hfixed">{intl.formatMessage(messages.responsibleSystem)}</td>
              <td className="tg-73oq" colSpan="3" />
            </tr>
            <tr>
              <td className="tg-obcv left2">{intl.formatMessage(messages.systemsManual)}</td>
              <td className="tg-73oq xtsm-content" colSpan="3">
                <i>（{intl.formatMessage(messages.basicSituation)}）</i>
                <p />
              </td>
            </tr>
            <tr>
              <td className="tg-73oq h20" colSpan="2">
                <div className="w50">
                  {intl.formatMessage(messages.applicationUnit)}：
                  <div className="sign"> {intl.formatMessage(messages.signatureCharge)}：<br />({intl.formatMessage(messages.stamp)})</div>
                  <div className="date">&nbsp;{intl.formatMessage(messages.year)}&emsp;{intl.formatMessage(messages.month)}&emsp;{intl.formatMessage(messages.day)}</div>
                </div>
              </td>
              <td className="tg-73oq" colSpan="2">
                <div className="w50">
                  {intl.formatMessage(messages.implementationUnit)}：
                  <div className="sign">{intl.formatMessage(messages.signatureCharge)}：<br />({intl.formatMessage(messages.stamp)})</div>
                  <div className="date">&nbsp;{intl.formatMessage(messages.year)}&emsp;{intl.formatMessage(messages.month)}&emsp;{intl.formatMessage(messages.day)}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="tg-qtf5 left1"> {intl.formatMessage(messages.approvalItem)}</td>
              <td className="tg-73oq h20" colSpan="2">
                <div className="w50">
                  {intl.formatMessage(messages.businessDepartment)}：
                  <p />
                  <div className="sign">{intl.formatMessage(messages.signatureCharge)}：<br />({intl.formatMessage(messages.stamp)})</div>
                  <div className="date">&nbsp;{intl.formatMessage(messages.year)}&emsp;{intl.formatMessage(messages.month)}&emsp;{intl.formatMessage(messages.day)}</div>
                </div>
              </td>
              <td className="tg-73oq" colSpan="2">
                <div className="w50">
                  {intl.formatMessage(messages.ministryOfScience)}：
                  <p />
                  <div className="sign">{intl.formatMessage(messages.signatureCharge)}：<br />({intl.formatMessage(messages.stamp)})</div>
                  <div className="date">&nbsp;{intl.formatMessage(messages.year)}&emsp;{intl.formatMessage(messages.month)}&emsp;{intl.formatMessage(messages.day)}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Report;

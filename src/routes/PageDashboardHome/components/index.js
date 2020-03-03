import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Tabs, Row, Col, Upload, message, Avatar, Typography, List, Spin} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import intl from 'react-intl-universal';

import Form from '../../../components/Form';
import formObj from '../../Register/formObj';
import Icon from '../../../components/Icon';
import BaseComponent from '../../../components/BaseComponent';
import Button from '../../../components/Button';
import messages from '../messages';
import './index.less';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;


@connect()
export default class extends BaseComponent {
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      valueDateTimeFormat: '',
      valueProfile: {
        companyName: "Company Name",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone_number: "Phone Number",
        city: "City",
        state: "State",
        country: "Country",
      },
      settingsForm: [
        {
          title: 'Locale',
          name: 'locale',
          dict: [
            { code: 'English', codeName: 'English' },
            { code: 'France', codeName: 'France' },
            { code: 'Vietnam', codeName: 'Vietnam' }
          ],
          formItem: {
            type: 'select'
          }
        },
        {
          title: 'Time Zone',
          name: 'timeZone',
          dict: [
            { code: '-08:00', codeName: '(UTC -08:00) Pacific Time (US & Canada)' },
            { code: '+01:00', codeName: '(UTC +01:00) Brussels, Copenhagen, Madrid, Paris' },
            { code: '+07:00', codeName: '(UTC +07:00) Bangkok, Hanoi, Jakarta' }
          ],
          formItem: {
            type: 'select',
            onChange: this.onChangeTimeZone,
          },
        },
        {
          title: 'Example Date Time Format',
          name: 'example_date_time_format',
          formItem: {
            disabled: true,
            initialValue: '',
          }
        },
      ],
      passwordForm: [
        {
          title: 'Current Password',
          name: 'current_password',
          formItem: {
            type: 'password',
          }
        },
        {
          title: 'New Password',
          name: 'new_password',
          formItem: {
            type: 'password',
            repeat: true
          }
        }
      ],
      dataAS2: [
        {
          id: 'Audley Toys AS2 connection 01',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
          TxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>',
          RxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
        },
        {
          id: 'Audley Toys AS2 connection 02',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 2',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
          TxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>',
          RxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
        },
        {
          id: 'Audley Toys AS2 connection 03',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 3',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
          TxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>',
          RxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
        },
        {
          id: 'Audley Toys AS2 connection 01',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 4',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
          TxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>',
          RxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
        },
        {
          id: 'Audley Toys AS2 connection 01',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 5',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
          TxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>',
          RxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
        },
        {
          id: 'Audley Toys AS2 connection 01',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 6',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
          TxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>',
          RxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
        }
      ],
      loadingAS2: false,
      hasMoreAS2: true,
      indexAS2: -1,
      connectionsAS2: [
        {
          title: 'AS2 ID',
          name: 'id',
          dict: [
            { code: 'Audley Toys AS2 connection 01', codeName: 'Audley Toys AS2 connection 01' },
            { code: 'Audley Toys AS2 connection 02', codeName: 'Audley Toys AS2 connection 02' },
            { code: 'Audley Toys AS2 connection 03', codeName: 'Audley Toys AS2 connection 03' }
          ],
          formItem: {
            type: 'select',
            initialValue: '',
          }
        },
        {
          title: 'EDI Customer Number',
          name: 'EDICustomerNumber',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'EDI Regal Bill-To Account',
          name: 'EDIRegalBillToAccount',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'EDI Vendor',
          name: 'EDIVendor',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Contact',
          name: 'contact',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Test Qualifier',
          name: 'testQualifier',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Test CompanyID',
          name: 'testCompanyID',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Production Qualifier',
          name: 'productionQualifier',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Production CompanyID',
          name: 'productionCompanyID',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Tx Certificate',
          name: 'TxCertificate',
          formItem: {
            type: 'upload',
            action: 'https://httpbin.org/post',
            fileName: 'TxCertificateAS2',
            multiple: false,
            showUploadList: false,
            message: '',
            setFieldsValue: [],
            initialValue: [],
            onChange: (info, file) => this.onChangeUpload (info, file, 'connectionsAS2', 9)
          }
        },
        {
          title: 'Rx Certificate',
          name: 'RxCertificate',
          formItem: {
            type: 'upload',
            action: 'https://httpbin.org/post',
            fileName: 'RxCertificateAS2',
            multiple: false,
            showUploadList: false,
            message: '',
            setFieldsValue: [],
            initialValue: [],
            onChange: (info, file) => this.onChangeUpload (info, file, 'connectionsAS2', 10)
          }
        }
      ],
      dataSFTP: [
        {
          id: 'Audley Toys AS2 connection 01',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
          TxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>',
          RxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
        },
        {
          id: 'Audley Toys AS2 connection 02',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 2',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
          TxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>',
          RxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
        },
        {
          id: 'Audley Toys AS2 connection 03',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 3',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
          TxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>',
          RxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
        },
        {
          id: 'Audley Toys AS2 connection 01',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 4',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
          TxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>',
          RxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
        },
        {
          id: 'Audley Toys AS2 connection 01',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 5',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
          TxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>',
          RxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
        },
        {
          id: 'Audley Toys AS2 connection 01',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 6',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
          TxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>',
          RxCertificate: '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
        }
      ],
      loadingSFTP: false,
      hasMoreSFTP: true,
      indexSFTP: -1,
      connectionsSFTP: [
        {
          title: 'SFTP ID',
          name: 'id',
          dict: [
            { code: 'Audley Toys SFTP connection 01', codeName: 'Audley Toys SFTP connection 01' },
            { code: 'Audley Toys SFTP connection 02', codeName: 'Audley Toys SFTP connection 02' },
            { code: 'Audley Toys SFTP connection 03', codeName: 'Audley Toys SFTP connection 03' }
          ],
          formItem: {
            type: 'select',
            initialValue: '',
          }
        },
        {
          title: 'SFTP Server',
          name: 'server',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'User Name',
          name: 'usernam',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Password',
          name: 'password',
          formItem: {
            initialValue: '',
            type: 'password',
          }
        },
        {
          title: 'Folder Location',
          name: 'folderLocation',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Test Qualifier',
          name: 'testQualifier',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Test CompanyID',
          name: 'testCompanyID',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Production Qualifier',
          name: 'productionQualifier',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Production CompanyID',
          name: 'productionCompanyID',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Tx Certificate',
          name: 'TxCertificate',
          formItem: {
            type: 'upload',
            action: 'https://httpbin.org/post',
            fileName: 'TxCertificateSFTP',
            multiple: false,
            showUploadList: false,
            message: '',
            setFieldsValue: [],
            onChange: (info, file) => this.onChangeUpload (info, file, 'connectionsSFTP', 9)
          }
        },
        {
          title: 'Rx Certificate',
          name: 'RxCertificate',
          formItem: {
            type: 'upload',
            action: 'https://httpbin.org/post',
            fileName: 'RxCertificateSFTP',
            multiple: false,
            showUploadList: false,
            message: '',
            setFieldsValue: [],
            onChange: (info, file) => this.onChangeUpload (info, file, 'connectionsSFTP', 10)
          }
        }
      ],
      dataFTP: [
        {
          id: 'Audley Toys AS2 connection 01',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
        },
        {
          id: 'Audley Toys AS2 connection 02',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 2',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
        },
        {
          id: 'Audley Toys AS2 connection 03',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 3',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
        },
        {
          id: 'Audley Toys AS2 connection 01',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 4',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
        },
        {
          id: 'Audley Toys AS2 connection 01',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 5',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
        },
        {
          id: 'Audley Toys AS2 connection 01',
          EDICustomerNumber: '9999',
          EDIRegalBillToAccount: 'BT9999',
          EDIVendor: 'EV999',
          contact: 'John Doe 6',
          testQualifier: 'ZZ',
          testCompanyID: '9999999999',
          productionQualifier: '12',
          productionCompanyID: '9999999999',
        }
      ],
      loadingFTP: false,
      hasMoreFTP: true,
      indexFTP: -1,
      connectionsFTP: [
        {
          title: 'FTP ID',
          name: 'id',
          dict: [
            { code: 'Audley Toys FTP connection 01', codeName: 'Audley Toys FTP connection 01' },
            { code: 'Audley Toys FTP connection 02', codeName: 'Audley Toys FTP connection 02' },
            { code: 'Audley Toys FTP connection 03', codeName: 'Audley Toys FTP connection 03' }
          ],
          formItem: {
            type: 'select',
            initialValue: '',
          }
        },
        {
          title: 'FTP Server',
          name: 'server',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'User Name',
          name: 'usernam',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Password',
          name: 'password',
          formItem: {
            initialValue: '',
            type: 'password',
          }
        },
        {
          title: 'Folder Location',
          name: 'folderLocation',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Test Qualifier',
          name: 'testQualifier',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Test CompanyID',
          name: 'testCompanyID',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Production Qualifier',
          name: 'productionQualifier',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
        {
          title: 'Production CompanyID',
          name: 'productionCompanyID',
          formItem: {
            initialValue: '',
            type: 'input',
          }
        },
      ]
    }
  }
  
  componentDidMount () {
    const { match } = this.props
    console.log(match);
  }

  handleInfiniteOnLoad = (key) => {
    // let { data } = this.state;
    this.setState({[key]: true});

    setTimeout(() => this.setState({[key]: false}), 1000)    
  };

  onChangeUpload(info, file, nameArray, indexArray) {
    if (file.event && file.event.percent === 100) {
      this.state[nameArray][indexArray].formItem.message = '<div><p><strong>Expiration Date:</strong> 11/23/2025</p><p><strong>Serial #:</strong> 016EA8948DF6</p><p><strong>URL:</strong> http://as2.audleytoys.com:5080</p></div>'
      this.setState({ [nameArray]: this.state[nameArray]})
    }
  }

  onChangeTimeZone = (form, value) => {
    const { settingsForm } = this.state;
    settingsForm[2]['formItem']['initialValue'] = 'Nov 11, 2019 @ 3:03:29 PM ' + value
    this.setState({ settingsForm });
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  handleSubmit = values => {

  };

  changeArray = (index, nameArray, nameForm, keyIndex) => {
    if (index === -1) {
      this.state[nameForm].map(item => {
        if (item.formItem.initialValue) {
          item.formItem.initialValue = item.formItem.message ? [] : '';
        }
        if (item.formItem.message) {
          item.formItem.message = ''
        }
      })
    } else {
      for (let key in this.state[nameArray][index]){
        if(this.state[nameArray][index].hasOwnProperty(key)){
          this.state[nameForm].map(item => {
            if (key === item.name) {
              item.formItem.initialValue = item.formItem.message ? [] : this.state[nameArray][index][key];
              if (item.formItem.message || item.formItem.message === '') {
                item.formItem.message = this.state[nameArray][index][key]
              }
            }
          })
        }
      }
    }
    this.setState({ [nameForm]: this.state[nameForm], [keyIndex]: index })
  }

  removeArray = (index, nameArray) => {
    this.state[nameArray].splice(index, 1);
    this.setState({ [nameArray]: this.state[nameArray]})
  }

  render() {
    const { imageUrl, passwordForm, settingsForm, connectionsAS2, connectionsSFTP, connectionsFTP, valueProfile } = this.state;
    const formProfile = formObj();
    formProfile.map((item, index) => item['formItem']['initialValue'] = valueProfile[item.name]);
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Layout className="full-layout page pagedashboardhome-page">
        <Content>
          <Card>
            <Tabs>
              <TabPane tab="Profile" key="2">
                <Row>
                  <Col lg={24} xl={16}>
                    <Form
                      type="grid"
                      columns={formProfile}
                      onSubmit={this.handleSubmit}
                      // loading={submitting}
                      textSubmit="Save"
                    />
                  </Col>
                  <Col lg={24} xl={8}>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={this.beforeUpload}
                      onChange={this.handleChange}
                    >
                      {imageUrl ? <Avatar size={180} icon="user" src={imageUrl} /> : uploadButton}
                    </Upload>
                  </Col>
                </Row>
                
              </TabPane>
              <TabPane tab="Settings" key="3">
                <Title level={3}>Language / Date Time Zone</Title>
                <Form
                  type="grid"
                  columns={settingsForm}
                  onSubmit={this.handleSubmit}
                  // loading={submitting}
                  textSubmit="Save"
                />
              </TabPane>
              <TabPane tab="Password" key="4">
                <Title level={3}>Change Password</Title>
                <Form
                  type="grid"
                  columns={passwordForm}
                  onSubmit={this.handleSubmit}
                  // loading={submitting}
                  textSubmit="Save"
                />
              </TabPane>
              <TabPane tab="Connections" key="5">
                <Tabs type="card">
                  <TabPane tab="AS2" key="AS2">
                    <Row type="flex" justify="center" align="top">
                      <Col span={16} className="infinite-container">
                        <InfiniteScroll
                          initialLoad={false}
                          pageStart={0}
                          loadMore={() => this.handleInfiniteOnLoad('loadingAS2')}
                          hasMore={!this.state.loadingAS2 && this.state.hasMoreAS2}
                          useWindow={false}
                        >
                          <List
                            dataSource={this.state.dataAS2}
                            renderItem={(item, index) => (
                              <List.Item
                                key={index}
                                actions={[
                                  <Button
                                    type="primary"
                                    onClick={() => this.changeArray(index, 'dataAS2', 'connectionsAS2', 'indexAS2')}
                                    size="small">
                                      <Icon type="edit" />
                                  </Button>, 
                                  <Button 
                                    type="danger"
                                    onClick={() => this.removeArray(index, 'dataAS2')}
                                    size="small"
                                  >
                                    <Icon font="iconfont" type="cross" />
                                  </Button>
                                ]}
                              >
                                <List.Item.Meta
                                  title={item.id}
                                  description={item.contact}
                                />
                              </List.Item>
                            )}
                          >
                            {this.state.loadingAS2 && this.state.hasMoreAS2 && (
                              <div className="loading-container">
                                <Spin />
                              </div>
                            )}
                          </List>
                        </InfiniteScroll>
                      </Col>
                    </Row>
                    <Button 
                      type="primary"
                      onClick={() => this.changeArray(-1, 'dataAS2', 'connectionsAS2', 'indexAS2')}
                    >
                      <Icon font="iconfont" type="add" /> Create new Connections
                    </Button>
                    <Form
                      type="grid"
                      columns={connectionsAS2}
                      onSubmit={this.handleSubmit}
                      // loading={submitting}
                      textSubmit="Save"
                    />
                  </TabPane>
                  <TabPane tab="SFTP" key="SFTP">
                    <Row type="flex" justify="center" align="top">
                      <Col span={16} className="infinite-container">
                        <InfiniteScroll
                          initialLoad={false}
                          pageStart={0}
                          loadMore={() => this.handleInfiniteOnLoad('loadingSFTP')}
                          hasMore={!this.state.loadingSFTP && this.state.hasMoreSFTP}
                          useWindow={false}
                        >
                          <List
                            dataSource={this.state.dataSFTP}
                            renderItem={(item, index) => (
                              <List.Item
                                key={index}
                                actions={[
                                  <Button
                                    type="primary"
                                    onClick={() => this.changeArray(index, 'dataSFTP', 'connectionsSFTP', 'indexSFTP')}
                                    size="small">
                                      <Icon type="edit" />
                                  </Button>, 
                                  <Button 
                                    type="danger"
                                    onClick={() => this.removeArray(index, 'dataSFTP')}
                                    size="small"
                                  >
                                    <Icon font="iconfont" type="cross" />
                                  </Button>
                                ]}
                              >
                                <List.Item.Meta
                                  title={item.id}
                                  description={item.contact}
                                />
                              </List.Item>
                            )}
                          >
                            {this.state.loadingSFTP && this.state.hasMoreSFTP && (
                              <div className="loading-container">
                                <Spin />
                              </div>
                            )}
                          </List>
                        </InfiniteScroll>
                      </Col>
                    </Row>
                    <Button 
                      type="primary"
                      onClick={() => this.changeArray(-1, 'dataSFTP', 'connectionsSFTP', 'indexSFTP')}
                    >
                      <Icon font="iconfont" type="add" /> Create new Connections
                    </Button>
                    <Form
                      type="grid"
                      columns={connectionsSFTP}
                      onSubmit={this.handleSubmit}
                      // loading={submitting}
                      textSubmit="Save"
                    />
                  </TabPane>
                  <TabPane tab="FTP" key="FTP">
                    <Row type="flex" justify="center" align="top">
                      <Col span={16} className="infinite-container">
                        <InfiniteScroll
                          initialLoad={false}
                          pageStart={0}
                          loadMore={() => this.handleInfiniteOnLoad('loadingFTP')}
                          hasMore={!this.state.loadingFTP && this.state.hasMoreFTP}
                          useWindow={false}
                        >
                          <List
                            dataSource={this.state.dataFTP}
                            renderItem={(item, index) => (
                              <List.Item
                                key={index}
                                actions={[
                                  <Button
                                    type="primary"
                                    onClick={() => this.changeArray(index, 'dataFTP', 'connectionsFTP', 'indexFTP')}
                                    size="small">
                                      <Icon type="edit" />
                                  </Button>, 
                                  <Button 
                                    type="danger"
                                    onClick={() => this.removeArray(index, 'dataFTP')}
                                    size="small"
                                  >
                                    <Icon font="iconfont" type="cross" />
                                  </Button>
                                ]}
                              >
                                <List.Item.Meta
                                  title={item.id}
                                  description={item.contact}
                                />
                              </List.Item>
                            )}
                          >
                            {this.state.loadingFTP && this.state.hasMoreFTP && (
                              <div className="loading-container">
                                <Spin />
                              </div>
                            )}
                          </List>
                        </InfiniteScroll>
                      </Col>
                    </Row>
                    <Button 
                      type="primary"
                      onClick={() => this.changeArray(-1, 'dataFTP', 'connectionsFTP', 'indexFTP')}
                    >
                      <Icon font="iconfont" type="add" /> Create new Connections
                    </Button>
                    <Form
                      type="grid"
                      columns={connectionsFTP}
                      onSubmit={this.handleSubmit}
                      // loading={submitting}
                      textSubmit="Save"
                    />
                  </TabPane>
                </Tabs>
              </TabPane>
            </Tabs>
          </Card>
        </Content>
      </Layout>
    );
  }
}

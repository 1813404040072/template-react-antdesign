import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import { Button, message } from 'antd';
import intl from 'react-intl-universal';
import Icon from '../Icon';
import LazyLoad from '../LazyLoad';
import notData from '../../assets/images/nodata.svg';
import Form from './Form';
import messages from './messages';
import messagesModal from '../Modal/messages';
import './style/index.less';
// Preset columns
const columns = [
  {
    title: 'title',
    name: 'title',
    formItem: {
      rules: [
        {
          required: true,
          message: intl.formatMessage(messages.enterTitle),
        },
        {
          max: 300,
          message: intl.formatMessage(messages.enterUp300),
        },
        {
          pattern: /^[\w\u4E00-\u9FA5]+$/,
          message: intl.formatMessage(messages.onlyInput),
        }
      ]
    }
  },
  {
    title: 'link',
    name: 'link',
    formItem: {
      rules: [
        {
          required: true,
          message:  intl.formatMessage(messages.enterLink),
        },
        {
          max: 300,
          message:  intl.formatMessage(messages.enterLink300),
        }
      ]
    }
  },
  {
    title: 'file',
    name: 'file',
    formItem: {
      type: 'upload',
      listType: 'picture-card',
      max: 1,
      fileTypes: ['.png', '.jpg', '.gif'],
      rules: [
        {
          required: true,
          message:  intl.formatMessage(messages.uploadImg),
        }
      ],
      renderUpload: (a, b, isDisabled) =>
        isDisabled ? null : (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">{intl.formatMessage(messages.upload)}</div>
          </div>
        )
    }
  }
];

class BannerMng extends Component {
  constructor(props) {
    const { formCols } = props;
    super(props);
    let imageKey = null;
    const newFormCols = [];
    formCols.forEach(item => {
      const title = intl.formatMessage(messages[item.title]);
      newFormCols.push({
        ...item,
        title
      });

      if (item.formItem && item.formItem.type === 'upload') {
        imageKey = item.name;
      }
    });
    // if (!imageKey) console.error("BannerMng required a column of type 'upload'");

    this.state = {
      isEdit: false,
      isAdd: false,
      record: null,
      imageKey,
      newFormCols,
      dataSource: props.dataSource || []
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { dataSource } = nextProps;
    if (!isEqual(this.props.dataSource, dataSource)) {
      this.setState({
        dataSource
      });
    }
  }

  onEditBanner = (item, editKey) => {
    this.setState({
      isEdit: editKey,
      isAdd: false,
      record: item
    });
  };

  onAddBanner = () => {
    if (this.props.fileNum && this.props.fileNum > 0) {
      if (this.props.dataSource.length >= this.props.fileNum) {
        message.error(`${intl.formatMessage(messages.canAddUpTo)} ${this.props.fileNum} ${intl.formatMessage(messages.picture)}`);
        return;
      }
    }

    this.setState({
      isAdd: true,
      isEdit: false,
      record: null
    });
  };

  onCancel = () => {
    this.setState({
      isAdd: false,
      isEdit: false,
      record: null
    });
  };

  onChange = (type, item, i) => {
    const { isEdit } = this.state;
    let { dataSource } = this.state;

    let tempIndex = -1;
    const temp = dataSource.filter((data, index) => {
      if (`edit_${index}` === isEdit) {
        tempIndex = index;
        return false;
      }
      return true;
    });

    const newState = {};
    switch (type) {
      case 'up':
        dataSource.splice(i - 1, 0, dataSource.splice(i, 1)[0]);
        break;
      case 'down':
        dataSource.splice(i + 1, 0, dataSource.splice(i, 1)[0]);
        break;
      case 'add':
        newState.isAdd = false;
        dataSource.push(item);
        break;
      case 'edit':
        temp.splice(tempIndex, 0, item);
        dataSource = temp;
        newState.isEdit = false;
        break;
      case 'delete':
        dataSource.splice(i, 1);
        break;
      default:
        break;
    }
    this.setState({
      dataSource,
      ...newState
    });

    this.props.onChange && this.props.onChange(dataSource);
  };

  render() {
    const { title } = this.props;
    const { dataSource, record, isEdit, isAdd, imageKey, newFormCols } = this.state;

    console.log(dataSource)

    return (
      <div className="banner-view-mng">
        <div className="banner-title clearfix">
          <div className="title">
            <Icon type="picture" />
            {isEdit && intl.formatMessage(messagesModal.edit)}
            {isAdd && intl.formatMessage(messagesModal.new)}
            {title}
          </div>
          <div className="btns">
            {!isAdd && !isEdit ? (
              <Button icon="plus" type="primary" onClick={this.onAddBanner}>
                {intl.formatMessage(messagesModal.new)}
              </Button>
            ) : (
              <Button icon="rollback" onClick={this.onCancel}>
                {intl.formatMessage(messages.back)}
              </Button>
            )}
          </div>
        </div>
        {isEdit || isAdd ? (
          <Form
            imageKey={imageKey}
            columns={newFormCols}
            record={record}
            onCancel={this.onCancel}
            onSubmit={values => this.onChange(isEdit ? 'edit' : 'add', values)}
          />
        ) : (
          <div className="banner-content clearfix">
            {!dataSource.length ? (
              <div className="not-data">
                <img src={notData} alt="" />
                <div>~~{intl.formatMessage(messages.noContent)}~~</div>
              </div>
            ) : null}
            {dataSource.map((item, i) => (
              <div className="row" key={i}>
                <div className="preview">
                  <LazyLoad dataSrc={item[imageKey]} />
                </div>
                <ul className="oper">
                  <li className="top">
                    <Button
                      icon="caret-up"
                      title= {intl.formatMessage(messages.moveUp)}
                      disabled={i === 0}
                      onClick={() => this.onChange('up', item, i)}
                    />
                  </li>
                  <li className="bottom">
                    <Button
                      icon="caret-down"
                      title={intl.formatMessage(messages.moveDown)}
                      disabled={i === dataSource.length - 1}
                      onClick={() => this.onChange('down', item, i)}
                    />
                  </li>
                  <li className="edit">
                    <Button
                      icon="edit"
                      title={intl.formatMessage(messagesModal.edit)}
                      onClick={() => this.onEditBanner(item, `edit_${  i}`)}
                    />
                  </li>
                  <li className="remove">
                    <Button
                      icon="close"
                      title={intl.formatMessage(messages.close)}
                      onClick={() => this.onChange('delete', item, i)}
                    />
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}


BannerMng.propTypes = {
  dataSource: PropTypes.array,
  onChange: PropTypes.func,
  fileNum: PropTypes.number,
  formCols: PropTypes.array,
  title: PropTypes.node,
  // fileSize: PropTypes.number,
  // fileType: PropTypes.array,
};

BannerMng.defaultProps = {
  formCols: columns,
  title: intl.formatMessage(messages.slide),
};

export default BannerMng;

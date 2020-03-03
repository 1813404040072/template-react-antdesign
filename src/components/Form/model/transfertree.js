import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Select } from 'antd';
import $$ from 'cmn-utils';
import intl from 'react-intl-universal';
import TransferTree from '../../TransferTree';
import messagesModal from '../../Modal/messages';
const {Option} = Select;

/**
 *  formItem: {
      type: 'transfer',
      modal: true,
      dataSource: employees,
      normalize: (value) => value.map(item => item.key)
    }
 */
class TransferTreeControlled extends Component {
  constructor(props) {
    super(props);
    const { value, dataSource } = props;
    this.state = {
      value,
      dataSource,
      visible: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  triggerChange = (targetKeys, targetNodes) => {
    const { modal, onChange } = this.props;
    this.setState({ value: targetNodes });

    if (onChange && !modal) {
      onChange(targetNodes);
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  hideModal = () => {
    this.setState({
      visible: false
    });
  };

  onSelectChange = (value) => {
    const { onChange } = this.props;
    this.setState({
      value
    });
    onChange && onChange(value);
  };

  render() {
    const { modal, placeholder, ...otherProps } = this.props;
    const { dataSource, value } = this.state;
    const comp = (
      <TransferTree
        {...otherProps}
        dataSource={dataSource}
        targetNodes={value}
        onChange={this.triggerChange}
      />
    );

    if (modal || otherProps.disabled) {
      return (
        <div>
          <div role="presentation" onClick={otherProps.disabled ? () => {} : this.showModal}>
            <Select
              readOnly
              disabled={!!otherProps.disabled}
              mode="multiple"
              open={false}
              value={otherProps.value}
              onChange={this.onSelectChange}
              placeholder={placeholder}
            >
              {otherProps.value &&
                dataSource
                  .filter(item => otherProps.value.indexOf(item.key) !== -1)
                  .map(item => (
                    <Option key={item.key} value={item.key}>
                      {item.title || item.label}
                    </Option>
                  ))}
            </Select>
          </div>
          <Modal
            className="antui-transfer-modal"
            title={`Please choose ${  otherProps.title}`}
            visible={this.state && this.state.visible}
            width={modal.width || 480}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            okText= {[intl.formatMessage(messagesModal.determine)]}
            cancelText= {[intl.formatMessage(messagesModal.cancel)]}
            {...modal}
          >
            {comp}
          </Modal>
        </div>
      );
    }

    return comp;
  }
}

TransferTreeControlled.propTypes = {
  value: PropTypes.array,
  dataSource: PropTypes.array,
  placeholder: PropTypes.string,
  modal: PropTypes.object,
  onChange: PropTypes.func
};

/**
 * TransferTreeForm component
 */
export default ({
  form,
  name,
  formFieldOptions = {},
  record,
  initialValue,
  rules,
  onChange,
  dataSource,
  normalize,
  placeholder,
  getPopupContainer,
  ...otherProps
}) => {
  const { getFieldDecorator } = form;
  const options = {...formFieldOptions};

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }

  // If there is an initial value
  if (initval !== null && typeof initval !== 'undefined') {
    if ($$.isFunction(normalize)) {
      options.initialValue = normalize(initval);
    } else {
      options.initialValue = initval;
    }
  }

  // If there are rules
  if (rules && rules.length) {
    options.rules = rules;
  }

  // If you need onChange
  if (typeof onChange === 'function') {
    options.onChange = value => onChange(form, value); // form, value
  }

  const props = {
    placeholder: placeholder || `Please choose ${otherProps.title}`,
    ...otherProps
  };

  return getFieldDecorator(name, options)(
    <TransferTreeControlled dataSource={dataSource} {...props} />
  );
};

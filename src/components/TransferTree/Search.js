import React from 'react';
import { Input, Icon } from 'antd';
import $$ from 'cmn-utils';
import PropTypes from 'prop-types';

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.onChange = $$.debounce(props.onChange, 500);
  }

  handleChange = value => {
    const {onChange} = this.props;
    if (onChange) {
      this.onChange(value);
    }
    this.setState({
      value
    })
  };

  handleClear = e => {
    e.preventDefault();

    const {handleClear} = this.props;
    if (handleClear) {
      handleClear(e);
    }
    this.setState({
      value: ''
    })
  };

  render() {
    const { placeholder, prefixCls } = this.props;
    const icon =
      this.state.value && this.state.value.length > 0 ? (
        <a role="presentation" className={`${prefixCls}-action`} onClick={this.handleClear}>
          <Icon type="cross-circle" />
        </a>
      ) : (
        <span className={`${prefixCls}-action`}>
          <Icon type="search" />
        </span>
      );
    return (
      <div>
        <Input
          placeholder={placeholder}
          className={prefixCls}
          value={this.state.value}
          ref={node => { this.input = node } }
          onChange={e => this.handleChange(e.target.value)}
        />
        {icon}
      </div>
    );
  }
}

Search.propTypes = {
  placeholder: PropTypes.string,
  prefixCls: PropTypes.string,
  onChange: PropTypes.func,
  handleClear: PropTypes.func,
};

Search.defaultProps = {
  placeholder: ''
};

export default Search;

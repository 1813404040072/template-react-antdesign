import React from 'react';
import PropTypes from 'prop-types'
import {Icon} from 'antd';
import classNames from 'classnames';

function noop() {
}
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    const { dataSource } = nextProps;
    const st = {};

    if (dataSource) {
      st.dataSource = dataSource;
    }
    this.setState(st);
  }

  handleDeleteItem = (e, items) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onDeleteItem(items || this.state.dataSource);
  };

  renderItem = (i) => {
    const { render, titleKey, rowKey } = this.props;

    const item = this.state.dataSource[i];

    return (
      <li
        className="list-comp-item" data-key={item[rowKey]}
        title={item[titleKey]}
        key={item[rowKey]}
      >
        <span className="list-comp-item-body">{render ? render(item) : item.title}</span>
        <a role="presentation" className="list-comp-clear-item" onClick={(e) => this.handleDeleteItem(e, [item])}>
          <Icon type="close"/>
        </a>
      </li>
    );
  };

  render() {
    const { prefixCls, notFoundContent, style } = this.props;

    const listCls = classNames({
      [prefixCls]: true
    });

    const unit = 'article';

    return (
      <div className={listCls} style={style}>
        <div className={`${prefixCls}-header`}>
          <span className={`${prefixCls}-header-selected`}>
            <span>
              {this.state.dataSource.length} {unit}
            </span>
            <span className={`${prefixCls}-header-title`}>
              <a role="presentation" className={`${prefixCls}-clear-all`} onClick={(e) => this.handleDeleteItem(e)}>
                Delete all
              </a>
            </span>
          </span>
        </div>
        <div className={`${prefixCls}-body`}>
          <div className={`${prefixCls}-body-content`}>
            {!!this.state.dataSource.length || <div className={`${prefixCls}-body-content-not-found`}>{notFoundContent || 'List is empty'}</div>}
            {this.state.dataSource.map((item, i) => this.renderItem(i, item[this.props.rowKey]))}
          </div>
        </div>
      </div>
    );
  }
}

List.defaultProps = {
  prefixCls: 'antui-transfer-tree-list',
  dataSource: [],
  rowKey: 'key',
  onDeleteItem: noop,
};

List.propTypes = {
  prefixCls: PropTypes.string,
  dataSource: PropTypes.array,
  notFoundContent: PropTypes.string,
  titleKey: PropTypes.string,
  rowKey: PropTypes.string,
  style: PropTypes.object,
  render: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default List

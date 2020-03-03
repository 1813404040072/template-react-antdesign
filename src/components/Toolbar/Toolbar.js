import React from 'react';
import { Icon, Button } from 'antd';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './style/index.less';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openPullDown: false
    };
  }

  togglePullDown = e => {
    const { openPullDown } = this.state;
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      openPullDown: !openPullDown
    });
  };

  render() {
    const {
      prefixCls,
      className,
      appendLeft,
      pullDownExclude,
      childrenClassName,
      children,
      pullDown,
    } = this.props;

    return (
      <div className={cx(prefixCls, className)}>
        <div className="content-box">
          <div className="top-panel">
            <div className="left-btn-div">{appendLeft}</div>
            <div
              className={cx(childrenClassName, {
                'toolbar-right-out': pullDownExclude && this.state.openPullDown
              })}
            >
              {children}
            </div>
            <div className="pulldown-handle-small">
              {pullDown ? (
                <Button onClick={e => this.togglePullDown(e)}>
                  <Icon
                    type={this.state.openPullDown ? 'caret-up' : 'caret-down'}
                  />
                  {this.state.openPullDown ? 'collapse' : 'Expand'}
                </Button>
              ) : null}
            </div>
          </div>
          {pullDown ? (
            <div
              className={cx('pulldown-panel', {
                open: this.state.openPullDown
              })}
            >
              <span
                role="presentation"
                className="pulldown-handle"
                title={this.state.openPullDown ?  'collapse' : 'Expand'}
                onClick={e => this.togglePullDown(e)}
              >
                <Icon
                  type={this.state.openPullDown ? 'caret-up' : 'caret-down'}
                />
                {this.state.openPullDown ? 'collapse' : 'Expand'}
              </span>
              <div className="pulldown-body">{pullDown}</div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

Toolbar.propTypes = {
  appendLeft: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  childrenClassName: PropTypes.string,
  prefixCls: PropTypes.string,
  pullDown: PropTypes.any,
  pullDownExclude: PropTypes.bool,
};

Toolbar.defaultProps = {
  pullDownExclude: true,
  childrenClassName: 'toolbar-right',
  prefixCls: 'antui-toolbar-box'
};

export default Toolbar

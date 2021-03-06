import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import classNames from 'classnames';
import List from './List';
import ListTree from './ListTree';
import './style/index.less';

function noop() {}

class TransferTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftFilter: '',
      rightFilter: '',
      dataSource: props.dataSource,
      targetNodes: props.targetNodes,
      selectedKeys: props.targetNodes
        ? props.targetNodes.map(node => node[props.treeKey])
        : null
    };
    if (props.showSearch) {
      this.flatTreeData = this.getFlatTreeData(props.dataSource);
    }
  }

  getFlatTreeData(treeData) {
    let data = [];
    treeData.forEach(item => {
      if (item.children) {
        data = data.concat(this.getFlatTreeData(item.children));
      } else {
        data.push(item);
      }
    });
    return data;
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    const { targetNodes, dataSource } = nextProps;
    if (
      nextProps.targetNodes !== this.props.targetNodes ||
      nextProps.dataSource !== this.props.dataSource
    ) {
      if (targetNodes) {
        this.setState({
          targetNodes,
          selectedKeys: targetNodes.map(node => node[nextProps.treeKey])
        })
      }
      if (dataSource) {
        this.setState({
          dataSource
        });
      }
      if (nextProps.showSearch) {
        this.flatTreeData = this.getFlatTreeData(dataSource);
      }
    }
  }

  handleFilter = (direction, v) => {
    this.setState({
      [`${direction}Filter`]: v
    });
  };

  handleLeftFilter = v => this.handleFilter('left', v);

  handleRightFilter = v => this.handleFilter('right', v);

  handleClear = direction => {
    this.setState({
      [`${direction}Filter`]: ''
    });
  };

  handleRightClear = () => this.handleClear('right');

  handleDeleteItem = nodes => {
    const { treeKey } = this.props;
    const { targetNodes } = this.state;
    const targets = targetNodes.filter(
      node => !nodes.some(item => item[treeKey] === node[treeKey])
    );
    const targetKeys = targets.map(node => node[treeKey]);

    this.setState({
      selectedKeys: targetKeys,
      targetNodes: targets
    });

    this.props.onChange && this.props.onChange(targetKeys, targets);
  };

  onTreeSelected = selectedNodes => {
    const { treeKey, treeTitleKey } = this.props;
    const targetNodes = selectedNodes.map(node => ({
      [treeKey]: node[treeKey],
      [treeTitleKey]: node[treeTitleKey],
      ...node.props
    }));

    const targetKeys = targetNodes.map(node => node[treeKey]);

    this.setState({
      selectedKeys: targetKeys,
      targetNodes
    });

    this.props.onChange && this.props.onChange(targetKeys, targetNodes);
  };

  render() {
    const {
      prefixCls,
      titleText,
      showSearch,
      notFoundContent,
      treeKey,
      treeTitleKey,
      searchPlaceholder,
      footer,
      listStyle,
      className,
      listRender,
      treeRender,
      loadData,
      loading,
      asyncSearch
    } = this.props;
    const { leftFilter, rightFilter, selectedKeys, targetNodes, dataSource } = this.state;

    const cls = classNames({
      [className]: !!className,
      [prefixCls]: true
    });

    return (
      <div className={cls}>
        <ListTree
          titleText={titleText}
          loadData={loadData}
          asyncSearch={asyncSearch}
          treeData={dataSource}
          flatTreeData={this.flatTreeData}
          selectedKeys={selectedKeys}
          selectedNodes={targetNodes}
          treeKey={treeKey}
          treeTitleKey={treeTitleKey}
          treeRender={treeRender}
          style={listStyle}
          filter={leftFilter}
          handleFilter={this.handleLeftFilter}
          onTreeSelected={this.onTreeSelected}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
          notFoundContent={notFoundContent}
          footer={footer}
          prefixCls={`${prefixCls}-list`}
          loading={loading}
        />
        <div className={`${prefixCls}-operation`}>
          <Icon type="right" />
        </div>
        <List
          filter={rightFilter}
          dataSource={targetNodes}
          style={listStyle}
          onDeleteItem={this.handleDeleteItem}
          render={listRender}
          notFoundContent={notFoundContent}
          prefixCls={`${prefixCls}-list`}
        />
      </div>
    );
  }
}

TransferTree.defaultProps = {
  prefixCls: 'antui-transfer-tree',
  dataSource: [],
  onChange: noop,
  titleText: 'Source list',
  treeKey: 'key',
  treeTitleKey: 'title',
  showSearch: false,
  footer: noop,
  loading: false,
};

TransferTree.propTypes = {
  prefixCls: PropTypes.string,
  dataSource: PropTypes.array,
  targetNodes: PropTypes.array,
  onChange: PropTypes.func,
  listStyle: PropTypes.object,
  listRender: PropTypes.func,
  treeKey: PropTypes.string,
  treeTitleKey: PropTypes.string,
  className: PropTypes.string,
  titleText: PropTypes.string,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  notFoundContent: PropTypes.node,
  footer: PropTypes.func,
  treeRender: PropTypes.func,
  loadData: PropTypes.func,
  loading: PropTypes.bool,
  asyncSearch: PropTypes.func,
};

export default TransferTree;

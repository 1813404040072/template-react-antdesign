import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Spin } from 'antd';
import intl from 'react-intl-universal';
import Search from './Search';
import messages from './messages';
function noop() {}

class ListTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      searchList: [],
    };
  }

  handleFilter = value => {
    this.renderFilterResult(value);
    this.props.handleFilter(value);
  };

  handleClear = () => {
    this.renderFilterResult('');
    this.props.handleFilter('');
  };

  renderTreeNodes = data => {
    const { treeKey, treeTitleKey } = this.props;

    return data.map(item => {
      const treeProps = {
        ...item,
        key: item[treeKey],
        title: item[treeTitleKey],
        dataRef: item
      };

      if (item.children) {
        return (
          <Tree.TreeNode {...treeProps}>
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode {...treeProps} />;
    });
  };

  renderFilterResult = filter => {
    const { flatTreeData, treeTitleKey, asyncSearch } = this.props;
    if (asyncSearch) {
      const promise = asyncSearch(filter);
      if (promise.then) {
        promise.then(listItem => {
          this.setState({
            searchList: listItem
          });
        });
      }
    } else {
      this.setState({
        searchList: flatTreeData.filter(
          item => item[treeTitleKey].indexOf(filter) >= 0
        )
      });
    }
  };

  renderSearchItem = searchList =>
    searchList.map((item) => (
      <li
        role="presentation"
        className="list-comp-item"
        title={item[this.props.treeTitleKey]}
        key={item[this.props.treeKey]}
        onClick={() => this.handleSelect(item)}
      >
        <span className="list-comp-item-body">
          {item[this.props.treeTitleKey]}
        </span>
      </li>
    ));

  handleSelect = selectedItem => {
    const { selectedKeys, selectedNodes, treeKey } = this.props;
    let _selectedNodes = selectedNodes ? [...selectedNodes] : [];

    if (
      selectedKeys &&
      selectedKeys.some(key => key === selectedItem[treeKey])
    ) {
      _selectedNodes = _selectedNodes.filter(
        item => item[treeKey] !== selectedItem[treeKey]
      );
    } else {
      _selectedNodes.push(selectedItem);
    }
    this.props.onTreeSelected(_selectedNodes);
  };

  onSelect = (_selectedKeys, info) => {
    const {
      selectedNodes,
      selectedKeys,
      loadData,
      onTreeSelected,
      treeKey
    } = this.props;
    if (info.selected && info.node.props.dataRef) {
      if (loadData && !info.node.props.dataRef.isLeaf) {
        this.onExpand([info.node.props.eventKey], info);
        return;
      } if (info.node.props.dataRef.children && info.node.props.dataRef.children.length) {
        this.onExpand([info.node.props.eventKey], info);
        return;
      }
    }
    // If it is asynchronous data, it needs to be combined with old data and de-duplicated.
    if (loadData) {
      let _selectedNodes = selectedNodes ? [...selectedNodes] : [];
      if (!info.selected) {
        // If the tree node is deselected, it is filtered first.
        _selectedNodes = _selectedNodes.filter(
          item => item[treeKey] !== info.node.props.eventKey
        );
      }
      const newNodes = selectedKeys
        ? _selectedNodes.concat(
          info.selectedNodes.filter(
            item => selectedKeys.indexOf(item[treeKey]) < 0
          )
        )
        : info.selectedNodes;
      onTreeSelected(newNodes);
    } else {
      onTreeSelected(info.selectedNodes);
    }
  };

  onExpand = (keys, info) => {
    const { expandedKeys } = this.state;
    if (info.event) {
      let concatKeys = [keys, expandedKeys].reduce(
        (prev, next) =>
          prev.filter(item => next.indexOf(item) === -1).concat(next)
      );
      if (
        expandedKeys.some(item => item === info.node.props.eventKey)
      ) {
        concatKeys = concatKeys.filter(
          item => item !== info.node.props.eventKey
        );
      }

      this.setState({ expandedKeys: concatKeys, autoExpandParent: false });
    } else {
      this.setState({ expandedKeys: keys, autoExpandParent: false });
    }
  };

  render() {
    const {
      prefixCls,
      loading,
      treeData,
      titleText,
      loadData,
      filter,
      showSearch,
      style,
      selectedKeys,
    } = this.props;

    const { expandedKeys, autoExpandParent, searchList } = this.state;

    const { searchPlaceholder, notFoundContent } = this.props;

    const showTree = (
      <Tree
        loadData={loadData}
        onSelect={this.onSelect}
        onExpand={this.onExpand}
        selectedKeys={selectedKeys || []}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        multiple
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );

    return (
      <div className={prefixCls} style={style}>
        <div className={`${prefixCls}-header tree-title`}>{titleText}</div>
        <div
          className={
            showSearch
              ? `${prefixCls}-body ${prefixCls}-body-with-search`
              : `${prefixCls}-body`
          }
        >
          {showSearch ? (
            <div className={`${prefixCls}-body-search-wrapper`}>
              <Search
                prefixCls={`${prefixCls}-search`}
                onChange={this.handleFilter}
                handleClear={this.handleClear}
                placeholder={searchPlaceholder || 'Enter search content'}
              />
            </div>
          ) : null}
          <div className={`${prefixCls}-body-content tree-content`}>
            {filter ? (
              <ul className="tree-filter-result">
                {this.renderSearchItem(searchList)}
              </ul>
            ) : null}
            {treeData.length ? (
              showTree
            ) : (
              <div className={`${prefixCls}-body-content-not-found`}>
                {loading ? (
                  <Spin spinning={loading} />
                ) : (
                  notFoundContent || intl.formatMessage(messages.emptyList)
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ListTree.defaultProps = {
  titleText: '',
  treeKey: 'key',
  treeTitleKey: 'title',
  showSearch: false,
  handleClear: noop,
  handleFilter: noop,
};

ListTree.propTypes = {
  prefixCls: PropTypes.string,
  treeData: PropTypes.array,
  selectedKeys: PropTypes.array,
  showSearch: PropTypes.bool,
  loadData: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  titleText: PropTypes.string,
  treeKey: PropTypes.string,
  treeTitleKey: PropTypes.string,
  style: PropTypes.object,
  selectedNodes: PropTypes.array,
  handleClear: PropTypes.func,
  notFoundContent: PropTypes.string,
  filter: PropTypes.string,
  handleFilter: PropTypes.func,
  treeRender: PropTypes.func,
  asyncSearch: PropTypes.func,
  onTreeSelected: PropTypes.func,
  loading: PropTypes.bool,
  flatTreeData: PropTypes.array
};

export default ListTree;

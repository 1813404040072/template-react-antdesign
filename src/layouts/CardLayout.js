import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Layout, Menu } from 'antd';
import { Switch, routerRedux, Link } from 'dva/router';
import PropTypes from 'prop-types';
// import pathToRegexp from 'path-to-regexp';
import ElementQueries from 'css-element-queries/src/ElementQueries';
import $$ from 'cmn-utils';
import cx from 'classnames';

import { routerLinks } from "../routes/constant";
import SkinToolbox from '../components/SkinToolbox';
import Icon from '../components/Icon';
import './styles/basic.less';
import './styles/card.less';
const { Content, Header } = Layout;
const {SubMenu} = Menu;

/**
 * Horizontal menu department
 */
@connect(({ global }) => ({ global }))
class CardLayout extends PureComponent {
  constructor(props) {
    super(props);
    // const user = $$.getStore('user', []);
    const theme = $$.getStore('theme', {
      leftSide: 'dark', // left
      navbar: 'light' // top
    });
    if (!theme.layout) {
      theme.layout = [
        'fixedHeader',
        'fixedSidebar',
        'fixedBreadcrumbs'
        // 'hidedBreadcrumbs',
      ];
    }
    this.state = {
      theme, // Skin settings
      // user,
      // currentMenu: {}
    };
  }

  componentDidMount() {
    // Check if the owner is logged in
    const user = $$.getStore('user');
    const { match, dispatch } = this.props

    if (!user) {
      const link = routerLinks['Login'].replace(routerLinks['TypeRouter'],`/${match.params.type}/`);
      this.props.dispatch(routerRedux.replace(link));
    }
    ElementQueries.init();
    dispatch({
      type: 'global/getMenu',
      payload: { typeRouter: match.params.type }
    });
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (
  //     nextProps.location.pathname !== this.props.location.pathname ||
  //     nextProps.global.flatMenu !== this.props.global.flatMenu
  //   ) {
  //     this.setState({
  //       currentMenu: this.getCurrentMenu(nextProps) || {}
  //     });
  //   }
  // }

  // getCurrentMenu(props) {
  //   const {
  //     location: { pathname },
  //     global
  //   } =
  //     props || this.props;
  //   const menu = this.getMeunMatchKeys(global.flatMenu, pathname)[0];
  //   return menu;
  // }

  // getMeunMatchKeys = (flatMenu, path) => flatMenu.filter(item => pathToRegexp(item.path).test(path));

  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <Icon antd type={item.icon} />
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    }
    return (
      <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
    );

  };

  /**
   * Determine if it is an http link. Return Link or a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const itemPath = this.conversionPath(item.path);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          <Icon antd type={item.icon} />
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
      >
        <Icon antd type={item.icon} />
        <span>{name}</span>
      </Link>
    );
  };

  /**
   *Get menu subnode
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item);
  };

  // Conversion path
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');

  };

  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const {
      location: { pathname },
      global
    } = this.props;

    const selectMenu = this.getMeunMatchKeys(global.flatMenu, pathname)[0];
    return selectMenu ? [selectMenu.path] : [];
  };

  onChangeTheme = theme => {
    $$.setStore('theme', theme);
    this.setState({
      theme
    });
  };

  render() {
    const { theme } = this.state;
    const { routerData, global } = this.props;
    const { menu } = global;
    const { childRoutes } = routerData;
    const classnames = cx('card-layout', 'full-layout', {
      fixed: theme.layout && theme.layout.indexOf('fixedSidebar') !== -1,
      'fixed-header':
        theme.layout && theme.layout.indexOf('fixedHeader') !== -1,
      'fixed-breadcrumbs':
        theme.layout && theme.layout.indexOf('fixedBreadcrumbs') !== -1,
      'hided-breadcrumbs':
        theme.layout && theme.layout.indexOf('hidedBreadcrumbs') !== -1
    });

    return (
      <Layout className={classnames}>
        <Header>
          <Menu
            onClick={this.handleClick}
            mode="horizontal"
            selectedKeys={this.getSelectedMenuKeys()}
            theme={theme.leftSide}
          >
            {this.getNavMenuItems(menu)}
          </Menu>
        </Header>
        <Content className="router-page">
          <Switch>{childRoutes}</Switch>
        </Content>
        <SkinToolbox onChangeTheme={this.onChangeTheme} theme={theme} />
      </Layout>
    );
  }
}

CardLayout.propTypes = {
  routerData: PropTypes.object,
  global: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

export default CardLayout;

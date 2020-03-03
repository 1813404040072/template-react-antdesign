import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import { Switch, routerRedux } from 'dva/router';
import PropTypes from 'prop-types';

import './styles/user.less';
import { routerLinks } from '../routes/constant';

const { Content } = Layout;

@connect()
class UserLayout extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { match, dispatch } = this.props
    if (routerLinks['arrayType'].indexOf(match.params.type) === -1) {
      const link = routerLinks['Pages404'].replace(routerLinks['TypeRouter'],`/${match.params.type}/`);
      dispatch(routerRedux.replace(link));
    }
  }

  render() {
    const {routerData} = this.props;
    const {childRoutes} = routerData;

    return (
      <Layout className="full-layout user-layout fixed">
        <Content>
          <Switch>{childRoutes}</Switch>
        </Content>
      </Layout>
    );
  }
}

UserLayout.propTypes = {
  routerData: PropTypes.object,
};

export default UserLayout;

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import { isEmpty } from 'lodash';
import Home from './home';

class Main extends PureComponent {
  componentWillReceiveProps({ notification }) {
    if (!isEmpty(notification)) {
      notification[notification.type]({
        message: notification.message,
      });
    }
  }

  render() {
    return (
      <Layout
        style={{
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Route path="/" component={Home} />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  notification: state.notification,
});

export default connect(mapStateToProps)(Main);

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import notificationActions from '~/store/actions/notification';

const Home = ({ notify }) => (
  <div>
    <p>Home</p>
    <Button
      onClick={() => notify.success('Test Notification')}
    >
      Notification
    </Button>
  </div>
);

Home.propTypes = {
  notify: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  notify: bindActionCreators(notificationActions, dispatch),
});

export default connect(null, mapDispatchToProps)(Home);

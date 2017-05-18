import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import notificationActions from '~/store/actions/notification';
import messageActions from '~/store/actions/message';

const Home = ({ notify, message }) => (
  <div>
    <p>Home</p>
    <Button
      onClick={() => notify.success('Test Notification')}
    >
      Notification
    </Button>
    <Button
      onClick={() => message.info('Test Message')}
    >
      Message
    </Button>
  </div>
);

Home.propTypes = {
  notify: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  message: bindActionCreators(messageActions, dispatch),
  notify: bindActionCreators(notificationActions, dispatch),
});

export default connect(null, mapDispatchToProps)(Home);

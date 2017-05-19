import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Progress } from 'antd';
import notificationAction from '~/store/actions/notification';
import messageAction from '~/store/actions/message';
import actions from '~/store/actions';
import EmptyContent from '~/views/components/empty-content';

const style = {
  button: {
    marginLeft: 5,
    marginRight: 5,
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

const Home = ({ notify, message, percent, increment, decrement }) => (
  <EmptyContent
    title="Start Application"
    description="Wellcome to startkit application"
    icon="poweroff"
  >
    <div style={style.container}>
      <Progress percent={percent} />
      <div>
        <Button
          style={style.button}
          onClick={() => notify.success('Test Notification')}
        >
          Notification
        </Button>
        <Button
          style={style.button}
          onClick={() => message.success('Test Message', 10)}
        >
          Message
        </Button>
        <Button.Group style={{ ...style.button, marginTop: 30 }}>
          <Button onClick={decrement} icon="minus" />
          <Button onClick={increment} icon="plus" />
        </Button.Group>
      </div>
    </div>
  </EmptyContent>
);

Home.propTypes = {
  decrement: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  percent: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  percent: state.progress,
});

const mapDispatchToProps = dispatch => ({
  message: bindActionCreators(messageAction, dispatch),
  notify: bindActionCreators(notificationAction, dispatch),
  increment: () => dispatch(actions.progress.increment()),
  decrement: () => dispatch(actions.progress.decrement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

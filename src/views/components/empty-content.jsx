import React, { PropTypes } from 'react';
import { Icon } from 'antd';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    flex: '1 0 auto',
    position: 'absolute',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#999',
  },
  icon: {
    fontSize: 40,
    marginBottom: 20,
  },
};

const EmptyContent = ({ children, title, description, icon }) => (
  <div style={styles.container}>
    <div style={styles.header}>
      {icon && (<Icon type={icon} style={styles.icon} />)}
      {title && (<h2>{title}</h2>)}
      {description && (<h3 style={{ fontWeight: 'normal' }}>{description}</h3>)}
    </div>
    {children}
  </div>
);

EmptyContent.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
};

EmptyContent.defaultProps = {
  children: null,
  title: null,
  description: null,
  icon: null,
};

export default EmptyContent;

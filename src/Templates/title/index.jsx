import React from 'react';
import PropTypes from 'prop-types';
import s from './title.module.css';
import OctoCat from '../../images/cat.png';

const Title = ({ title }) => (
  <div className={s.wrapper_title}>
    <div className={s.title_img}>
      <img src={OctoCat} alt="octocat" />
    </div>
    <h3 className={s.title}>{title}</h3>
  </div>

);

Title.propTypes = {
  title: PropTypes.string,
};
Title.defaultProps = {
  title: 'Simple title',
};

export default Title;

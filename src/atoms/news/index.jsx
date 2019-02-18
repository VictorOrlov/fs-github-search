import React from 'react';
import PropTypes from 'prop-types';
import starLogo from '../../images/star.svg';
import codingLogo from '../../images/coding.svg';
import s from './news.module.css';

const NewsPost = ({
  url, fullName, starsCount, description, topics, lang,
}) => (
  <div className={s.newsPost}>
    <div className={s.name_and_stars}>
      <div className={s.name}>
        <a href={url}>{fullName}</a>
      </div>
      <div className={s.star}>
        <div className={s.star_logo}>
          <img src={starLogo} alt="" />
        </div>
        {starsCount}
      </div>
    </div>
    <div className={s.news_desc}>
      <p>
        {description}
        {' '}
      </p>
      <ul>
        {topics.map(item => (<li key={item}><span>{item}</span></li>))}
      </ul>
    </div>
    <div className={s.news_language}>
      <div className={s.star_logo}>
        <img src={codingLogo} alt="" />
      </div>
      {lang}
    </div>
  </div>
);

NewsPost.propTypes = {
  url: PropTypes.string,
  fullName: PropTypes.string,
  starsCount: PropTypes.number,
  description: PropTypes.string,
  topics: PropTypes.node,
  lang: PropTypes.string,
};

NewsPost.defaultProps = {
  url: '#',
  fullName: 'Full Name',
  starsCount: 0,
  description: '',
  topics: {},
  lang: '',
};

export default NewsPost;

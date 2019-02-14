import React from 'react';
import PropTypes from 'prop-types';
import s from './input.module.css';

const Input = ({
  onChange, value, onKeyPress, renderSuggestions,
}) => (
  <div className={s.inputWrapper}>
    <i className={s.fa_search} />
    <input
      className={s.input}
      placeholder="Click to search"
      onChange={onChange}
      onKeyPress={onKeyPress}
      value={value}
    />
    {renderSuggestions}
  </div>
);


Input.propTypes = {
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  value: PropTypes.string,
  renderSuggestions: PropTypes.node,
};

Input.defaultProps = {
  onChange: () => {},
  onKeyPress: () => {},
  value: '',
  renderSuggestions: () => {},
};

export default Input;

import React, { Component } from 'react';
import Title from '../../atoms/title';
import Input from '../../atoms/input-search';
import s from './HomePage.module.css';

export default class HomePage extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <Title title="GitHub Search" />
        <Input/>
      </div>
    );
  }
}

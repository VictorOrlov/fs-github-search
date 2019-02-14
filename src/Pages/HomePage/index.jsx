import React, { Component } from 'react';
import Title from '../../Templates/title';
import Input from '../../Templates/input-search';
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

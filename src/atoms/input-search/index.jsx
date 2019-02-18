import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import s from './input.module.css';
  
class Select extends React.Component {
  state = {
    availableOptions: [],
    selectedOption: null,
  };

  fetchTopics = (inputValue) => {
    return axios
      .get(`https://api.github.com/search/topics?q=${inputValue}&sort=stars&per_page=15`,
        {
          headers: {
            Accept: 'application/vnd.github.mercy-preview+json'
          }
        })
      .then(response => {
        return response.data.items.map(elem => {return { value: elem.name, label: elem.name }})
      })
      .catch((error) => {
          console.log(error);
      });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    const { history } = this.props;
    history.push({ pathname: `/${selectedOption.value}`, state: { topic: selectedOption.value }});
  }
  
  render() {
    return (
      <div className={s.inputWrapper}>
        <AsyncSelect 
        className={s.Select}
        cacheOptions 
        defaultOptions 
        loadOptions={ this.fetchTopics } 
        onChange={this.handleChange}
      />
      </div>
    );
  }
}

export default withRouter(Select);



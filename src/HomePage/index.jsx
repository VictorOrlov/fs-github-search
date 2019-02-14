import React, { Component } from 'react';
import axios from 'axios';
import Title from '../Templates/title';
import NewsPost from '../Templates/news';
import topicsList from '../topics';
import Input from '../Templates/input-search';
import s from './HomePage.module.css';

const BASE_PATCH = 'https://api.github.com';
const SEARCH_T_PATCH = '/search/repositories';
const SEARCH_PARAM = 'q=';
const PAGE_HITS = 'per_page=';

export default class HomePage extends Component {
  state = {
    suggestions: [],
    searchQuery: '',
    result: [],
    hitsPerPage: 10,
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const { searchQuery, hitsPerPage } = this.state;
    this.setState({
      result: [],
      loading: true,
      error: false,
    });
    axios
      .get(`${BASE_PATCH}${SEARCH_T_PATCH}?${SEARCH_PARAM}${searchQuery}&order=desc&sort=stars&${PAGE_HITS}${hitsPerPage}`, {
        headers: {
          Accept: 'application/vnd.github.mercy-preview+json',
        },
      })
      .then((response) => {
        this.setState(() => ({
          loading: false,
          result: response.data.items,
        }));
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  };

  handleInputChange = ({ target: { value } }) => {
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = topicsList.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions, searchQuery: value }));
  }

  getSearch = ({ key }) => {
    if (key === 'Enter') {
      const { searchQuery, hitsPerPage } = this.state;
      this.fetch(searchQuery, hitsPerPage, 0);
    }
  }

  suggestionsSelected(value) {
    const { searchQuery, hitsPerPage } = this.state;
    this.fetch(searchQuery, hitsPerPage, 0);
    this.setState(() => ({
      searchQuery: value,
      suggestions: [],
    }));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul className={s.autocomplite}>
        {suggestions.map((item, index) => <li key={index} onClick={() => this.suggestionsSelected(item)}>{item}</li>)}
      </ul>
    );
  }

  render() {
    const {
      searchQuery, result, loading, error,
    } = this.state;
    const renderRepos = Object.keys(result).map(item => (
      <li key={result[item].id}>
        <NewsPost
          url={result[item].html_url}
          fullName={result[item].full_name}
          starsCount={result[item].stargazers_count}
          description={result[item].description}
          topics={result[item].topics}
          lang={result[item].language}
        />
      </li>
    ));

    console.log(result);

    return (
      <div className={s.wrapper}>
        <Title title="GitHub Search" />
        <Input
          onKeyPress={this.getSearch}
          onChange={this.handleInputChange}
          value={searchQuery}
          renderSuggestions={this.renderSuggestions()}
        />
        {loading && 'Loading...'}
        {!loading && !error && result.length === 0 && 'Пусто, не густо'}
        {error && (
          <div>
            <p>Write the word in the search engine and press Enter</p>
          </div>
        )}
        <ul className={s.newsList}>
          {renderRepos}
        </ul>
      </div>
    );
  }
}

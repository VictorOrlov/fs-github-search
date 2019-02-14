import React, { Component } from 'react';
import axios from 'axios';
import Title from '../../Templates/title';
import TopNews from '../../Templates/news';
import s from './TopicPage.module.css';
import BtnParall from '../../atoms/btnParall/BtnParall';

const BASE_PATCH = 'https://api.github.com';
const SEARCH_T_PATCH = '/search/repositories';
const SEARCH_PARAM = 'q=';
const PAGE_HITS = 'per_page=';

export default class HomePage extends Component {
  state = {
    searchQuery: this.props.location.state.topic,
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
      });
  };

  render() {
    const {
      result, loading, error,
    } = this.state;
    const renderRepos = Object.keys(result).map(item => (
      <li key={result[item].id}>
        <TopNews
          url={result[item].html_url}
          fullName={result[item].full_name}
          starsCount={result[item].stargazers_count}
          description={result[item].description}
          topics={result[item].topics}
          lang={result[item].language}
        />
      </li>
    ));
    return (
      <div className={s.wrapper}>
        <Title title="GitHub Result" />
        <BtnParall link="/">Back to search</BtnParall>
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
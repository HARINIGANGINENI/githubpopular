import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiUrl = 'https://apis.ccbp.in/popular-repos?language=ALL'

class GithubPopularRepos extends Component {
  state = {
    isLoading: true,
    repositoriesData: [],
    selectedLanguageFilter: 'ALL',
  }

  componentDidMount() {
    this.getRepositories(languageFiltersData[0].id)
  

  getRepositories = async selectedLanguageFilter => {
    this.setState({isLoading: true})
    const response = await fetch(`${apiUrl} ${selectedLanguageFilter}`)
    const fetchedData = await response.json()
    const updatedData = fetchedData.popular_repos(eachRepository => ({
      id: eachRepository.id,
      name: eachRepository.name,
      issuesCount: eachRepository.issues_count,
      forksCount: eachRepository.forks_count,
      stars_count: eachRepository.stars_count,
      imageUrl: eachRepository.avatar_url,
    }))
    this.setState({isLoading: false, repositoriesData: updatedData})
  }

  renderRepositoriesList = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repositories-card-list-container">
        {repositoriesData.map(repositoryData => (
          <RepositoryItem
            key={repositoryData.id}
            repositoryData={repositoryData}
          />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testis="loader">
      <Loader type="ThreeDots" height={80} width={80} color="blue" />
    </div>
  )

  setSelectedLanguageFilter = newFilterId => {
    this.setState({selectedLanguageFilter: newFilterId})
    this.getRepositories(newFilterId)
  }

  renderLanguageFiltersList = () => {
    const {selectedLanguageFilter} = this.state

    return (
      <ul className="filters-list-container">
        {languageFiltersData.map(eachLanguageFilter => (
          <LanguageFilterItem
            key={eachLanguageFilter.id}
            languageFilter={eachLanguageFilter}
            isSelected={eachLanguageFilter.id === selectedLanguageFilter}
            setSelectedLanguageFilter={this.setSelectedLanguageFilter}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <div className="repository-container">
          <h1>Popular</h1>
          {this.renderLanguageFiltersList()}
          {isLoading ? this.renderLoader() : this.renderRepositoriesList()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos

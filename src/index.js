import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link,  browserHistory } from 'react-router';
import axios from 'axios';
import './styles/bootstrap.css';
import './index.css';


import Profile from './components/Profile';

var Header = React.createClass({ render: function(){ return(<div> <h2 className="text-center">Search For Github Repo </h2> <h3 className="text-center">Built with Reactjs and React router</h3></div>);}});

var Repo = React.createClass({
  getInitialState: function(){
    return{
      Repository: []
    }
  },
  search: function(query){
    var _this = this;
    var url = "https://api.github.com/search/repositories?q="+query;
    axios.get(url)
    .then(function (response) {
      _this.setState({Repository: response.data.items});
    });
  },
  onSubmit: function(e){
       e.preventDefault();
       var query = this.refs.query.value;
       if(query === '' || query === !NaN){
           alert("please enter a repo name");
       }else{
          this.search(query);
           query = '';
       }
   },
  render: function(){
    var repos = this.state.Repository.map(function(repo,index) {
      return (<GithubProfile repoItem={repo} key={index} />)
    });
    return(
      <div>
       <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6 col-md-offset-3">
          <Link to="Profile">Profile</Link>
            <Header/>
             <div className="search-form">
              <form onSubmit={this.onSubmit}>
               <input className="form-control" type="text" ref="query" placeholder="search for a github repo"/>
              </form>
              <div className="margin-top">
                {repos}
              </div>{/** house the list **/}
             </div>
           </div>
          </div>
        </div>
      </div>
    );
  }
});

var GithubProfile = React.createClass({
  render: function() {
    return(
        <div className="repo-list-item">
        <div className="row">
              <div className="col-xs-3">
              <img src={this.props.repoItem.owner.avatar_url} className="pull-left" alt="" width="100" height="100"/>
              </div>
              <div className="col-xs-9">
                <span> Repo Name: {this.props.repoItem.name}</span>
                <span> Created By: {this.props.repoItem.full_name}</span>
                <span> Url: {this.props.repoItem.url}</span>
                <span> Forks: {this.props.repoItem.forks}</span>
                <span> Language: {this.props.repoItem.language}</span>
              </div>
          </div>
        </div>

    );
  }
});
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Repo}>
      <Route path="Profile" component={Profile}></Route>
    </Route>
  </Router>,

  document.getElementById('root'));

import React from 'react';

var Profile = React.createClass({
  render: function(){
    return(
      <div>
       <h1>Welcome home</h1>
       {this.props.children}
      </div>
    );
  }
})


module.export = Profile;

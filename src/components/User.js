import React, { Component } from 'react';

class User extends Component {

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn(){
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().signInWithPopup(provider);
    }

  signOut(){
    this.props.firebase.auth().signOut();
  }



  render(){
    return(
      <div className="signin">
        <section>
          <h1>Sign in as {this.props.user ? this.props.user.displayName: "Guest"}</h1>
          </section>
        <section className="login-button">
          {
            this.props.user
            ? <button className="log-out" onClick={() => this.signOut()}>Log Out</button>
            : <button className="login" onClick={() => this.signIn()}>Login</button>
          }
          </section>
      </div>
    );
  }
}

export default User;

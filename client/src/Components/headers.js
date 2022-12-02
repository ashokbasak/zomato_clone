import React from "react";
import "../Styles/Filter.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loginModalIsOpen: false,
    };
  }

  handleModal = (state, value) => {
    this.setState({ [state]: value });
  };

  handleLogout = () => {
    window.open("http://localhost:5500/auth/logout", "_self");
  };

  google = () => {
    window.open("http://localhost:5500/auth/google", "_self");
  };

  github = () => {
    window.open("http://localhost:5500/auth/github", "_self");
  };

  render() {
    const { loginModalIsOpen, loggedInUser, isLoggedIn } = this.state;
    const { user } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark ml-auto">
          <div className="container-fluid">
            <div className="logoFilter">
              <b>aliments</b>
            </div>
            {!user ? (
              <nav className="d-flex ml-auto">
                <a
                  className="nav-link  text-white"
                  aria-current="page"
                  onClick={() => this.handleModal("loginModalIsOpen", true)}
                >
                  Login
                </a>

                <button className="btn  border-white" type="button">
                  Create an account
                </button>
              </nav>
            ) : (
              <nav className="d-flex ml-auto">
                <img src={user.photos[0].value} alt="" className="avatar" />
                <a className="nav-link text-white" aria-current="page">
                  &nbsp; {user.displayName}
                </a>
                &emsp;
                <button
                  className="btn btn-danger border-white"
                  type="button"
                  onClick={this.handleLogout}
                >
                  Logout
                </button>
              </nav>
            )}
          </div>
        </nav>
        <Modal isOpen={loginModalIsOpen} style={customStyles}>
          <div className="login">
            <h1 className="loginTitle">Choose a Login Method</h1>

            <div className="wrapper">
              <div className="left">
                <div className="loginButton google" onClick={this.google}>
                  <img src={"./images/google.png"} alt="" className="icon" />
                  Google
                </div>

                <div className="loginButton github" onClick={this.github}>
                  <img src={"./images/google.png"} alt="" className="icon" />
                  Github
                </div>
              </div>
              <div className="center">
                <div className="line" />
                <div className="or">OR</div>
              </div>
              <div className="right">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => this.handleModal("loginModalIsOpen", false)}
                >
                  Back
                </button>
                {/* <input type="text" placeholder="Username" />
                <input type="text" placeholder="Password" />
                <button className="submit">Login</button> */}
              </div>
            </div>
          </div>
          {/* <div>   
                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px', marginTop: '-20px' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                    
                    <div className="loginButton google" onClick={this.google}>
                        <img src="./auth/google.png" alt="" className="icon" />
                        &nbsp; Google
                    </div>
                    
                    <div className="loginButton github" onClick={this.github}>
                        <img src="./auth/github.png" alt="" className="icon" />
                        &nbsp; Github
                    </div>    
                        
                    </div>     */}
        </Modal>
      </div>
    );
  }
}
export default Header;

// Client ID: 689409423176-oltav82cvgciemhseu3c3jie30afaonl.apps.googleusercontent.com
// Client Secret: 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

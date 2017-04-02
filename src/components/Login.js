import React, { Component, PropTypes } from 'react';
import Spinner from '../components/Spinner';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
import Fade from 'react-bootstrap/lib/Fade';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '', fade: false };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ fade: true}), 200);
  }

  onKeydown = (ev) => {
    if (ev.keyCode === 13) {
      this.login();
    }
  };

  login = () => {
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
  };

  render() {
    return (
      <Fade in={this.state.fade}>
        <Grid style={{ marginTop: '5em' }}>
          <Col md={4} />
          <Col md={4}>
            <Form horizontal>

              <FormGroup validationState={this.props.error ? 'error' : null}>
                <ControlLabel srOnly>Username</ControlLabel>
                <FormControl
                  type="email"
                  placeholder="Email"
                  onKeyDown={this.onKeydown}
                  onChange={e => this.setState({ email: e.target.value })}
                  style={{ padding: '.8em', height: 'auto' }}
                />
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup validationState={this.props.error ? 'error' : null}>
                <ControlLabel srOnly>Password</ControlLabel>
                <FormControl
                  type="password"
                  placeholder="Password"
                  onKeyDown={this.onKeydown}
                  onChange={e => this.setState({ password: e.target.value })}
                  style={{ padding: '.8em', height: 'auto' }}
                />
                <FormControl.Feedback />

                <Button
                  onClick={this.login}
                  disabled={this.props.isFetching}
                  style={{
                    padding: '.8em',
                    width: '100%',
                    marginTop: '2em',
                    backgroundColor: '#c3040c',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ flex: 1 }}>Login</div>
                  <Spinner visible={this.props.isFetching} scale={.5} />
                </Button>

                <HelpBlock>{this.props.error}</HelpBlock>

              </FormGroup>
            </Form>
          </Col>
          <Col md={4} />
        </Grid>
      </Fade>
    );
  }
}

Login.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  login: PropTypes.func.isRequired,
};

export default Login;
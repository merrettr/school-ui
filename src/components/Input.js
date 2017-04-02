import React, {Component} from "react";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import Spinner from './Spinner';

class Input extends Component {
  state = { search: '' };

  onKeydown = ev => {
    if (ev.keyCode === 13) {
      this.search();
    }
  };

  search = () => {
    const { onConfirm } = this.props;
    onConfirm(this.state.search);

    this.setState({ search: '' });
  };

  render() {
    const {
      type,
      placeholder,
      confirmation,
      isLoading,
    } = this.props;

    return <Grid fluid>
      <Row>
        <Col xs={12} md={10} style={{ margin: '.5em 0 .5em 0' }}>
          <FormControl
            type={type || 'text'}
            placeholder={placeholder}
            onKeyDown={this.onKeydown}
            value={this.state.search}
            onChange={e => this.setState({ search: e.target.value })}
          />
        </Col>

        <Col xs={12} md={2} style={{ margin: '.5em 0 .5em 0' }}>
          {isLoading ?
            <Spinner />
            : <Button style={{
              width: '100%',
              backgroundColor: '#c3040c',
              color: '#fff',
            }}
            onClick={this.search}
          >
            {confirmation}
          </Button>}
        </Col>
      </Row>
    </Grid>;
  }
}

export default Input;
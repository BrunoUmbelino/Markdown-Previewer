import React from "react";
import { Row, Col, Container, Input, Label } from "reactstrap";

export class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textEditor: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ textEditor: value });
  }

  componentDidMount() {
    fetch("testData.txt")
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        this.setState({ textEditor: text });
      });
  }

  render() {
    const marked = window.marked;
    marked.setOptions({
      breaks: true,
    });
    return (
      <div className="main">
        <Container>
          <Row className="title justify-content-center">
            <h1>Markdown Previewer</h1>
          </Row>
          <Row className="col-container">
            <Col md={6}>
              <Label className="label" for="editor ">
                <h3>Editor</h3>
              </Label>
              <Input
                id="editor"
                type="textarea"
                name="textarea"
                rows="15"
                value={this.state.textEditor}
                onChange={this.handleChange}
              />
            </Col>
            <Col md={6}>
              <Label className="label" for="preview">
                <h3>Preview</h3>
              </Label>
              <div
                id="preview"
                dangerouslySetInnerHTML={{
                  __html: marked(this.state.textEditor),
                }}
              ></div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <div className="by">By Bruno Umbelino</div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default MainComponent;

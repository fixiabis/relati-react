import React from 'react';
import './main-page.scss';
import { Page } from '../Page';
import { Button, ButtonGroup } from '../Button';
import { Redirect } from 'react-router';

class MainPage extends React.Component<any, { currentPath: string }> {
  constructor(props: any) {
    super(props);
    this.state = { currentPath: "" };
  }

  render() {
    if (this.state.currentPath) return <Redirect to={this.state.currentPath} />;

    return (
      <Page id="main-page">
        <div className="title">Relati</div>
        <ButtonGroup>
          <Button icon="play" onClick={e => this.setState({ currentPath: "/game" })} />
          <Button icon="help" onClick={e => this.setState({ currentPath: "/help" })} />
        </ButtonGroup>
      </Page>
    );
  }
}

export default MainPage;
import './main-page.scss';
import React from 'react';
import { Redirect } from 'react-router';
import { Page } from '../../components/Page';
import { Button, ButtonGroup } from '../../components/Button';

type MainPageState = { pathName: string };

export default class MainPage extends React.Component<any, MainPageState> {
  constructor(props: any) {
    super(props);
    this.state = { pathName: "" };
  }

  switchPathTo(pathName: string) {
    this.setState({ pathName });
  }

  render() {
    if (this.state.pathName) return <Redirect to={this.state.pathName} />;

    return (
      <Page id="main-page">
        <div className="title">Relati</div>
        <ButtonGroup>
          <Button icon="play" onClick={e => this.switchPathTo('/game')} />
          <Button icon="help" onClick={e => this.switchPathTo('/help')} />
        </ButtonGroup>
      </Page>
    );
  }
}

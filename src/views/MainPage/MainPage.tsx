import React from "react";
import { Redirect } from "react-router";
import { Button, ButtonGroup } from "../../components/Button";
import { Page } from "../../components/Page";
import "./main-page.scss";

interface MainPageState { pathName: string; }

export default class MainPage extends React.Component<any, MainPageState> {
  constructor(props: any) {
    super(props);
    this.state = { pathName: "" };
  }

  public switchPathTo(pathName: string) {
    this.setState({ pathName });
  }

  public render() {
    if (this.state.pathName) return <Redirect to={this.state.pathName} />;

    return (
      <Page id="main-page">
        <div className="title">Relati</div>
        <ButtonGroup>
          <Button icon="play" onClick={e => this.switchPathTo("/game")} />
          <Button icon="help" onClick={e => this.switchPathTo("/help")} />
        </ButtonGroup>
      </Page>
    );
  }
}

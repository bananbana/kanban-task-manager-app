import { Component } from "react";

import UserService from "../services/user.service";
import { AxiosError } from "axios";

type Props = object;

type State = {
  content: string;
};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data as string,
        });
      },
      (error: AxiosError) => {
        this.setState({
          content: error.message,
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}

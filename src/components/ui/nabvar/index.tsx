import React, { PureComponent } from "react";
import styles from "./navbar.module.scss";
import logo from "images/logo.png";
import Back from "../icons/back";
import { properties } from "data";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";

interface INavbarState {
  prevHistory: string;
}

class Navbar extends PureComponent<RouteComponentProps, INavbarState> {
  public state = {
    prevHistory: "",
  };

  private handleBackClick = () => {
    if (this.state.prevHistory) {
      this.props.history.goBack();
    } else {
      const id = this.props.location.pathname.split("/")[2];
      const property = properties.filter(
        (prop) => Number(prop.id) === Number(id)
      )[0];

      this.props.history.push(
        `/search?city=${property.city}&type=${property.type}&operation=${property.operations[0]}`
      );
    }
  };

  public componentDidUpdate(prevProps: RouteComponentProps) {
    this.setState({ prevHistory: prevProps.history.location.pathname });
  }

  public render() {
    //console.log(this.props.location);
    return (
      <nav className={styles.container}>
        <div className={styles.content}>
          <Link to="/">
            <img src={logo} height={45} width={200} alt="logo" />
          </Link>
          {this.props.location.pathname.includes("detail") && (
            <div className={styles.back} onClick={this.handleBackClick}>
              <Back />
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);

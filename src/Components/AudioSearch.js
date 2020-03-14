import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Button, Input, AutoComplete } from "antd";
import axios from "axios";

class AudioSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoFill: "",
      ayatNum: "",
      ayatName: "",
      alert: false
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handelSelect = this.handelSelect.bind(this);
  }

  componentWillMount() {
    axios
      .get("http://staging.quran.com:3000/api/v3/chapters")
      .then(res => {
        if (res.status === 200) {
          this.setState({ ayats: res.data.chapters });
        }
      })
      .catch(err => console.error(err));
  }

  AllSurahs() {
    const { ayats } = this.state;
    let allAyayts = [];
    ayats.forEach(ayat => {
      const ayatNumber = ayat.chapter_number.toString();
      allAyayts.push(
        ayatNumber + " " + ayat.name_simple + " " + ayat.name_arabic
      );
    });
    return allAyayts;
  }

  handelSelect(value) {
    const ayatDetails = value.split(" ");
    this.setState({ autoFill: value });
    this.setState({ ayatNum: ayatDetails[0] });
    this.setState({ ayatName: ayatDetails[1] });
    this.setState({ alert: false });
    console.log("value", value, ayatDetails);
  }

  handleClick() {
    if (this.state.autoFill === "") {
      this.setState({ alert: true });
    } else {
      this.setState({ alert: false });
    }
  }

  render() {
    return (
      <div>
        {!this.state.ayats ? (
          <div></div>
        ) : (
          <div style={{ display: "inline-block" }}>
            <AutoComplete
              size='default'
              style={{ width: 250, marginLeft: "1rem" }}
              dataSource={this.AllSurahs()}
              placeholder='Search Surah'
              filterOption={(inputValue, option) =>
                option.props.children
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
              onSelect={this.handelSelect}
            >
              <Input
                suffix={
                  <Link
                    to={{
                      pathname: !this.state.alert
                        ? `/QuranSurah/${this.state.ayatName}/${this.state.ayatNum}`
                        : window.location.pathname,
                      state: {
                        number: this.state.ayatNum,
                        name: this.state.ayatName
                      }
                    }}
                  >
                    <Button
                      onMouseDown={this.handleClick}
                      className='search-btn'
                      style={{ marginRight: -12 }}
                      size='default'
                      type={!this.state.alert ? "primary" : "danger"}
                    >
                      <Icon type='search' />
                    </Button>
                  </Link>
                }
              />
            </AutoComplete>
          </div>
        )}
      </div>
    );
  }
}
export default AudioSearch;

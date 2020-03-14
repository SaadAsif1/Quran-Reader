import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Button, Input, AutoComplete } from "antd";

class Search extends Component {
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

  AllSurahs() {
    const { ayats } = this.props;
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
      <div style={{ display: "inline-block" }}>
        <AutoComplete
          size='default'
          style={{ width: 300, marginLeft: "1rem" }}
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
                    : "/",
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
    );
  }
}

export default Search;

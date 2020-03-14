import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spin, Select, Layout, Button, Icon, Modal } from "antd";
import scrollIntoView from "scroll-into-view-if-needed";

import SurahAudio from "./SurahAudio";
import HelpModal from "./Help";
const { Option } = Select;
const { Header, Content, Footer } = Layout;

export class SingalSurah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      name: "",
      Reciter: "yasser_aldossary",
      currentAyat: "",
      ayatTranslation: "",
      boolTranslation: "Quran-Translation",
      fromAyat: "0",
      toAyat: ""
    };

    this.Change = this.Change.bind(this);
    this.SurahCurrentAyat = this.SurahCurrentAyat.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.fromAyat1 = this.fromAyat1.bind(this);
    this.toAyat2 = this.toAyat2.bind(this);
  }

  componentDidMount() {
    axios
      .all([
        axios.get(
          `http://quranapi.azurewebsites.net/api/chapter/${this.props.location.state.number}`
        ),
        axios.get(
          `http://quranapi.azurewebsites.net/api/chapter/${this.props.location.state.number}?lang=en`
        )
      ])
      .then(
        axios.spread((res, res1) => {
          this.setState({
            data: res.data,
            name: this.props.location.state.name,
            ayatTranslation: res1.data[0].Verses,
            toAyat: `${res.data[0].TotalAyahs}`
          });
        })
      )
      .catch(err => console.error(err));
  }

  Change(value) {
    this.setState({ Reciter: value });
  }

  SurahCurrentAyat(ayat) {
    let currentAyat = Number(ayat);
    this.setState({ currentAyat });
  }

  handleSwitch(value) {
    this.setState({ boolTranslation: value });
  }

  // modal
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  //modal

  fromAyat1(value) {
    let fromAyat = Number(value);
    let toAyat = Number(this.state.toAyat);

    if (toAyat < fromAyat) {
      this.setState({ fromAyat: value, toAyat: value });
    } else {
      this.setState({ fromAyat: value });
    }
  }

  toAyat2(value) {
    let toAyat = Number(value);
    let fromAyat = Number(this.state.fromAyat);

    if (toAyat < fromAyat) {
      this.setState({ fromAyat: value, toAyat: value });
    } else {
      this.setState({ toAyat: value });
    }
  }

  render() {
    return (
      <div>
        {!this.state.data ? (
          <div style={{ overflow: "hidden", position: "relative" }}>
            <Spin
              size='large'
              style={{
                margin: "auto",
                display: "block",
                marginTop: "25rem",
                overflowY: "hidden",
                padding: "1rem"
              }}
            />
          </div>
        ) : (
          <Layout style={{ background: "#F5F5F5" }}>
            {/* Header */}
            <Header
              style={{
                position: "fixed",
                zIndex: 1,
                width: "100%",
                lineHeight: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ marginLeft: "5rem" }}>
                <Link to='/'>
                  <Button type='primary'>
                    <Icon type='left' />
                    Back
                  </Button>
                </Link>
              </div>
              <div style={{ display: "flex", marginRight: "4rem" }}>
                {/* -------------------------OPTIONS MODAL-------------------------------------- */}
                <div style={{ marginRight: "1rem" }}>
                  <HelpModal />
                </div>
                {/* -------------------------OPTIONS MODAL-------------------------------------- */}
                <div style={{ display: "inline-block" }}>
                  <Button type='primary' shape='round' onClick={this.showModal}>
                    Options
                    <Icon type='setting' />
                  </Button>
                  <Modal
                    title={<h3 className='modalTitle'>Options</h3>}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button
                        key='submit'
                        type='primary'
                        onClick={this.handleOk}
                      >
                        Save
                      </Button>
                    ]}
                  >
                    <div>
                      <strong>
                        <label htmlFor='reciter'>Reciter : </label>
                      </strong>
                      <Select
                        showSearch
                        style={{ width: 250 }}
                        optionFilterProp='children'
                        onChange={this.Change}
                        value={this.state.Reciter}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value='abdullah_basfar'>abdullah_basfar</Option>
                        <Option value='ahmed_alajmy'>ahmed_alajmy</Option>
                        <Option value='ali_alhuthaify'>ali_alhuthaify</Option>
                        <Option value='khalefa_altunaiji'>
                          khalefa_altunaiji
                        </Option>
                        <Option value='maher_almuaiqly'>maher_almuaiqly</Option>
                        <Option value='mahmood_alhusary'>
                          mahmood_alhusary
                        </Option>
                        <Option value='saud_alshuraim'>saud_alshuraim</Option>
                        <Option value='shaik_abu_baker_alshatri'>
                          shaik_abu_baker_alshatri
                        </Option>
                        <Option value='yaser_salamah'>yaser_salamah</Option>
                        <Option value='yasser_aldossary'>
                          yasser_aldossary
                        </Option>
                      </Select>
                    </div>
                    <hr className='linebreak' />

                    <div>
                      <strong>
                        <label htmlFor='display'>Display : </label>
                      </strong>
                      <Select
                        showSearch
                        style={{ width: 250 }}
                        optionFilterProp='children'
                        onChange={this.handleSwitch}
                        value={this.state.boolTranslation}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value='Quran-Translation'>
                          Quran Text & Translation
                        </Option>
                        <Option value='Quran'>Quran Text</Option>
                        <Option value='Translation'>Translation</Option>
                      </Select>
                    </div>

                    <hr className='linebreak' />
                    {/* -------------------------From Verse-------------------------------------- */}
                    <div>
                      <strong>
                        <label htmlFor='fromverse'>From Verse : </label>
                      </strong>
                      <Select
                        showSearch
                        style={{ width: 250 }}
                        optionFilterProp='children'
                        onChange={this.fromAyat1}
                        value={this.state.fromAyat}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value='0'>0</Option>
                        {this.state.data[0].Verses.map(verse => (
                          <Option
                            value={`${verse.VerseId}`}
                            key={verse.VerseId}
                          >
                            {verse.VerseId}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    {/* -------------------------From Verse-------------------------------------- */}
                    {/* -------------------------To Verse-------------------------------------- */}
                    <div style={{ marginTop: "0.8rem" }}>
                      <strong style={{ marginRight: "1.1rem" }}>
                        <label htmlFor='toverse'>To Verse : </label>
                      </strong>
                      <Select
                        showSearch
                        style={{ width: 250 }}
                        optionFilterProp='children'
                        onChange={this.toAyat2}
                        value={this.state.toAyat}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {this.state.data[0].Verses.map(verse => (
                          <Option
                            key={verse.VerseId}
                            value={`${verse.VerseId}`}
                          >
                            {verse.VerseId}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    {/* -------------------------To Verse-------------------------------------- */}
                  </Modal>
                </div>
              </div>
            </Header>

            {/* Content */}
            <Content
              style={{
                marginTop: 64,
                padding: "1rem 4rem",
                paddingBottom: "10rem",
                background: "white"
              }}
            >
              {/* <p>{this.state.name}</p>
              <p>{this.state.data[0].Name}</p>
              <p>{this.state.data[0].RevelationPlace}</p>
              <p>{this.state.data[0].TotalAyahs}</p> */}
              {/* ----------------------Ayat-------------------------------------------- */}{" "}
              <h1
                className={
                  this.state.currentAyat === 0
                    ? "CurrentSurah StartSurah"
                    : "StartSurah"
                }
              >
                ﷽
              </h1>
              <div className='surahBox'>
                <hr className='SurahLineBreak' />
              </div>
              <div className='surahBox'>
                <div>
                  {this.state.data[0].Verses.map(verse => (
                    <div key={verse.VerseId}>
                      {/* Scrool to view */}
                      {this.state.currentAyat === verse.VerseId
                        ? scrollIntoView(
                            document.querySelector(".CurrentSurah"),
                            {
                              behavior: "smooth",
                              scrollMode: "always"
                            }
                          )
                        : ""}
                      {/* Scrool to view */}

                      <div
                        className={
                          this.state.currentAyat === verse.VerseId
                            ? "surahFont CurrentSurah"
                            : "surahFont"
                        }
                        style={{
                          display:
                            this.state.boolTranslation === "Quran"
                              ? "flex"
                              : "",
                          justifyContent:
                            this.state.boolTranslation === "Quran"
                              ? "center"
                              : ""
                        }}
                      >
                        <div
                          className={
                            this.state.currentAyat ===
                            this.state.ayatTranslation[verse.VerseId - 1]
                              .VerseId
                              ? " CurrentSurah"
                              : ""
                          }
                          style={{
                            display:
                              this.state.boolTranslation ===
                                "Quran-Translation" ||
                              this.state.boolTranslation === "Translation"
                                ? ""
                                : "none"
                          }}
                        >
                          <h1 className='surahTranslation'>
                            <div
                              style={{
                                display:
                                  this.state.boolTranslation ===
                                    "Quran-Translation" ||
                                  this.state.boolTranslation === "Quran"
                                    ? "none"
                                    : "",
                                marginRight: "0.7rem"
                              }}
                            >
                              ({verse.VerseId})
                            </div>
                            {this.state.ayatTranslation[verse.VerseId - 1].Text}
                          </h1>
                        </div>
                        <div
                          className='surahNum'
                          key={verse.VerseId}
                          style={{
                            display:
                              this.state.boolTranslation === "Translation"
                                ? "none"
                                : ""
                          }}
                        >
                          <div
                            className={
                              this.state.currentAyat === verse.VerseId
                                ? "arSurah CurrentSurah"
                                : "arSurah"
                            }
                          >
                            <h1
                              className={
                                this.state.currentAyat === verse.VerseId
                                  ? "SurahText CurrentSurah"
                                  : "SurahText"
                              }
                            >
                              <div
                                style={{
                                  display: "inline-block",
                                  fontSize: "1.5rem",
                                  marginLeft: "0.7rem",
                                  padding: "0"
                                }}
                              >
                                ({verse.VerseId})
                              </div>
                              {verse.Text}
                            </h1>
                          </div>
                        </div>
                      </div>
                      <hr className='SurahLineBreak' />
                    </div>
                  ))}
                </div>
              </div>
              {/* ----------------------Ayat-------------------------------------------- */}
            </Content>
            {/* Footer */}
            <Footer
              style={{
                position: "fixed",
                zIndex: 1,
                bottom: 0,
                left: 0,
                width: "100%",
                background: "#333",
                height: "90px"
              }}
            >
              <SurahAudio
                verses={this.state.data[0]}
                name={this.state.name}
                reciter={this.state.Reciter}
                SurahCurrentAyat={this.SurahCurrentAyat}
                fromAyat={this.state.fromAyat}
                toAyat={this.state.toAyat}
              />
            </Footer>
          </Layout>
        )}
      </div>
    );
  }
}

export default SingalSurah;

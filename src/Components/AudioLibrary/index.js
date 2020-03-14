import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Spin, Card, Modal, Button, Icon, Select } from "antd";
import axios from "axios";
import Audio from "./Audio";
import Help from "../Help";
const { Header, Content, Footer } = Layout;
const { Option } = Select;

console.log('is the move is coming N ')
export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ayats: "",
      fromSurah: "1 ~ Al-Fatihah ~ الفاتحة",
      toSurah: "114 ~ An-Nas ~ الناس",
      reciter: "hatem"
    };

    this.click = this.click.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.Change = this.Change.bind(this);
  }

  componentWillMount() {
    axios
      .get("http://staging.quran.com:3000/api/v3/chapters")
      .then(res => {
        if (res.status === 200) {
          this.setState({
            ayats: res.data.chapters
          });
        }
      })
      .catch(err => console.error(err));
  }

  click(ayat) {
    this.setState({
      fromSurah: `${ayat.chapter_number} ~ ${ayat.name_simple} ~ ${ayat.name_arabic}`,
      toSurah: `${ayat.chapter_number} ~ ${ayat.name_simple} ~ ${ayat.name_arabic}`
    });
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

  // SEARCH
  SearchData() {
    let { ayats } = this.state;
    let ayatArr = [];

    ayats.forEach(ayat => {
      ayatArr.push(
        `${ayat.chapter_number} ~ ${ayat.name_simple} ~ ${ayat.name_arabic}`
      );
    });

    return ayatArr;
  }

  onChange1(value) {
    let startSurah = value.split(" ");
    let endSurah = this.state.toSurah.split(" ");

    if (Number(endSurah[0]) < Number(startSurah[0])) {
      this.setState({ fromSurah: value, toSurah: value });
    } else {
      this.setState({ fromSurah: value });
    }
  }

  onChange2(value) {
    let endSurah = value.split(" ");
    let startSurah = this.state.fromSurah.split(" ");

    if (Number(endSurah[0]) < Number(startSurah[0])) {
      this.setState({ fromSurah: value, toSurah: value });
    } else {
      this.setState({ toSurah: value });
    }
  }
  // SEARCH

  // RECITER
  Change(value) {
    this.setState({ reciter: value });
  }
  // RECICTER

  render() {
    return (
      <div>
        {!this.state.ayats ? (
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
          <Layout>
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
              <div>
                <Link
                  to='/'
                  style={{
                    background:
                      "/" === this.props.location.pathname ? "#1890ff" : "",
                    color: "#f4f4f4",
                    marginLeft: "2rem",
                    padding: "1.5rem 1rem"
                  }}
                >
                  Quran Library
                </Link>
                <Link
                  to='/AudioLibrary'
                  style={{
                    background:
                      "/AudioLibrary" === this.props.location.pathname
                        ? "#1890ff"
                        : "",
                    color: "#f4f4f4",
                    margin: "0 1rem",
                    padding: "1.5rem 1rem"
                  }}
                >
                  Audio Library
                </Link>
              </div>
              {/* ````````````````````````````````````modla```````````````````````````````````` */}{" "}
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "1.4rem" }}>
                  <Help />
                </div>
                <div style={{ display: "inline-block", marginRight: "2rem" }}>
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
                    {/* --------------------------RECITER--------------------------------------- */}
                    <div
                      style={{
                        display: "flex",
                        marginBottom: "1rem",
                        alignItems: "center"
                      }}
                    >
                      <h4
                        style={{
                          marginRight: "0.5rem"
                        }}
                      >
                        Reciters :
                      </h4>
                      <Select
                        showSearch
                        style={{ width: 320 }}
                        placeholder='Select a person'
                        optionFilterProp='children'
                        onChange={this.Change}
                        value={this.state.reciter}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value='a_ahmed'>a_ahmed</Option>
                        <Option value='hatem'>hatem</Option>
                        <Option value='a_jbr'>a_jbr</Option>
                        <Option value='ahmad_nu'>ahmad_nu</Option>
                        <Option value='bilal'>bilal</Option>
                        <Option value='hawashi'>hawashi</Option>
                        <Option value='jormy'>jormy</Option>
                        <Option value='kafi'>kafi</Option>
                        <Option value='koshi'>koshi</Option>
                        <Option value='mhsny'>mhsny</Option>
                        <Option value='minsh_mjwd'>minsh_mjwd</Option>
                        <Option value='mishaari_w_ibrahim_walk_si'>
                          mishaari_w_ibrahim_walk_si
                        </Option>
                        <Option value='mrifai'>mrifai</Option>
                        <Option value='muftah_thakwan'>muftah_thakwan</Option>
                        <Option value='qari'>qari</Option>
                        <Option value='sds'>sds</Option>
                        <Option value='sudais_shuraim_with_naeem_sultan_pickthall'>
                          sudais_shuraim_with_naeem_sultan_pickthall
                        </Option>
                        <Option value='yasser'>yasser</Option>
                      </Select>
                    </div>
                    {/* --------------------------RECITER--------------------------------------- */}
                    <hr />
                    {/* ````````````````````````````````````SELECT```````````````````````````````````` */}
                    <div
                      style={{
                        display: "flex",
                        marginTop: "1rem",
                        alignItems: "center"
                      }}
                    >
                      <h4
                        style={{
                          marginRight: "0.8rem"
                        }}
                      >
                        Surah Start :
                      </h4>
                      <Select
                        showSearch
                        style={{ width: 300 }}
                        placeholder='Select a person'
                        optionFilterProp='children'
                        onChange={this.onChange1}
                        value={this.state.fromSurah}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {this.state.ayats.map(ayat => (
                          <Option
                            value={`${ayat.chapter_number} ~ ${ayat.name_simple} ~ ${ayat.name_arabic}`}
                          >
                            {ayat.chapter_number} ~ {ayat.name_simple} ~
                            {ayat.name_arabic}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "1rem",
                        alignItems: "center"
                      }}
                    >
                      <h4
                        style={{
                          marginRight: "0.5rem"
                        }}
                      >
                        Surah Finish :
                      </h4>
                      <Select
                        showSearch
                        style={{ width: 300 }}
                        placeholder='Select a person'
                        optionFilterProp='children'
                        onChange={this.onChange2}
                        value={this.state.toSurah}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {this.state.ayats.map(ayat => (
                          <Option
                            value={`${ayat.chapter_number} ~ ${ayat.name_simple} ~ ${ayat.name_arabic}`}
                          >
                            {ayat.chapter_number} ~ {ayat.name_simple} ~
                            {ayat.name_arabic}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    {/* ````````````````````````````````````SELECT```````````````````````````````````` */}
                  </Modal>
                </div>
              </div>
              {/* ````````````````````````````````````modla```````````````````````````````````` */}
            </Header>
            <Content
              style={{
                margin: "6rem"
              }}
            >
              <h2 className='text-head2'>SURAHS (CHAPTERS)</h2>
              {/* THIS IS THE AYAT STYLE */}
              {this.state.ayats.map(ayat => (
                <div
                  className='audio-card'
                  key={ayat.id}
                  onClick={() => this.click(ayat)}
                >
                  <Card
                    size='small'
                    title={`${ayat.name_simple} ~ ${ayat.name_arabic}`}
                    style={{ margin: "1rem" }}
                  >
                    <div>
                      <strong>Chapter Number: </strong>
                      {ayat.chapter_number}
                      <br />
                      <strong>Revelation Order: </strong>
                      {ayat.revelation_order}
                      <br />
                      <strong>Revelation Place: </strong>
                      {ayat.revelation_place}
                    </div>
                  </Card>
                </div>
              ))}
            </Content>
            <Footer
              style={{
                position: "fixed",
                zIndex: 1,
                bottom: 0,
                left: 0,
                width: "100%",
                background: "#333",
                height: "6rem"
              }}
            >
              <Audio
                ayats={this.state.ayats}
                fromState={this.state.fromSurah}
                toState={this.state.toSurah}
                reciter={this.state.reciter}
              />
            </Footer>
          </Layout>
        )}
      </div>
    );
  }
}

export default index;

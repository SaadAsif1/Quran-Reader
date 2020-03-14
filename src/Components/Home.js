import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spin, List, Layout } from "antd";
import AudioSearch from "./AudioSearch";
import "../css/App.css";

const { Header, Content, Footer } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ayats: ""
    };
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
                    marginLeft: "4rem",
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
                    margin: "0 1rem"
                  }}
                >
                  Audio Library
                </Link>
              </div>
              <div>
                <AudioSearch />
              </div>
            </Header>
            <Content style={{ marginTop: 64 }}>
              <div>
                <div>
                  <h2 className='text-head'>SURAHS (CHAPTERS)</h2>
                  {this.state.ayats.map(QuranData => (
                    <div key={QuranData.id} className='surah-card'>
                      <Link
                        to={{
                          pathname: `/QuranSurah/${QuranData.name_simple}/${QuranData.chapter_number}`,
                          state: {
                            number: QuranData.chapter_number,
                            name: QuranData.name_simple,
                            ayats: this.state.ayats
                          }
                        }}
                      >
                        <List
                          size='small'
                          header={
                            <h2>{` ${QuranData.name_arabic} ~ ${QuranData.name_simple} ~ ${QuranData.translated_name.name}`}</h2>
                          }
                          bordered
                          dataSource={[
                            `Chapter Number: ${QuranData.chapter_number}`,
                            `Revelation Order: ${QuranData.revelation_order}`,
                            `Revelation Place: ${QuranData.revelation_place}`,
                            `Bismillah Pre: ${QuranData.bismillah_pre}`
                          ]}
                          renderItem={item => (
                            <h3>
                              <List.Item>{item}</List.Item>
                            </h3>
                          )}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Quran-Application ©2019 Created by Saad Asif
            </Footer>
          </Layout>
        )}
      </div>
    );
  }
}

export default Home;

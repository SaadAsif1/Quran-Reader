import React, { Component } from "react";
import { MediaPlayerControls } from "@cassette/player";
import { PlayerContextProvider } from "@cassette/core";
import "@cassette/player/dist/css/cassette-player.css";

export class Audio extends Component {
  SurahAudio() {
    let url = [];

    const { fromState, toState, ayats, reciter } = this.props;
    // Start Surah
    let startSurah = fromState.split(" ");
    let startSurahNum = Number(startSurah[0]) - 1;

    // End Surah
    let endSurah = toState.split(" ");
    let endSurahNum = Number(endSurah[0]);

    let ayatArr = ayats.slice(startSurahNum, endSurahNum);

    ayatArr.map(Surah => {
      let ayatChapterNum = Surah.id.toString();

      if (ayatChapterNum.length === 1) {
        url.push({
          url: `http://server11.mp3quran.net/${reciter}/${"00" +
            ayatChapterNum}.mp3`,
          title: `${Surah.chapter_number}. ${Surah.name_simple} ${Surah.name_arabic}`
        });
      } else if (ayatChapterNum.length === 2) {
        url.push({
          url: `http://server11.mp3quran.net/${reciter}/${"0" +
            ayatChapterNum}.mp3`,
          title: `${Surah.chapter_number}. ${Surah.name_simple} ${Surah.name_arabic}`
        });
      } else {
        url.push({
          url: `http://server11.mp3quran.net/${reciter}/${ayatChapterNum}.mp3`,
          title: `${Surah.chapter_number}. ${Surah.name_simple} ${Surah.name_arabic}`
        });
      }
    });

    return url;
  }

  render() {
    return (
      <div>
        <PlayerContextProvider playlist={this.SurahAudio()}>
          <MediaPlayerControls
            controls={[
              "spacer",
              "backskip",
              "playpause",
              "forwardskip",
              "spacer",
              "progress",
              "volume",
              "repeat"
            ]}
          />
        </PlayerContextProvider>
      </div>
    );
  }
}

export default Audio;

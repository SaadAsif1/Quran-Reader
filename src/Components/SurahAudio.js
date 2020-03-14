import React, { Component } from "react";

import { MediaPlayerControls } from "@cassette/player";
import { PlayerContextProvider } from "@cassette/core";
import "@cassette/player/dist/css/cassette-player.css";

class SurahAudio extends Component {
  SuratNumber() {
    const ayat = this.props.verses;
    const ayatId = ayat.Id.toString();

    let num;
    if (ayatId.length === 1) {
      num = "00".concat(ayatId);
    } else if (ayatId.length === 2) {
      num = "0".concat(ayatId);
    } else {
      num = ayatId;
    }
    return num;
  }

  SurahAyatNumber() {
    let ayatNumber = [];

    let from;
    let to;
    let firstSurah = false;

    if (this.props.name === "Al-Fatihah") {
      from = Number(this.props.fromAyat);
      to = Number(this.props.toAyat) + 1;
      firstSurah = true;
    } else {
      from = Number(this.props.fromAyat);
      to = Number(this.props.toAyat);
      firstSurah = false;
    }
    for (let i = from; to >= i; i++) {
      let arr = i.toString();
      if (arr.length === 1) {
        ayatNumber.push({
          url: `http://verse.mp3quran.net/new%20version/${
            this.props.reciter
          }/64/${this.SuratNumber()}${"00" + arr}.mp3`,
          title: `${this.props.verses.Id} ~ ${this.props.name} ${this.props.verses.Name} ~ ${this.props.reciter} `,
          current: firstSurah ? (Number(arr) - 1).toString() : arr
        });
      } else if (arr.length === 2) {
        ayatNumber.push({
          url: `http://verse.mp3quran.net/new%20version/${
            this.props.reciter
          }/64/${this.SuratNumber()}${"0" + arr}.mp3`,
          title: `${this.props.verses.Id} ~ ${this.props.name} ${this.props.verses.Name} ~ ${this.props.reciter} `,
          current: firstSurah ? (Number(arr) - 1).toString() : arr
        });
      } else {
        ayatNumber.push({
          url: `http://verse.mp3quran.net/new%20version/${
            this.props.reciter
          }/64/${this.SuratNumber()}${arr}.mp3`,
          title: `${this.props.verses.Id} ~ ${this.props.name} ${this.props.verses.Name} ~ ${this.props.reciter} `,
          current: firstSurah ? (Number(arr) - 1).toString() : arr
        });
      }
    }

    return ayatNumber;
  }

  CurrentAyat(e) {
    this.props.SurahCurrentAyat(e);
  }

  render() {
    return (
      <div>
        <PlayerContextProvider
          getMediaTitleAttributeForTrack={e => this.CurrentAyat(e.current)}
          playlist={this.SurahAyatNumber()}
        >
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

export default SurahAudio;

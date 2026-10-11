import actionImage from "../assets/genres/action.jpg";
import adventureImage from "../assets/genres/adventure.jpg";
import animationImage from "../assets/genres/animation.jpg";
import comedyImage from "../assets/genres/comedy.jpg";
import crimeImage from "../assets/genres/crime.jpg";
import documentaryImage from "../assets/genres/documentary.jpg";
import dramaImage from "../assets/genres/drama.jpg";
import familyImage from "../assets/genres/family.jpg";
import fantasyImage from "../assets/genres/fantasy.jpg";
import historyImage from "../assets/genres/history.jpg";
import horrorImage from "../assets/genres/horror.jpg";
import mysteryImage from "../assets/genres/mystery.jpg";
import musicImage from "../assets/genres/music.jpg";
import romanceImage from "../assets/genres/romance.jpg";
import scifiImage from "../assets/genres/scifi.jpg";
import standUpImage from "../assets/genres/stand-up.jpg";
import thrillerImage from "../assets/genres/thriller.jpg";
import tvMovieImage from "../assets/genres/tv-movie.jpg";
import warImage from "../assets/genres/war.jpg";
import westernImage from "../assets/genres/western.jpg";
import { genreTitles } from "../data/genreTitles";
import type { Genre } from "../types/Genre";

const genreImages: Record<string, string> = {
  drama: dramaImage,
  comedy: comedyImage,
  crime: crimeImage,
  family: familyImage,
  history: historyImage,
  thriller: thrillerImage,
  horror: horrorImage,
  scifi: scifiImage,
  adventure: adventureImage,
  mystery: mysteryImage,
  "stand-up": standUpImage,
  fantasy: fantasyImage,
  romance: romanceImage,
  music: musicImage,
  "tv-movie": tvMovieImage,
  documentary: documentaryImage,
  action: actionImage,
  western: westernImage,
  animation: animationImage,
  war: warImage,
  
};

export function createGenres(names: string[]): Genre[] {
  return names.map((name) => ({
    name,
    title: genreTitles[name] ?? name,
    imageUrl: genreImages[name] ?? "",
  }));
}
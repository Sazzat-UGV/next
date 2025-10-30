import about from "@/assets/static/about/about-img.svg";
import mission from "@/assets/static/about/mission.svg";
import story from "@/assets/static/about/story.svg";
import temp from "@/assets/static/about/temp.svg";
import choose from "@/assets/static/about/choose.svg";
import join from "@/assets/static/about/join.svg";
import tarams from "@/assets/static/tarams.svg";
import logo from "@/assets/logo.png";
import views from "@/assets/static/dashboard/views.svg";
import videos from "@/assets/static/dashboard/videos.svg";
import likes from "@/assets/static/dashboard/likes.svg";
import loginImg from "@/assets/login/login.svg"
import signImg from "@/assets/login/sign-up.svg"
import forgotImg from "@/assets/login/forgot.svg"


const assets = {
  logo,
  basic: {
    tarams,
    about: {
      about,
      mission,
      story,
      temp,
      choose,
      join,
    },
  },
  dashboard: {
    views,
    videos,
    likes,
  },
  auth: {
    loginImg,
    signImg,
    forgotImg
  }
};

export default assets;

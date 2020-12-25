import React from "react";
import axios from "axios";
import Pet from "../components/Pet";
import catLoading from "../img/cat-loading.png"
import dogLink from "../img/dog-link.png";
import "./Dogs.css"
import { Link } from "react-router-dom";


class Cats extends React.Component {
    state = {
        isLoading : true,
        gettingExtraImages : false,
        imageList : []
    };
    getRandomDogImages = async() => {
      this.setState({gettingExtraImages : true})
      const imageList = this.state.imageList;
      const currentLength = imageList.length;
      while(imageList.length < currentLength + 20){
        const  response = await axios({
            url : "https://aws.random.cat/meow",
            method : "GET"
        });
        if (response){
          imageList.push(response.data.file)
        }
      }
      this.setState({isLoading : false, gettingExtraImages : false, imageList});
    }
    handleScroll = () => {
        if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && !this.state.gettingExtraImages) {
            this.getRandomDogImages();
        }
    }
    componentDidMount(){
      this.getRandomDogImages();
      window.addEventListener("scroll", this.handleScroll)
    }
    render(){
      const {
        isLoading, gettingExtraImages, imageList
      } = this.state;
      let content;
      if (isLoading){
          content = (
            <div className="loader">
                <img className="loader__img" src={catLoading}></img>
                <div className="loader__text">Loading...</div>
            </div>
          );
      } else if(gettingExtraImages){
        content = (
            <>
                <h1>J'aime le chat !</h1>
                <Link to="/cats">
                  <div className="link">
                    <img className="link__logo" src={dogLink}></img>
                    <div className="link__text">wanna see some dogs?</div>
                  </div>
                </Link>
                <div className="grid-container">
                    {imageList.map((image, index) => <Pet key={index} image={image}></Pet>)}
                </div>
                <div className="loader--extra">
                    <img className="loader--extra__img" src="https://miro.medium.com/max/802/1*Rg7IE_twdBL5fhooMEhjuw.gif"></img>
                </div>
            </>
        )

      } else {
          content = (
            <>
                <h1>J'aime le chat !</h1>
                <Link to="/cats">
                  <img className="link__logo" src={dogLink}></img>
                  <div className="link__text">wanna see some dogs?</div>
                </Link>
                <div className="grid-container">
                    {imageList.map((image, index) => <Pet key={index} image={image}></Pet>)}
                </div>
            </>
          )
      }
      return (
        <section>
            {content}
        </section>
      )
    }
  }
export default Cats;

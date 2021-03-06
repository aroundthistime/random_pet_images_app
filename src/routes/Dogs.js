import React from "react";
import axios from "axios";
import Pet from "../components/Pet";
import dogLoading from "../img/dog-loading.png"
import catLink from "../img/cat-link.png";
import "./Dogs.css"
import { Link } from "react-router-dom";


class Dogs extends React.Component {
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
            url : "https://random.dog/woof.json",
            method : "GET"
        });
        if (response){
          imageList.push(response.data.url)
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
                <img className="loader__img" src={dogLoading}></img>
                <div className="loader__text">Loading...</div>
            </div>
          );
      } else if(gettingExtraImages){
        content = (
            <>
                <h1>J'aime le chien !</h1>
                <Link to="/cats">
                  <div className="link">
                    <img className="link__logo" src={catLink}></img>
                    <div className="link__text">wanna see some cats?</div>
                  </div>
                </Link>
                <div className="grid-container">
                    {imageList.map((image, index) => <Pet key={index} image={image}></Pet>)}
                </div>
                <div className="loader--extra">
                    <img className="loader--extra__img" src="https://clipground.com/images/animal-gif-png-13.gif"></img>
                </div>
            </>
        )

      } else {
          content = (
            <>
                <h1>J'aime le chien !</h1>
                <Link to="/cats">
                  <img className="link__logo" src={catLink}></img>
                  <div className="link__text">wanna see some cats?</div>
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
export default Dogs;

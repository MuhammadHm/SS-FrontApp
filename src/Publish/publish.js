import React, { Component } from 'react';
import './publish.css'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
  } from 'react-share';
  import {
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon,
    EmailIcon,
  } from 'react-share';
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


class Publish extends Component {
    

    constructor(){
        super();
        this.state={
            survey_id :'',
        }
    }
    
    render() {
        let link=`http://localhost:3000/userpreview/${this.props.survey_id}`;

        return (
            <div className="textbox">
                <div className="link-publish">
                <label className="publish-label" >Share your survey via this web link : </label>
                <input className="publish-input" name="text" type="text" value={link}  />
                </div>
                <label className="publish" >Or Share via social media : </label>   
                <FacebookShareButton  className="icon" url={link} children={FacebookIcon} ><FacebookIcon size={100}  round={true} /></FacebookShareButton>
                <WhatsappShareButton  className="icon" url={link} children={WhatsappIcon} ><WhatsappIcon size={100}  round={true} /></WhatsappShareButton>
                <TwitterShareButton  className="icon" url={link} children={FacebookIcon} ><TwitterIcon size={100}  round={true} /></TwitterShareButton>
                <EmailShareButton   className="icon" url={link} children={EmailIcon} ><EmailIcon size={100}  round={true} /></EmailShareButton>
                <LinkedinShareButton  className="icon" url={link} children={FacebookIcon} ><LinkedinIcon size={100}  round={true} /></LinkedinShareButton> 
            </div>
        );
    }
}
export default Publish;


import React, { Component } from 'react';
import './publish.css'
<<<<<<< HEAD
import cryptr from 'cryptr'
=======
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
>>>>>>> 90f827e622fd42a4d1e29567dffb99db38cc34ee

class Publish extends Component {
    

    constructor(){
        super();
        this.state={
            survey_id :'',
        }
    }
    
    render() {
<<<<<<< HEAD
        
        let style={
            "fontSize" : "35px",
            "color" : "#383f50",
            "width" : "600px",
            "padding" : "20px",
            "marginLeft" : "25%",
            "marginTop" : "2%",
            "textAlign" : "left"
        };
        
=======

>>>>>>> 90f827e622fd42a4d1e29567dffb99db38cc34ee
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


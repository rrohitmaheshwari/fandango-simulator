import React, {Component} from 'react';
import '../../helper/stylesheets/CommonFooter.css';



class CommonFooter extends Component {

    render() {
        return (

                <div className={"flex-container"}>
                    <footer id={"general_footer"}>
                        <div>
                            <a href="http://facebook.com/" className="fa fa-facebook">{}</a>
                            <a href="http://twitter.com" className="fa fa-twitter">{}</a>
                            <a href="https://plus.google.com/" className="fa fa-google">{}</a>
                            <a href="http://linkedin.com" className="fa fa-linkedin">{}</a>
                            <a href="http://youtube.com" className="fa fa-youtube">{}</a>
                            <a href="http://instagram.com" className="fa fa-instagram">{}</a>
                            <a href="https://www.pinterest.com" className="fa fa-pinterest">{}</a>
                        </div>
                        <div style={{fontSize: 12}}>
                            Copyright © 2017 Fandango. All rights reserved. Your Ticket to the Movies. Your Personal Box Office.
                        </div>
                    </footer>
                </div>

        );
    }
}



export default CommonFooter;
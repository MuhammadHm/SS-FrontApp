import React, { Component } from 'react';
import './Sidebar.css'


class Sidebar extends Component {

    render(){
        return(
             
            <body>
                <div id="menu" class="nav1">
                    <h1 class="logo">
                    <a class="s-logo" href="http://localhost:8080/home">Survey<span>Space</span></a>
                    </h1>
                    <ul>
                        <li><a href="/createsurvey">Design Survey</a></li>
                        <li><a href="/preview/id">Preview &amp; Score</a></li>
                       
                        <li><a href="/publish">Collect Responses</a></li>
                        <li><a href="/analyze">Analyze Results</a></li>
                    </ul>
                </div>

            </body>
    );

    }
}
export default Sidebar;

import React,{Component} from 'react';
import {BrowserRouter ,Route , Switch ,Link} from 'react-router-dom';
import Survey from './Survey/Survey';
import Preview from './Preview/Preview';
import Publish from './Publish/publish';
import Sidebar from './Side Bar/Sidebar';

class App extends Component {


    render(){

        return(
            <div>
                <BrowserRouter>
                    <Route path="/createsurvey" render={({match}) => (                        
                      <div>
                        <Sidebar/>
                        <Survey/>  
                      </div>           
                    )} />

                    <Route path="/preview/:id" render={({match}) => (                        
                       <div>
                         <Sidebar />
                         <Preview id={match.params.id} />
                       </div>             
                    )} />

                    <Route path="/publish" render={({match}) => (                        
                       <div>
                         <Sidebar />
                         <Publish />
                       </div>             
                    )} />                    
                    
                    <Route path="/responses" render={({match}) => (                        
                       <div>
                         <Sidebar />
                         
                       </div>             
                    )} />
                    <Route path="/analyze" render={({match}) => (                        
                       <div>
                         <Sidebar />
                       
                         
                       </div>             
                    )}/>

                </BrowserRouter>
            </div>
        );
    }

}


export default App;

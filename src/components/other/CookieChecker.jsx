import React from "react";
import EXIT from "./exit.jsx";
import checkCookies from '../../scripts/checkCookies.js';

export default class CookieChecker extends React.Component {
    
    constructor(props){
        super(props);
        this.timeConstant = 3000;
        this.state = {time:this.timeConstant,redirect:false};
        this.step = 50;

        
        this.location = window.location.pathname;
        this.nameRandom = parseInt(Math.random()*999)+1;
        
        this.isFirstContact = location.pathname === '/firstContact';
        this.isAuth = location.pathname === '/auth';

    }

    componentDidUpdate(){
        this.getActuallLocation();
        // console.log("UPDATE",this.isAuth,this.isFirstContact,location,location.pathname,window.location.pathname);
        // console.log('state:',this.state);

        clearTimeout(this.timerID);
        this.initTimer(this.step);
        
    }
    componentDidMount(){
        // console.log("CREATE");
        this.initTimer(this.step);
    }
    componentWillUnmount(){
        clearTimeout(this.timerID);
    }

    Tick(){
        // console.log('tick');
        // console.log('state:',this.state);

        if(this.isAuth || this.isFirstContact){
            // console.log("SKIP",this.isAuth, this.isFirstContact);
            if(this.state.redirect){
                this.setState({...this.state,time:this.timeConstant,redirect:false});
                // console.log("BPPPAPAPW");
            }else{

                this.setState({...this.state});
            }
        }else{
            this.callMySetTimeout();
        }
    
        if(this.isFirstContact && this.state.redirect){
            // cconsole.log("DEFAULT STATE::");
            this.setState({...this.state,time:this.timeConstant,redirect:false});
            // console.log(this.state);
        }else if(this.state.redirect){
            // debugger
            // console.log("MAYBE");
            clearTimeout(this.timerID);
            // return 0;
        }else{
            // console.log('nothing',this.state.time);
            
        }
    }

    CheckAndRedirectCookies(){
        // console.log('CheckAndRedirectCookies');
        if(this.isFirstContact){
            // console.log("nothing FC");
        }else{
            let SavedCookies = checkCookies({isOK:true});

            console.warn(SavedCookies);

            // if(this.state.redirect){
            //     // console.log("alredy redirected");
            //     return 0;
            // }

            if(!SavedCookies.isOK){
                // console.log('REDIRECT')
                this.setState({...this.state,redirect:true});
            }else{
                // console.log('NextTIme',SavedCookies);     
                this.setState({...this.state,time:this.timeConstant});           
            }
        }        
        
    }

    callMySetTimeout(){
        // console.log('callMySetTimeout');
        //     return setTimeout(()=>{
                // console.log("TIME OUT :: ",this.nameRandom);
                // console.log('timer tic tac',this.state.time);
        if(this.state.time <= 0){
            // console.log("time<0");
            this.CheckAndRedirectCookies();          
        }else{   
            // console.log("tim>0");         
            this.setState({...this.state,time:this.state.time - this.step});
        }
                
            // },step);
    }


    initTimer(ms){
        this.timerID = setTimeout(()=>{
            this.Tick();
        },ms);
    }

    getActuallLocation(){
        // console.log('getActuallLocation');
        this.location = window.location.pathname;        
        this.isFirstContact = location.pathname === '/firstContact';
        this.isAuth = location.pathname === '/auth';
    }
    render(){
        // console.log('CookieChecker Drawed',this.nameRandom,this.state.time,this.state.redirect);
        if(this.state.redirect){
            // console.log("need redirect");
            // this.setState({...this.state,time:this.timeConstant,redirect:false});
            return <EXIT/>;
        }
        return <>
            {/* <p>empty component</p> */}
        </>
    }
}
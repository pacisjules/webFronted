import React,{ useState } from 'react'
import classes from '../styles/homes/Homes.module.css';
export default function homes() {

  const [time, setTime] = useState('');
  const [period, setperiod] = useState('');

  setInterval(() => {
    var date = new Date();
    var hour = date.getHours();
    
    var fullclock = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let periodtime='';
    
    setTime(fullclock);


  if (hour >= 0 && hour <= 12) {
      
    periodtime= "AM"
    
  } else {
    
    periodtime= "PM"
    
  }
  setperiod(periodtime)

}, 500)

  return (
    <div className={classes.homesContainer}>
      <div className={classes.top}>
        
          <img src='/profilePic.png' alt='user profile' />

          <h2>Good afternoon, Mukunzi Alex!</h2>


          <p className={classes.currentTime}>Seller category, {time} {period}</p>
          <p className={classes.appDescription}>In publishing and graphic design, Lorem ipsum is a placeholder 
text commonly used to demonstrate the visual form of a document
or a typeface without relying on meaningful content.</p>
      
      </div>
      <div className={classes.mid}>
       <h3>Use mobile here</h3>
       <div className={classes.mobileAvailable}>
       <img src='/appstore.png' alt='available on' className={classes.apple}/>
       <img src='/google.png' alt='available on' className={classes.google}/>
       </div>
      </div>
      <div className={classes.bot}>
        <h2>Quick start Here</h2>
        <p>Here you create easy short to open some functions</p>
        <div className={classes.botcontainer}>
          <div className={classes.div1}>
            <h2>Sales Panel</h2>
            <div className={classes.open1}>Open</div>
          </div>
          <div className={classes.div2}>
            <h2>Sales Panel</h2>
            <div className={classes.open2}>Open</div>
          </div>
          <div className={classes.div3}>
          <h1>+</h1>
          <p>Add new shortcut</p>
          </div>
          <div className={classes.div4}>
          <h1>+</h1>
          <p>Add new shortcut</p>
          </div>
          <div className={classes.div5}>
          <h1>+</h1>
          <p>Add new shortcut</p>
          </div>
        </div>
      </div>

    </div>
  );
}


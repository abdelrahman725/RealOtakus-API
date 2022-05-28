import './App.css';
import Bar from './Components/Bar' 
import { UserProfile } from './Components/TheProfile/UserProfile';
import Notifications from './Components/Notifications';
import Contripution from './Components/Contripution'
import Animes from './Components/AnimesList'
import TheDashBoard from './Components/TheDashBoard'

import React, {useState,useEffect,createContext} from 'react'
import getCookie from './GetCookie'
export const GamdeModeContext  = createContext()
export const ServerContext  = createContext()

function App() {
  
  const CsrfToken = getCookie('csrftoken')
  
  const[UserData,setUserData] = useState({})
  const [NotificationsView,setNotificationsView]= useState()
  const[notifications,setnotifications] = useState()
  const [newnotification,setnewnotification]= useState()
  
  const [HomeView,setHomeView] = useState(true)
  const [ContributionView,setContributionView]= useState(false)
  const [AnimesChoicesView,setAnimesChoicesView] = useState(false)
  const [ProfileView,setProfileView] = useState(false)

  const [GameMode,setGameMode] = useState(false)
  
  const  server  = "http://127.0.0.1:8000"
  const  socket_server = "ws://127.0.0.1:8000/ws/socket-server/"
  const  userdataurl = `${server}/home/data`

  // connect to django via web socket to recieve notifications once they are creaetd
  const mysocket = ()=>
  {
    const socket_connection = new WebSocket(socket_server)
    socket_connection.onmessage = (e)=>{
      const data = JSON.parse(e.data)
      const notification_received = data.payload.notification
      
      setnewnotification(notification_received)

      notification_received&&(setnotifications(previousnotifications => [...previousnotifications, notification_received]))
      

      console.log(data)
    }
  }


  // called if the user doesn't have a saved country (which is always the case initially for the first logged)
  const getUserCountryViaApiServiceThenSaveCountry = async()=>
  {
    // after we got the country successfully we save it to the database so subsequent requests for the same user don't have to query the country from the api service again

    const res = await fetch("http://ip-api.com/json")
    const data = await res.json()

    const postcountry = async (country)=>
      {
        const sendcountry = await fetch(userdataurl,{
        
          method : 'POST',
          headers : {
            'Content-type': 'application/json',
            'X-CSRFToken': CsrfToken,
          },
          body: JSON.stringify({
            country:country
          })
        })
        const res  = await sendcountry.json()
        console.log(res)
      }
    
   postcountry(data.countryCode.toLowerCase())

  
  }


  const GetUserData = async()=>
  {
    const res = await fetch(userdataurl)
    const data= await res.json()

    if (!data.user_data.country)
    {
      getUserCountryViaApiServiceThenSaveCountry()
    } 
    
    console.log(data.notifications)
    setUserData(data.user_data)

    setnotifications(data.notifications)
  }

  
  const ManageViews = (View)=>
  {
    if (!GameMode)
    {

      if(View==="home"){
        setHomeView(true);setAnimesChoicesView(false); setContributionView(false); setProfileView(false)
        setNotificationsView(false) 
      } 

      if(View==="profile"){
        setProfileView(true); setHomeView(false) ;
        ;setAnimesChoicesView(false); setContributionView(false);
        setNotificationsView(false) 
      } 
      
      if(View==="contribution"){
        setContributionView(true); setHomeView(false) ;
      } 
      
      if(View==="quiz"){
        setAnimesChoicesView(true); setHomeView(false) ;
      } 

      if(View==="notifications"){
        setNotificationsView(true) 
        setAnimesChoicesView(false)
        setHomeView(false)
        setContributionView(false)
        setProfileView(false)
      } 

      
    }
  }


  useEffect(()=>{
    GetUserData()
    //mysocket()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

return (
 <div className="App">  
  {UserData&& <Bar data={UserData} show={ManageViews} />}
     
  <ServerContext.Provider value={{server}}>
  <GamdeModeContext.Provider value={{GameMode, setGameMode, setUserData}}>
    
      <div className="upperbuttons">

        <div>{!GameMode&& <button onClick={()=>ManageViews("home")}>Home</button>}</div>

        { HomeView&&<button onClick={()=>ManageViews("quiz")}>take a quiz</button> }

        { HomeView&& <button onClick={()=>ManageViews("contribution")}>Contribute a question</button> }

      </div>

      { HomeView&& <TheDashBoard/>}
      
      { ProfileView && <UserProfile/>}
      { NotificationsView && <Notifications notifications={notifications}/>}


      { ContributionView && <Contripution />}

      { AnimesChoicesView&& <Animes/>}

    
  
  </GamdeModeContext.Provider>
  </ServerContext.Provider>
  </div>
 )
}

export default App
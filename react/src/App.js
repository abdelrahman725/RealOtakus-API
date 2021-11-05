import React from 'react'
import {useState,useEffect} from 'react'
import './App.css'
import EachQuestion from './Components/EachQuestion'
import LeaderBoard from './Components/LeaderBoard'
import Profile from './Components/Profile'
import AnimesChoices from './Components/Animes'
import Interface from './Components/Interface'
import Navbar from './Components/Navbar'
import LoginRegisterView from './Components/NotAuth'
import Result from './Components/Result'
import getCookie from './GetCookie'

//Material UI Components :
import {Button, ButtonGroup} from '@material-ui/core'
// //Material Icons :
import ExitToAppRounded from '@material-ui/icons/ExitToAppRounded'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import PeopleRounded  from '@material-ui/icons/PeopleRounded'
import PlayArrowRounded  from '@material-ui/icons/PlayArrowRounded'
import ArrowUpwardIcon   from '@material-ui/icons/ArrowUpward'

function App() {

  const CsrfToken = getCookie('csrftoken')
  const IP = "127.0.0.1"
  const UsersPathUrl = `http://${IP}:8000/leaderboard`
  const AnimesPathUrl = `http://${IP}:8000/allanimes`
  const QuestionsPathUrl = `http://${IP}:8000/test`
  const UserDataPathUrl = `http://${IP}:8000/userdata`
  const LogoutPathUrl = `http://${IP}:8000/logout`
  const NumberOfQuestions = 20
  const ChoicesLimit = 5 
 // const [Loading,setUserDataLoading] = useState(true)
  const [animecounter,setanimecounter] = useState(0) 
  const [TestView,setTestView] = useState(false)
  const [AnimesView,setAnimesView] = useState(false)
  const [ProfileView,setProfileView]  = useState(false)
  const [InterfaceView,setInterfaceView]  = useState(true)
  const [ResultView,setResultView]  = useState(false)
  const [Testended,setTestended] = useState(false)
  const [TheNext,setTheNext]= useState(true)
  const [nextbtn,setnextbtn] = useState(false)
  const [submitbtn,setsubmitbtn]= useState(false)
  const [LeaderBoardView,setLeaderBoard] = useState(false)
  const [CurrentAnswer,setCurrentAnswer] = useState(false)
  const [TopOtakus,setUsers] = useState([])
  const [QuestionNumber,setNumber] = useState(0)
  const [UserQuestions,setQuestions] = useState([])
  const [AllAnimes,setAllAnimes] = useState([])
  const [SelectedAnimes,setSelectedAnimes]=  useState([])
  const [TopAnimes,setTopAnimes] = useState()
  const [TestScore,setTestScore] = useState(0) 
  const [userpoints,setPoints] = useState() 
  const [UserName,setusername] = useState()
  const [Level,setLevel] = useState("")
  const [TestsCount,setTestsCount] = useState()
  const [TopAnimesLoading,setTopAnimesLoading] = useState({})
  const [Authenticated,setAuthenticated] = useState()

    
// authenticate user and load base data
const AuthenticateUser = ()=>
{
  // save session in local storage
  localStorage.setItem("Logged",true) 
  GetUserData()
  setAuthenticated(true)
}
 


  useEffect(() => {

    const Logged = localStorage.getItem("Logged");
    if (Logged)
    {
      setAuthenticated(true)
      GetUserData();
    }
    else
    {
      setAuthenticated(false)
      
    }

    
  }, []);




const Logout =  async()=>{

    const logout = await fetch(LogoutPathUrl)
    const response = await logout.json()
    console.log(response.msg)

    // clear local storage
    localStorage.removeItem("Logged");
    
    setusername()
    setLevel()
    setTestsCount()
    setPoints()

    setAuthenticated(false)
  }



  



 const GetUserData = async()=>
{
  const res = await fetch(UserDataPathUrl,{
    method:'GET'
  })
  const data = await res.json()
  console.log(data)
  setusername(data.username)
  setLevel(data.level)
  setTestsCount(data.TestsCount)
  setPoints(data.points)

}



//get the DashBoard data (topusers, animes)
const FetchDashBoard  =  async()=>
{  
  const response = await fetch(UsersPathUrl)
  const Users  = await response.json()
  FetchAnimes()
  setUsers(Users)
  setLeaderBoard(true)
  setInterfaceView(false)
}



const FetchAnimes  =  async()=>
{ 
  const res = await fetch(AnimesPathUrl)
  const animes = await res.json()
  setAllAnimes(animes)
}




// show available animes for the user to choose from
const ShowAvailableAnimes = async()=>
{
  const res = await fetch(AnimesPathUrl)
  const animes = await res.json()
  setAllAnimes(animes)

  setSelectedAnimes([])
  setAnimesView(true)
  setanimecounter(0)
  setInterfaceView(false)
  setTestView(false)

}



const topanimes = async()=>
{
  const response = await fetch(`http://${IP}:8000/topanimes`)
  const animes  = await response.json()  
  setTopAnimes(animes)
  setTopAnimesLoading(false)
}


const showprofile = ()=>
{
  
  setTestView(false)
  setLeaderBoard(false)
  setAnimesView(false)
  setInterfaceView(false)
  setResultView(false)
  setTopAnimesLoading(true)
  topanimes()

  setProfileView(true)
}

const Home =()=>
{
  setInterfaceView(true)
  setResultView(false)
  setLeaderBoard(false)
  setProfileView(false)
  setAnimesView(false)
}




///////////////////////////////////////////  Quiz Handling Functions   ////////////////////////////////////////////////


const GetQuestions = async()=>
{
  SelectedAnimes.map((selected_anime)=>(
    selected_anime.score=0
  ))
 
  let anime_ids = SelectedAnimes.map((anime)=>anime.id)
  const response = await fetch((`${QuestionsPathUrl}/${anime_ids}`))
  const questions  = await response.json()

  setQuestions(questions)  
  setnextbtn( true)
  setTestView(true)
  setAnimesView(false)

}

const ToggleAddRemoveAnime = (id) =>
{  

  // removing anime 
 if( SelectedAnimes.filter((anime)=>(anime.id===id)).length>=1)
 {
   
    setSelectedAnimes(SelectedAnimes.filter((anime)=>anime.id!==id))
    setanimecounter(animecounter-1)
  }

 // adding anime
 else
 {
   if(SelectedAnimes.length < ChoicesLimit)
   {
      setSelectedAnimes([...SelectedAnimes,...AllAnimes.filter((anime) =>anime.id===id)])
      setanimecounter(animecounter+1)  
    }
}

}
const preChoose = (answer)=>
{
  setCurrentAnswer(answer)  
} 

const ActualChoose = (answer,anime_id,fromsubmit)=>
{

  if(answer===true && TheNext && !Testended)
  { 
      setTestScore(TestScore+1) 
      setTheNext(false)
    
    for (let i =0;i<ChoicesLimit;i++)
    {
      if (SelectedAnimes[i].id===anime_id)
      {
        let items = [...SelectedAnimes]
        let item =  {...items[i]}
        item.score +=1
        items[i] = item
        setSelectedAnimes(items)

      }

    } 
  }
    
  fromsubmit&& setTestended(true)

}

const nextquestion =()=>
{
  // last question 
  if (QuestionNumber+1 ===UserQuestions.length-1)
  {
    setnextbtn(false)
    setsubmitbtn(true)  
  }

  if(QuestionNumber < UserQuestions.length-1)
  {
    ActualChoose(CurrentAnswer,UserQuestions[QuestionNumber].anime,false)
   
    setNumber(QuestionNumber+1)
    setTheNext(true)
  }

}

//end quiz
const Submit = async ()=>
{
    ActualChoose(CurrentAnswer,UserQuestions[UserQuestions.length-1].anime,true)  
    setTestView(false)
    setsubmitbtn(false)
    setResultView(true)
       
}

const ExitTestMode = ()=>
{
  setTestScore(0)
  setNumber(0)
  setSelectedAnimes([])
  setQuestions([])
  setCurrentAnswer(false)
  setanimecounter(false)
  setTestView(false)
  setAnimesView(true)
  setanimecounter(0)
}


const UpdateUserPoints = async()=>
{
 
  const res = await fetch(`http://${IP}:8000/points`,{
    method : 'PUT',
    headers : {
      'Content-type': 'application/json',
      'X-CSRFToken': CsrfToken,
    },
    body: JSON.stringify({
      points:userpoints+TestScore
    })
  })
  const data = await res.json()
  console.log(data)
}

const SendAnimesScores = async()=>
{
 
  const res = await fetch(`http://${IP}:8000/animescore`,{
    method : 'POST',
    headers : {
      'Content-type': 'application/json',
      'X-CSRFToken': CsrfToken
    },
    body: JSON.stringify({
      AnimesResults:SelectedAnimes
    })
  })
  const data = await res.json()
  console.log(data)


}

// sending test data after it ends
useEffect(()=>{
  
  if (Testended===true)
  {    
    UpdateUserPoints()
    SendAnimesScores() 
    setPoints(userpoints+TestScore)   
  }
},[Testended])


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







 if(Authenticated)
 {

   return (
    <div className="App"> 

      <Navbar username={UserName} level={Level} points={userpoints} 
      showprofile={!TestView&&showprofile}/>
    
      
    <ButtonGroup orientation="vertical" className="ButtonsGroup" > 

    {!InterfaceView&& !TestView&&
    
                <Button 
                className="ButtonChild"
                onClick={Home} 
                size="small"
                variant="contained" >
                  Home
                </Button>
        }

 
        {InterfaceView&&
            <Button 
            className="ButtonChild"
            onClick={FetchDashBoard} 
            size="small"
            variant="contained"  
            startIcon={<PeopleRounded/>}>
              DashBoard
            </Button>
        }          
          {InterfaceView&&
              <Button 
              className="ButtonChild"
              onClick={ShowAvailableAnimes} 
                size="small"
                variant="contained" >
                {TestsCount>=1?
                "take Quiz":
                "take your first Test !"  }
              </Button>
            }

             {InterfaceView&&
            <Button 
            className="ButtonChild"
            onClick={Logout} 
            size="small"
            variant="contained"  >
              Logout
            </Button>
            } 
             {AnimesView && animecounter===ChoicesLimit &&
             <Button
              className="ButtonChild"
              onClick={GetQuestions} 
              variant="contained"
              color="primary"  disableElevation
              startIcon={<PlayArrowRounded/>}>
                start
              </Button>
        }
  
          {TestView&&
          <Button 
          className="ButtonChild"
          onClick={ExitTestMode} 
          variant="outlined"  disableElevation
          startIcon={<ExitToAppRounded/>}>
            exit test mode
          </Button>
          }
        </ButtonGroup>
     
        {InterfaceView&& <Interface />} 
        {ResultView&&<Result score={TestScore} NumberOfQuestions={NumberOfQuestions}/>} 


        {AnimesView&& <AnimesChoices all_animes = {AllAnimes} onSelect= {ToggleAddRemoveAnime}
        choicesnumber={animecounter}/>}



        {TestView&& <EachQuestion question = {UserQuestions[QuestionNumber].question}
         id =  {UserQuestions[QuestionNumber].id}
         right_answer = {UserQuestions[QuestionNumber].right_answer}
          choices = {[UserQuestions[QuestionNumber].right_answer,
          UserQuestions[QuestionNumber].choice1,
          UserQuestions[QuestionNumber].choice2,
          UserQuestions[QuestionNumber].choice3,
           ]}
        
         n={QuestionNumber} onChoose={preChoose}/>}

<ButtonGroup orientation="vertical" className="ButtonsGroup">  

          {TestView&& nextbtn&&
          <Button onClick={nextquestion} 
          className="ButtonChild"
          size="small"
          variant="contained"  disableElevation
          endIcon={< NavigateNextRoundedIcon/>}>
            next
          </Button>
          }

          {TestView&&submitbtn&&
          <Button className="ButtonChild" onClick={Submit} variant="contained" endIcon={<ArrowUpwardIcon/>}>
            submit
          </Button>}
  </ButtonGroup>

         { ProfileView && 
        <Profile  level={Level}
        tests_count={TestsCount}
        top_animes = {TopAnimes}
        loading = {TopAnimesLoading} 
        /> } 

         
        {LeaderBoardView&& <LeaderBoard otakus= {TopOtakus} username={UserName} animes={AllAnimes}/>  }  
        <br/>
    </div>

  );
}


else
{
    return(    

        <LoginRegisterView csrftoken={CsrfToken} IP={IP} 
        authenticated={Authenticated}
        authenticate={AuthenticateUser}/>
    );
  }
  
}

export default App;

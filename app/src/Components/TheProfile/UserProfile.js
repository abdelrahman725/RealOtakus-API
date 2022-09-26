import Contributions from './Contributions'
import QuestionsForReview from './QuestionsForReview'

import { useState, useEffect } from "react"
import async_http_request from '../AsyncRequest'

export const UserProfile = () => {
  
  const[approvedcontributions,setapprovedcontributions]= useState([])
  const[pendingcontributions,setpendingcontributions]= useState([])
  const[questionsForReview,setquestionsForReview]= useState([])
  const[animesToReview,setanimesToReview] = useState([])

  const[loading,setloading]= useState(true)

  const getProfileData = async()=>
  {
  
    const data  = await async_http_request({path:"profile"})
    
    //console.log(data.UserAnimeScores)
      
    const anime_options = [{value:1,label:"all animes"}]
      
    const anime_names = new Set()
    data.questionsForReview.map((question ) => 
    anime_names.add(question.anime.anime_name)
    )

    Array.from(anime_names).map((a) => 
      anime_options.push({value:a,label:a})
    )
    
    data.UserContributions.map((q) =>  
      q.approved===true ?
      setapprovedcontributions(prev_approved => [...prev_approved,q]):  
      setpendingcontributions(prev_pending => [...prev_pending,q])
    )
    setanimesToReview(anime_options)
    setquestionsForReview(data.questionsForReview)

    
    setloading(false)
  }

  useEffect(()=>{
    getProfileData()
  },[])

  return (
    <div className="userprofile">
    {!loading?
       <>
       <br/>
        {questionsForReview.length > 0 && 
          <QuestionsForReview
          questions={questionsForReview} 
          animesoptions={animesToReview}/>
        }    
        <br/>
    
          <Contributions approved={approvedcontributions} pending={pendingcontributions}/>

       </>  
       
       :
       <strong>loading</strong>
    }

 
    </div>
  )
}

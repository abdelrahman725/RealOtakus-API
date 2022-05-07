import PendingQuestions from './PendingContributions'
import QuestionsForReview from './QuestionsForReview'
import Animes from './Animes'

import { useContext, useState, useEffect } from "react"
import { ServerContext } from '../../App'

export const UserProfile = () => {
  
  const {server} = useContext(ServerContext)
  const profileurl  = `${server}/home/profile`

  const[mydata,setmydata]= useState()
  const[pendingContributions,setpendingcontributions]= useState()
  const[questionsForReview,setquestionsForReview]= useState()
  const[animes,setanimes]= useState()

  const[loading,setloading]= useState(true)

  const LoadData =async()=>
  {
    const res = await fetch(profileurl)
    const data  = await res.json()
      setmydata(data.data)
      setpendingcontributions(data.PendingContributions)
      setquestionsForReview(data.questionsForReview)
      setanimes(data.animes_with_contributions)
      setloading(false)
      //console.log("user own data : ",data.data)
     console.log("questions that you have to review for approval : ",data.questionsForReview)

     console.log("animes that you contributed to  : ",data.animes_with_contributions)

     console.log("questions that you  have created but are not approved yet : ",data.PendingContributions)
  }


  useEffect(()=>{
    LoadData()
  },[])

  return (
    <div>
       {!loading?
       <>
        <p>data has been loaded successfully</p> 
        <PendingQuestions questions={pendingContributions}/>
        <QuestionsForReview questions={questionsForReview}/>
        <Animes animes={animes}/> 
       </> 
       :
    <strong>still loading</strong>
    }

 
    </div>
  )
}

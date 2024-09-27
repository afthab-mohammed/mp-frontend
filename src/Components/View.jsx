import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { Col, Row } from 'react-bootstrap'
import { getAllUploadedVideoAPI, getCategoryAPI } from '../../service/allAPI'

function View(uploadVideoResponse) {
  const [allVideos,setAllVideos] = useState([])
  const [deleteVideoResponse,setDeleteVideoResponse] = useState(false)

  useEffect(()=>{
    getAllVideos(uploadVideoResponse)
    setDeleteVideoResponse(false)
  },[uploadVideoResponse,deleteVideoResponse])

  const getAllVideos = async()=>{
    const result = await getAllUploadedVideoAPI()
    console.log(result);
    if(result.status==200){
      setAllVideos(result.data)
    }
    else{
      setAllVideos([])
      console.log('API Failed');
      
    }
    
  }
  
  return (
    <div>
    <Row>
      {allVideos?.length>0?allVideos.map(video=>(
          <Col sm={12} md={6} lg={4}>
          <VideoCard video={video}/>
          </Col>
      )):<p>Nothing to display</p>
    }
    </Row>
    </div>
  )
}

export default View

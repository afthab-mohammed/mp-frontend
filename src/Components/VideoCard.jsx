import React from 'react'
import { Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { addHistoryAPI } from '../../service/allAPI';


function VideoCard({video}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    const { title, videoLink } = video;
  
    let today = new Date();
    // console.log( new Intl.DateTimeFormat('en-us', {
    //   day: '2-digit',
    //   month: '2-digit',
    //   year: 'numeric',
    // }).format(today));
    
    let timeStamp = new Intl.DateTimeFormat('en-us', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(today);
  
    let videoHistory = { title, videoLink, timeStamp };
  
    addHistoryAPI(videoHistory)
  };

  const deleteVideo = async(id)=>{
    await deleteSingleVideoAPI(id)
    setDeleteVideoResponse(true)
  }

  const dragStarted=(e,id)=>{
    console.log("Drag Started...VideoId:"+id);
    e.dataTransfer.setData("VideoId",id)
  }
  
  return (
    <div>
        <Card style={{ width: '18rem' }} draggable onDragStart={e=>dragStarted(e,video?.id)}>
      <Card.Img variant="top" src={video.imgUrl} onClick={handleShow}/>
      <Card.Body>
        <Card.Title>{video.title}</Card.Title>
        <button className='btn'> <i className='fa-solid fa-trash text-danger'></i> </button>
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{video.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe 
        width="100%" 
        height="315" 
        src={`${video.videoLink}?autoplay=1`}
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>
        </iframe>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default VideoCard

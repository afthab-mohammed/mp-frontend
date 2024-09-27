import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { uploadVideoAPI } from '../../service/allAPI';

function Add(setUploadVideoResponse) {
  const [uploadVideo,setUploadVideo] = useState({
    id:'',title:'',imgUrl:'',videoLink:''
  })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const getYoutubeLink=(e)=>{
    const {value}=e.target
    if(value.includes("v=")){
      let vID = value.split("v=")[1].slice(0,11)
      console.log(`https://www.youtube.com/embed/${vID}`);
       setUploadVideo({...uploadVideo,videoLink:`https://www.youtube.com/embed/${vID}`})
      
    }
    else{
       setUploadVideo({...uploadVideo,videoLink:""})
    }
  }

  const handleAdd=async()=>{
    const {id,title,imgUrl,videoLink} = uploadVideo

    if(!id || !title || !imgUrl || !videoLink){
      alert('Please Fill The Missing Details')
    }
    else{
      // store video details to the json server
      const result =await uploadVideoAPI(uploadVideo)
      console.log(result);
      
      if(result.status>=200 && result.status<=300){
        // success
        handleClose()
        // alert
        alert('Video added successfully')

        // after getting success response field should be empty
        setUploadVideo({
          id:"",title:"",imgUrl:"",videoLink:""
        })
        setUploadVideoResponse(result.data)
        
      }
      else{
        console.log(result.message);
        
      }
    }
  }


  

  return (
    <>
      <div className="d-flex align-items-center justify-content-between upload-section">
        <h5 className="upload-title">Upload Videos</h5>
        <button onClick={handleShow} className='btn upload-btn'>
          <i className="fa-solid fa-upload upload-icon"></i>
        </button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="custom-modal"
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="modal-title">Upload Your Video</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <FloatingLabel
            controlId="floatingInput"
            label="Video Id"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Video Id"  onChange={(e)=>setUploadVideo({...uploadVideo,id:e.target.value})}/>
          </FloatingLabel>

          <FloatingLabel controlId="floatingTitle" label="Video Title" className="mb-3">
            <Form.Control type="text" placeholder="Video Title" onChange={(e)=>setUploadVideo({...uploadVideo,title:e.target.value})}/>
          </FloatingLabel>

          <FloatingLabel controlId="floatingImageUrl" label="Image Url" className="mb-3">
            <Form.Control type="text" placeholder="Image Url" onChange={(e)=>setUploadVideo({...uploadVideo,imgUrl:e.target.value})} />
          </FloatingLabel>

          <FloatingLabel controlId="floatingVideoUrl" label="Video Url" className="mb-3">
            <Form.Control type="text" placeholder="Video Url" onChange={getYoutubeLink} />
          </FloatingLabel>
          
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={handleClose} className="close-btn">
            Close
          </Button>
          <Button variant="primary" className="upload-btn-primary" onClick={handleAdd}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .upload-section {
          background-color: #f0f2f5;
          padding: 10px 20px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .upload-title {
          font-size: 18px;
          font-weight: 600;
        }

        .upload-btn {
          background-color: #007bff;
          border: none;
          color: white;
          font-size: 18px;
          padding: 10px 12px;
          border-radius: 8px;
          transition: background-color 0.3s ease;
        }

        .upload-btn:hover {
          background-color: #0056b3;
        }

        .upload-icon {
          font-size: 20px;
        }

        .modal-header-custom {
          background-color: #343a40;
          color: white;
          border-bottom: 1px solid #444;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 600;
        }

        .modal-body-custom {
          background-color: #f8f9fa;
          padding: 20px;
        }

        .modal-footer-custom {
          background-color: #e9ecef;
        }

        .close-btn {
          background-color: #6c757d;
          border: none;
        }

        .upload-btn-primary {
          background-color: #007bff;
          border: none;
        }

        .upload-btn-primary:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  );
}

export default Add;

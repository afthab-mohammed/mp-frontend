import { Modal } from 'bootstrap';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { addCategoryAPI, deleteCategoryAPI, getCategoryAPI, updateCategoryAPI } from '../../service/allAPI';


function Category() {

  const[categoryName,setCategoryName] = useState("")

  const [allCategories,setAllCategories]=useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async() =>{
    if(categoryName){
      const result = await addCategoryAPI({categoryName,allVideos:[]})
      console.log(result);
      if(result.status>=200 && result.status<300){
        handleClose()
        setCategoryName("")
      }else{
        alert(result.message)
      }
      
    }else{
      alert("Please add a Category Name")
    }
  }

  const getCategories = async() =>{
    const {data} = getCategoryAPI()
  }

  useEffect(()=>
  {
    getCategories()
  },[])

  // console.log(allCategories);

  const removeCategory = async(id)=>{
    await deleteCategoryAPI(id)
    getCategories()
  }

  const dragOver=(e)=>{
    console.log("videocard dragging over the category");
    e.preventDefault
  }

  const videoDropped=async(e,categoryId)=>{
  }

  const videoDragStarted=(e,VideoId,categoryId)=>{
    let datashare = {VideoId,categoryId}
    e.datatransfer.setData("data",JSON.stringify(datashare))
  }

  const videoDrop=async(e)=>{
    const {videoId,categoryId}= JSON.parse(e.datatransfer.getData("data"))
    console.log(videoId, categoryId);
    const {data}= await getCategoryAPI()
    console.log(data);
    const selectedCategory= data.find(item=>item.id==categoryId)
    let result=selectedCategory.allVideos.filter(video=>video.id!==videoId)
    console.log(result);
    let {id,categoryName}= selectedCategory
    let newCategory= {id,categoryName,allVideos:result}
    console.log(newCategory);
    const res = await updateCategoryAPI(categoryId,newCategory)
    setDropVideoResponse(res)
      }

  // console.log(allVideos);

  return (
    <div>
      <div className="d-grid">
        <button className="btn btn-info">Add Video</button>
      </div>

{
    allCategories?.length>0?allCategories.map(category=>(
    <div className="border rounded mt-5 p-3 ">
      <div className="d-flex justify-content-between align-items-center">
        <h5>Category Name</h5>
        <button className='btn' onClick={()=>removeCategory(category.id)}><i className="fa-solid fa-trash text-danger"></i></button>
      </div>
      <Row droppable="true" onDragOver={(e)=>VideoDragOver(e)} onDrop={e=>videoDrop(e)}>
        {
          category?.allVideos?.length>0?category?.allVideos.map(card=>(
            <Col sm={12} draggable onDragStart={e=>videoDragStarted(e,card.id,category.id)}>
              <videoCard video={card} insideCategory={true}/>
            </Col>
          )):
        }
      </Row>
    </div>
    )): <p>Nothing to Display</p>
  }
  

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form>
          <FloatingLabel controlId="floatingName" label="Category" className="mb-3">
          <Form.control type="text" placeholder="Enter Category Name" onChange={e=> setCategoryName(e.target.value)} />
          </FloatingLabel>
         </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Category

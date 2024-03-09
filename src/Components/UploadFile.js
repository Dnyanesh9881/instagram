import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import PhotoPost from "./PhotoPost";


const API_BASE_URL = "https://instagram-express-app.vercel.app/api/post";
const API_UPLOAD_URL = `${API_BASE_URL}/upload`;
const API_CREATE_URL = `${API_BASE_URL}/create`;
const API_ALLPOST_URL = `${API_BASE_URL}/my-posts`;
const API_DELETEPOST_URL = `${API_BASE_URL}/delete/`;
const API_UPDATEPOST_URL=`${API_BASE_URL}/update/`

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [imgUrl, setImageUrl] = useState("");
  const [imgText, setImageText] = useState("");
  const { token } = useContext(UserContext);
  const [wantToUpload, setWantToUload] = useState(false);
  const [updateImage, setUpdateImage]=useState(false);
  const [updateId, setUpdateId]=useState("");
  const [updateUrl, setUpdateUrl]=useState("");

  const [photoPosts, setPhotoPosts] = useState([]);

  const uploadingFile = async (e) => {
    
    
      e.preventDefault();
    
    

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(API_UPLOAD_URL, formData);
      
      if(updateImage){
        setUpdateUrl(response.data.data.file_url)
      }else{
        setImageUrl(response.data.data.file_url);
      }
      setWantToUload(false);
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  const createPost = async () => {
    try {
      await axios.post(
        API_CREATE_URL,
        { text: imgText, image: imgUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      allPosts();
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  const allPosts = async () => {
    try {
      const response = await axios.get(API_ALLPOST_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPhotoPosts(response.data.data);
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`${API_DELETEPOST_URL}${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response.data);
      allPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const updateFile = async (updateId) => {
 
    console.log(updateId)
   
    try {
       await axios.put(`${API_UPDATEPOST_URL}${updateId}`, {
          image: updateUrl
       }, {
          headers: { Authorization: `Bearer ${token}` },
       });
 
       // Fetch and update all posts
       setUpdateImage(false);
       console.log(updateUrl);
       allPosts();
    } catch (error) {
       console.error("Error updating post:", error.response);
    }
 };
 useEffect(() => {
  if (updateUrl) {
   updateFile(updateId);
  }
}, [updateUrl]);

  useEffect(() => {
    if (token) {
      allPosts();
    }
  }, [token]);

  useEffect(() => {
    if (imgUrl) {
      createPost();
    }
    setImageUrl("");
  }, [imgUrl]);

  return (
    <div className="upload">
      <button onClick={() => setWantToUload(true)} className="add_post">
        Add Post
      </button>
      {wantToUpload && (
        <div className="upload_form_div">
          <form className="upload_form" onSubmit={uploadingFile}>
            <input
              className="file_input"
              type="file"
              placeholder="Choose Photo"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="image text"
              value={imgText}
              onChange={(e) => setImageText(e.target.value)}
            />
            <button type="submit" className="upload_btn">
              Upload
            </button>

            <button className="close_btn" onClick={() => setWantToUload(false)}>
              close
            </button>
          </form>
        </div>
      )}
         {updateImage && (<div className="upload_form_div">
          <form className="upload_form" onSubmit={uploadingFile}>
            <input
              className="file_input"
              type="file"
              onChange={(e)=>setFile(e.target.files[0])
               }
            />
            <button type="submit" className="upload_btn">
              update
            </button>

            <button className="close_btn" onClick={()=>setUpdateImage(false)}>
              close
            </button>
          </form>
        </div>
         )}
      <div className="all_posts">
        {photoPosts.map((post) => (
          <PhotoPost key={post._id} post={post} onDelete={deletePost} setUpdateImage={setUpdateImage} setUpdateId={setUpdateId}/>
        ))}
      </div>
    </div>
  );
};

export default UploadFile;

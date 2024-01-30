
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import PhotoPost from "./PhotoPost"; 

const API_BASE_URL = "https://instagram-express-app.vercel.app/api/post";
const API_UPLOAD_URL = `${API_BASE_URL}/upload`;
const API_CREATE_URL = `${API_BASE_URL}/create`;
const API_ALLPOST_URL = `${API_BASE_URL}/my-posts`;
const API_DELETEPOST_URL=`${API_BASE_URL}/delete/`;

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [imgUrl, setImageUrl] = useState("");
  const [imgText, setImageText] = useState("");
  const { token } = useContext(UserContext);
 
  // console.log(token);
  const [photoPosts, setPhotoPosts] = useState([]);

  const uploadingFile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(API_UPLOAD_URL, formData);
      setImageUrl(response.data.data.file_url);
      
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

      // const createdPost = response.data.data;
    
      // console.log("Post created:", createdPost);
      allPosts();
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };
 
  const allPosts = async () => {
    try {
      const response = await axios.get(
        API_ALLPOST_URL,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPhotoPosts(response.data.data)
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  }

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `${API_DELETEPOST_URL}${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(response.data);
      allPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

 
  useEffect(()=>{
    if(token){
      allPosts();
    }
  },[token])

  useEffect(() => {
    if (imgUrl) {
      createPost();
    }
    setImageUrl("");
  }, [imgUrl]);

  return (
    <div className="upload">
      <form className="upload_form" onSubmit={uploadingFile}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          type="text"
          placeholder="image text"
          value={imgText}
          onChange={(e) => setImageText(e.target.value)}
        />
        <button type="submit">Upload</button>
      </form>

      {photoPosts.map((post) => (
        <PhotoPost key={post._id} post={post} onDelete={deletePost}/>
      ))}
    </div>
  );
};

export default UploadFile;
// import React, { useState, useContext, useEffect, useCallback } from "react";
// import axios from "axios";
// import UserContext from "../context/UserContext";
// import PhotoPost from "./PhotoPost";

// const API_BASE_URL = "https://instagram-express-app.vercel.app/api/post";
// const API_UPLOAD_URL = `${API_BASE_URL}/upload`;
// const API_CREATE_URL = `${API_BASE_URL}/create`;
// const API_ALLPOST_URL = `${API_BASE_URL}/my-posts`;
// const API_DELETEPOST_URL = `${API_BASE_URL}/delete/`;

// const PhotoPostMemoized = React.memo(PhotoPost);

// const UploadFile = () => {
//   const { token } = useContext(UserContext);
//   const [file, setFile] = useState(null);
//   const [imgUrl, setImageUrl] = useState("");
//   const [imgText, setImageText] = useState("");
//   const [photoPosts, setPhotoPosts] = useState([]);
//   console.log(token);

//   const uploadingFile = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       console.error("No file selected.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await axios.post(API_UPLOAD_URL, formData);
//       setImageUrl(response.data.data.file_url);
//     } catch (error) {
//       console.error("Error uploading file:", error.message);
//     }
//   };

//   const createPost = useCallback(async () => {
//     try {
//       const response = await axios.post(
//         API_CREATE_URL,
//         { text: imgText, image: imgUrl },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const createdPost = response.data.data;
//       console.log("Post created:", createdPost);
//       fetchAllPosts();
//     } catch (error) {
//       console.error("Error creating post:", error.message);
//     }
//   }, [imgText, imgUrl, token]);

//   const fetchAllPosts = useCallback(async () => {
//     try {
//       const response = await axios.get(API_ALLPOST_URL, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPhotoPosts(response.data.data);
//     } catch (error) {
//       console.error("Error fetching posts:", error.message);
//     }
//   }, [token]);

//   const deletePost = useCallback(async (postId) => {
//     try {
//       const response = await axios.delete(
//         `${API_DELETEPOST_URL}${postId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log(response.data);
//       fetchAllPosts();
//     } catch (error) {
//       console.error("Error deleting post:", error.message);
//     }
//   }, [token, fetchAllPosts]);

//   useEffect(() => {
//     if (token) {
//       fetchAllPosts();
//     }
//   }, [token, fetchAllPosts]);

//   useEffect(() => {
//     if (imgUrl) {
//       createPost();
//     }
//     setImageUrl(""); // Clear image URL after creating the post
//   }, [imgUrl, createPost]);

//   return (
//     <div className="upload">
//       <form className="upload_form" onSubmit={uploadingFile}>
//         <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//         <input
//           type="text"
//           placeholder="image text"
//           value={imgText}
//           onChange={(e) => setImageText(e.target.value)}
//         />
//         <button type="submit">Upload</button>
//       </form>

//       {photoPosts.map((post) => (
//         <PhotoPostMemoized key={post.id} post={post} onDelete={deletePost} />
//       ))}
//     </div>
//   );
// };

// export default UploadFile;


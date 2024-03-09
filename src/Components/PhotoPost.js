import React from "react";

const PhotoPost = ({ post, onDelete, setUpdateImage, setUpdateId }) => {


  return (
    <div className="photo-post">
      <img
        style={{ width: "500px", height: "600px", objectFit:"contain" }}
        src={post.image}
        alt="postimage"
      />
      <div className="image_text_delete">
      <p className="image_text">{post.text}</p>
      <button className="delete_btn" onClick={()=>onDelete(post._id)}> delete </button>
      <button className="update_btn" onClick={()=>{setUpdateImage(true);
      setUpdateId(post._id)}}>update</button>
      </div>
    </div>
  );
};

export default PhotoPost;

import axios from "axios";

// const uploadFile = async (file) => {
//   const formData = new FormData();

//   formData.append("file", file);
//   formData.append("upload_preset", process.env.REACT_APP_UPLOAD_KEY);

//   const response = await axios.post(
//     `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_USER_KEY}/upload `,
//     formData
//   );

//   return response.data.url;
// };

const uploadFile = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", process.env.REACT_APP_UPLOAD_KEY);

  const isImage = file.type.startsWith('image/');
  
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_USER_KEY}/${
      isImage ? 'image' : 'video'
    }/upload`,
    formData
  );

  return response.data.url;
};

export default uploadFile;

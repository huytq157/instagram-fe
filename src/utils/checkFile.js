// const checkFile = (type, size, file) => {
//   if (!file.type.startsWith(type)) {
//     return false;
//   }

//   if (file.size / 1000000 > size) {
//     return false;
//   }

//   return true;
// };

// export default checkFile;


const isFileValid = (type) => {
  return type.startsWith('image/') || type.startsWith('video/');
};

const checkFile = (allowedTypes, maxSize, file) => {
  const isTypeValid = allowedTypes.some((type) => file.type.startsWith(type));
  const isSizeValid = file.size / 1024 / 1024 < maxSize;

  return isTypeValid && isSizeValid && isFileValid(file.type);
};

export default checkFile;
// const Save = ({ className, color, width, height }) => {
//   return (
//     <div className={className} style={{cursor: "pointer"}}>
//       <svg
//         aria-label="Đã lưu"
//         className="x1lliihq x1n2onr6 x5n08af"
//         fill="currentColor"
//         height="24"
//         role="img"
//         viewBox="0 0 24 24"
//         width="24"
//       >
//         <title>Đã lưu</title>
//         <polygon
//           fill="none"
//           points="20 21 12 13.44 4 21 4 3 20 3 20 21"
//           stroke="currentColor"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           stroke-width="2"
//         ></polygon>
//       </svg>
//     </div>
//   );
// };

// export default Save;


const Save = ({ className, color, width, height }) => {
  return (
    <div className={className} style={{ cursor: "pointer" }}>
      <svg
        aria-label="Đã lưu"
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Đã lưu</title>
        <polygon
          fill="none"
          points="20 21 12 13.44 4 21 4 3 20 3 20 21"
          stroke="currentColor"
          strokeLinecap="round"  
          strokeLinejoin="round" 
          strokeWidth="2"       
        ></polygon>
      </svg>
    </div>
  );
};

export default Save;

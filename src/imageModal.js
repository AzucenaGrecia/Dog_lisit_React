export function ImageModal({ image, setSelectDog }) {
  return (
    <div className="modal" onClick={(e)=> {
      if(e.target === e.currentTarget){
        setSelectDog('');
      }
    }}>
      <img src={image} />
    </div>
  );
}

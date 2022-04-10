
const Thumbnail = ({ title, image, price }: { title: string, image: string, price: string }) => {
  return (
    <div className="pl-3">
      <img className="inline" src={image} alt={title} width="100px" />
      <div className="inline font-medium">{title}</div>
      <div className="ml-2 inline">${price}</div>
      <button className="bg-blue-500 text-white p-2 ml-2" onClick={() => alert(`Added ${title} to cart`)}>Add to cart</button>
    </div>
  );
}

export default Thumbnail;
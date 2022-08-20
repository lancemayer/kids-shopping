const Thumbnail = ({
  title,
  image,
  price,
}: {
  title: string;
  image: string;
  price: string;
}) => {
  return (
    <div className="m-2 p-4 bg-white border-1 rounded-lg drop-shadow-lg">
      <img className="block mx-auto" src={image} alt={title} width="100px" />
      <div className="font-bold text-lg text-center">{title}</div>
      <div>
        <div className="text-center">${price}</div>
        <button
          className="bg-blue-500 text-white px-2 py-1 mt-2 block mx-auto"
          onClick={() => alert(`Added ${title} to cart`)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Thumbnail;

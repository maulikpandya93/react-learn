const RestaurantCard = ({ data }) => {
  const { resName, cuisine, rating, deliveryTime } = data;
  return (
    <div className="res-card">
      <img className="res-logo" src={data.img} />
      <h3>{resName}</h3>
      <h4>{cuisine}</h4>
      <h4>{rating}</h4>
      <h4>{deliveryTime}</h4>
    </div>
  );
};

export default RestaurantCard;

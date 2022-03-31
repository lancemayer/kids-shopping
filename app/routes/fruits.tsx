import Thumbnail from "~/components/Thumbnail";

export default function FruitsPage() {
  return (
    <main>
      {/* <li><Thumbnail title={items[0].name} image={items[0].image} price={items[0].price} /></li> */}
      <li><Thumbnail title="Blueberries" image="./images/blueberries.jpeg" price="5.00" /></li>
      <li><Thumbnail title="Raspberries" image="./images/raspberries.jpeg" price="4.00" /></li>
      <li><Thumbnail title="Blackberries" image="./images/blackberries.jpeg" price="3.00" /></li>
    </main>
  );
}
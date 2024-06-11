import { useBasketStore } from "@/store/basket";
import { TProduct, useProductStore } from "@/store/products";
import { instance } from "@/utils/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { products, setProducts } = useProductStore();
  const { items, addItem, incQuantity } = useBasketStore();
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const { data } = await instance.get<TProduct[]>("/products");
      setProducts(data);
    }

    getProducts();
  }, []);

  function handleAddBasket(product: TProduct): void {
    const isExist = items.find((item) => item.id === product.id);

    if (isExist) {
      incQuantity(product.id);
    } else {
      addItem({ ...product, quantity: 1 });
    }
  }

  function handleClickBasket(): void {
    navigate("/sepet");
  }

  return (
    <div className="h-screen">
      <div className="sticky justify-between flex p-4 top-0 inset-x-0">
        <span></span>
        <button onClick={handleClickBasket}>
          Sepete Git ({items.length} Urun)
        </button>
      </div>
      <div className="container mx-auto">
        <div className="py-24 grid grid-cols-4 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="p-4 flex items-center gap-2 justify-center flex-col border rounded"
            >
              <h2>
                {item.name} - {item.price} TL
              </h2>
              <button
                onClick={() => handleAddBasket(item)}
                className="border rounded py-1 w-full"
              >
                Sepete ekle
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

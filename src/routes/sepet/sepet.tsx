import { useBasketStore } from "@/store/basket";
import { useUserStore } from "@/store/user";
import React from "react";
import "./sepet.css";
import { instance } from "@/utils/axios";
import { useOrderStore } from "@/store/order";
import { useNavigate } from "react-router-dom";

const Sepet: React.FC = () => {
  const { items, incQuantity, decQuantity } = useBasketStore();
  const { user } = useUserStore();
  const { setOrder } = useOrderStore();

  const navigate = useNavigate();

  const totalBasket = items
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  async function handleClickCompleteOrder(): Promise<void> {
    // console.log(items);
    const { data } = await instance.post("/orders/complete", items, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    console.log(data);

    setOrder({
      id: data.order.id,
      amount: data.order.amount,
      gifts: data.gifts,
    });

    navigate("/siparis");
  }

  return (
    <div>
      <div className="container py-24">
        <div className="grid gap-6">
          <div className="flex items-center gap-4 justify-between">
            <h1>Sepetiniz: Toplam ( {totalBasket} TL )</h1>
            <button
              onClick={handleClickCompleteOrder}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sepeti Tamamla
            </button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Ürün Adı</th>
                  <th>Adet</th>
                  <th>Fiyat</th>
                </tr>
              </thead>
              <tbody>
                {items.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>
                      <div className="product-counter">
                        <button
                          disabled={product.quantity === 1}
                          onClick={() => decQuantity(product.id)}
                        >
                          -
                        </button>
                        <span className="">{product.quantity}</span>
                        <button onClick={() => incQuantity(product.id)}>
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      {`${product.quantity} * ${product.price} - ${
                        product.price * product.quantity
                      } TL`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* {items.map((product) => (
          <div key={product.id}>
            <div className="">
              <h1>{product.name}</h1>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export { Sepet };

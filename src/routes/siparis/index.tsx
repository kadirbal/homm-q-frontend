import { useOrderStore } from "@/store/order";

function Siparis() {
  const { id, amount, gifts } = useOrderStore();

  console.log(id, amount, gifts);

  return (
    <>
      <div className="container py-24">
        <div className="w-1/2 mx-auto grid gap-4">
          <h1 className="text-xl font-bold">Siparisiniz olusturuldu</h1>
          <ul>
            <li>Siparis Numarasi: {id}</li>
            <li>Tutar: {amount.toFixed(2)} TL</li>
            {gifts.length ? (
              <li className="py-4">
                <h2 className="font-semibold">Hediye Urunler</h2>
                <ul>
                  {gifts.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Siparis;

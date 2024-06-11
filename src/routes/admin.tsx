import Months from "@/components/custom/Months";
import { usePeriodStore } from "@/store/period";
import "./admin.css";
import { useProductStore } from "@/store/products";
import { useEffect, useState } from "react";
import { instance } from "@/utils/axios";
import ReactSelect from "react-select";
import "react-datepicker/dist/react-datepicker.css";

type TMonth = {
  month: number;
  name: string;
};

function Admin() {
  const { products, setProducts } = useProductStore();
  const { periods, addPeriod, removePeriod, updatePeriod } = usePeriodStore();
  const [campaign, setCampaign] = useState("");
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await instance.get("/products");
      setProducts(data);
    };

    getProducts();
  }, []);

  function handleMonthsChange(item: TMonth): void {
    const isExist = periods.find((period) => period.month === item.month);

    if (isExist) {
      removePeriod(item.month);
    } else {
      addPeriod({
        month: item.month,
        name: item.name,
        minOrderAmount: 0.0,
        gifts: [],
      });
    }
  }

  function handlePeriodChange(
    index: number,
    key: string,
    value: string | number | Array<string>
  ): void {
    updatePeriod(index, key, value);
  }

  async function handleSaveCampaign() {
    const { data } = await instance.post("/campaigns/create", {
      name: campaign,
      startDate,
      periods,
    });

    console.log(data);
  }

  return (
    <>
      <button
        onClick={handleSaveCampaign}
        className="fixed bottom-24 right-24 bg-orange-400 w-36 py-2 rounded text-sm text-white"
      >
        Kaydet
      </button>
      <div className="container">
        <div className="py-24 flex-col gap-8 flex w-1/2 mx-auto">
          <div className="flex flex-col gap-4 w-full ">
            <div className="grid grid-cols-2 gap-4">
              <label className="label-with-input">
                <span>Donem Adi</span>
                <input
                  type="text"
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                />
              </label>
              <label className="label-with-input">
                <span>Donem Baslangic Tarihi</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
            </div>

            <h2 className="font-bold text-sm text-orange-400">
              Lütfen seçmek istediğiniz dönemleri (ay) aşağıdaki butonlardan
              seçiniz.
            </h2>
            <Months
              selectedMonths={periods.map((item) => item.month)}
              onChange={handleMonthsChange}
            />
          </div>

          {periods.length ? (
            <div className="flex flex-col gap-4 w-full ">
              <h2 className="font-bold text-sm text-orange-400">
                Seçilen Dönemler
              </h2>
              <div className="grid gap-2">
                {periods.map((item, index) => (
                  <div key={index} className="grid gap-4 border p-3 bg-white">
                    <div className="flex text-sm gap-3">
                      <h3 className=" font-semibold">
                        {campaign} ({item.name} ayi)
                      </h3>
                      <button
                        className="text-red-500"
                        onClick={() => removePeriod(item.month)}
                      >
                        Kaldir
                      </button>
                    </div>
                    <form className="flex flex-col  gap-4">
                      <label className="label-with-input">
                        <span>Minimum Sepet Tutari</span>
                        <input
                          type="number"
                          value={item.minOrderAmount}
                          onChange={(e) =>
                            handlePeriodChange(
                              index,
                              "minOrderAmount",
                              e.target.value
                            )
                          }
                        />
                      </label>
                      <div className="col-span-2">
                        <h3 className="text-sm font-semibold pb-1">
                          Hediye urunler
                        </h3>
                        <ReactSelect
                          isMulti
                          onChange={(e) =>
                            handlePeriodChange(
                              index,
                              "gifts",
                              e.map((item) => item.value)
                            )
                          }
                          options={products.map((item) => ({
                            value: item.id,
                            label: `${item.name} - ${item.price} TL`,
                          }))}
                        ></ReactSelect>
                      </div>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;

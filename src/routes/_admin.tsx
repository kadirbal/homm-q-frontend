import { create } from "zustand";
import "./admin.css";

const usePeriodStore = create((set) => ({
  periods: [
    {
      name: "",
      month: null,
      gifts: [],
    },
  ],
  addPeriod: (period) =>
    set((state) => ({ periods: [...state.periods, period] })),
}));
const Dashboard = () => {
  const { periods, addPeriod } = usePeriodStore();
  function handleClickAddPeriod(): void {
    addPeriod({
      name: "",
      month: null,
      gifts: [],
    });
  }

  return (
    <div className="h-screen">
      <div className="w-64 flex items-start py-4 justify-center fixed inset-y-0 left-0 bg-cyan-50">
        <img
          src="https://hommcdn.com/frontend/new_images/logo_yeni.png"
          className="w-16 h-auto"
          alt=""
        />
      </div>

      <div className="pl-64">
        <div className="h-16 bg-white sticky top-0"></div>
        <main className="container py-8">
          <div className="flex justify-center">
            <div className="bg-white grid w-1/2  gap-5 rounded px-16 py-8">
              <h2 className="font-bold text-2xl">Kampanya Olustur</h2>
              <form className="grid gap-5">
                <label className="label-with-input">
                  <span>Kampanya Isim</span>
                  <input type="text" />
                </label>
                {/* <label className="label-with-input">
                  <span>Minimum Sepet Tutari</span>
                  <input type="number" defaultValue={0.0} />
                </label> */}
              </form>

              <div className="">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">Donemler</h2>
                  <button
                    className="text-xs rounded py-1 px-2 bg-cyan-200"
                    onClick={handleClickAddPeriod}
                  >
                    Donem ekle
                  </button>
                </div>

                <div className="divide-y">
                  {periods.map((item, index) => (
                    <div key={index} className="py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <label className="label-with-input">
                          <span>Donem Adi</span>
                          <input type="text" />
                        </label>
                        <label className="label-with-input">
                          <span>Minimum Sepet Tutari</span>
                          <input type="number" />
                        </label>
                      </div>
                      <div className="py-4">
                        <h6 className="text-sm font-semibold">
                          Hediye urunler
                        </h6>
                        <div className="overflow-x-auto"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

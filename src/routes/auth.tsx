import Button from "@/components/Button";
import Input from "@/components/Input";
import { useTabStore, useFormStore } from "@/store/auth";
import { TUser, useUserStore } from "@/store/user";
import { instance } from "@/utils/axios";
import { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { active, setActive } = useTabStore();
  const { setForm, form } = useFormStore();
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      const { data } = await instance.post<TUser>(
        `/auth/${active === "login" ? "login" : "register"}`,
        form
      );

      setUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setForm(name, value);
  }

  return (
    <div className="h-screen bg-gray-100 grid place-content-center">
      <div className="w-96 rounded border bg-white">
        <div className="flex border-b">
          <button
            onClick={() => setActive("login")}
            className={`grow py-4 ${
              active === "login" ? "text-indigo-500" : ""
            }`}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => setActive("register")}
            className={`grow py-4 ${
              active === "register" ? "text-indigo-500" : ""
            } `}
          >
            Kayıt Ol
          </button>
        </div>
        <div className="p-3">
          <form onSubmit={handleSubmit} className="">
            <Input
              name="email"
              onChange={handleChange}
              value={form.email}
              placeholder={"Email"}
            ></Input>
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              value={form.password}
              placeholder={"Parola"}
            ></Input>

            <Button onClick={handleSubmit}>
              {active === "login" ? "Giris Yap" : "Kayit Ol"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

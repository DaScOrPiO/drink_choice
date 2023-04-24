import React, { useEffect, useState } from "react";
import Item from "./item";
import { ImExit } from "react-icons/im";
import axios from "axios";
import Animation from "./animation";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [data, setData] = useState("");
  const [option, setOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("");

  //View username on page
  const [renderToken, setRenderToken] = useState();
  const hour = new Date().getHours();

  const getUserInfo = () => {
    const url = "http://localhost:5000/userDetails";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "Application/json",
        "Accept-Control-Allow-Origin": "*",
      },
    };
    axios
      .post(
        url,
        {
          token: window.localStorage.getItem("token"),
        },
        config
      )
      .then((data) => {
        setRenderToken(data.data.data.fname);
        return console.log(data.data.data.fname, "userData");
      });
  };

  getUserInfo();

  const navigateUser = (e) => {
    window.location.reload();
  };

  //Logout user
  const signOut = () => {
    window.localStorage.clear();
    setTimeout(() => navigateUser(), 3000);
  };

  //data Fetch from TOM API
  useEffect(() => {
    const getData = async () => {
      const url = "https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12";
      const config = {
        headers: { Authorization: "Token 9307bfd5fa011428ff198bb37547f979" },
      };
      try {
        const call = await axios.get(url, config);
        const result = call.data.data;
        const modelName = result.attributes.name;
        const userOptions = result.attributes.metadata.attributes;
        const opt = userOptions.map((el) => el.name);
        setOption(opt);
        setData(modelName);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <main className="w-full h-full user-pagebg">
        <header className="w-full h-1/4 p-2 header-gradient flex flex-col justify-center items-center">
          {hour <= 11 ? (
            <h2 className="text-2xl">
              Good morning
              <span className="mx-2 text-2xl font-bold">{renderToken}</span>
            </h2>
          ) : (
            ""
          )}
          {hour > 11 && hour <= 16 ? (
            <h2 className="text-2xl">
              Good afternoon
              <span className="mx-2 text-2xl font-bold">{renderToken}</span>
            </h2>
          ) : (
            ""
          )}

          {hour > 16 ? (
            <h2 className="text-2xl">
              Good evening
              <span className="mx-2 text-2xl font-bold">{renderToken}</span>
            </h2>
          ) : (
            ""
          )}

          <h2 className="text-center text-4xl font-bold mt-4">
            Make choice now
          </h2>
          <button
            className="lg:absolute top-18 right-20 md:static flex justify-center 
          items-center flex-col hover:text-gray-200 transition-colors duration-500 ease-in mt-6"
            onClick={signOut}
          >
            <ImExit size="35px" />
            Logout
          </button>
        </header>

        <section className="flex flex-col justify-center items-center h-3/4 w-full">
          <div className="w-full flex justify-center items-center">
            {loading ? (
              <Animation fill="#967306" />
            ) : (
              <>
                <input
                  type="text"
                  className="input-2"
                  value={data}
                  readOnly={true}
                />
                <select
                  // name="selected"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  id=""
                  className="selct mx-6"
                >
                  {option.map((el, i) => (
                    <option key={i} value={el} className="opt">
                      {el}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          {!loading && selected === "" ? (
            <h2 className="mt-6 font-bold text-2xl">
              Your Selection appears here
            </h2>
          ) : (
            <h2 className="mt-6 font-bold text-2xl">
              You Selected: {selected}
            </h2>
          )}
        </section>

        <section className="w-full h-auto bg-black px-4 py-4 flex flex-col flex-wrap">
          <h2 className="text-center text-2xl radial-text">
            &copy; Oladunni Faith
          </h2>
          {/* <div className="md:h-3/4 sm:h-1/4 w-full flex flex-wrap justify-center">
            <Item />
          </div> */}
        </section>
      </main>
    </>
  );
}

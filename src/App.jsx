import Leaflet from "./components/Leaflet";
import { useState, useEffect } from "react";
import { fetchGeoIPInfo, fetchGeoIPInfoSrc2 } from "./data";
import { arrow, loader } from "./assets";
import Modal from "./components/Modal";

function App() {
  const [ipInfo, setIpInfo] = useState(null); // longitud y latitud
  const [loading, setLoading] = useState(true);
  const [ip, setIp] = useState("");
  const [ipData, setIpData] = useState(null); // datos de localidad
  const [inputValue, setInputValue] = useState(""); // Nuevo estado para la input
  const [open, setOpen] = useState(false); //modal

  //console.log(ipInfo);
  //console.log(ipData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, dataSrc2] = await Promise.all([
          fetchGeoIPInfo({ ip }),
          fetchGeoIPInfoSrc2({ ip }),
        ]);
        setIpInfo(data);
        // console.log(data);
        setIpData(dataSrc2);
        //  console.log(dataSrc2);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [ip]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    // Expresión regular para verificar el formato
    const ipFormatRegex = /^\d+\.\d+\.\d+\.\d+$/;

    if (inputValue.trim() !== "") {
      if (ipFormatRegex.test(inputValue.trim())) {
        console.log("Formato correcto:", inputValue);
        setIp(inputValue.trim());
        setInputValue("");
      } else {
        setOpen(true); // open modal
      }
    } else {
      setOpen(true); // open modal
      setInputValue("");
    }
  };

  return (
    <>
      <div>
        <div className="relative ">
          {/* form + bg */}
          <div className="bgMobile h-[18.75rem]">
            <h1 className="py-[1.8125rem] text-center px-6 text-[1.625rem] md:text-[2rem] text-white font-medium leading-[1.875rem] tracking-[-0.0145rem]">
              IP Address Tracker
            </h1>
            <form className="flex max-w-[34.6875rem] mx-auto items-center pb-6 px-6">
              <input
                type="text"
                placeholder="Search for any IP address or domain"
                className="pl-6 flex-1 outline-0 rounded-l-lg text-lg leading-normal h-[3.625rem] text-primaryDark  placeholder:text-primaryDark/50"
                value={inputValue}
                onChange={handleInputChange}
              />

              <button
                onClick={handleButtonClick}
                className="bg-black hover:bg-[#3F3F3F] transition-all duration-300 flex items-center justify-center rounded-r-lg w-[3.625rem] h-[3.625rem]"
              >
                <img src={arrow} alt="button" width={11} height={14} />
              </button>
            </form>
          </div>

          {/* info  */}
          <div className="px-6 max-w-[69.375rem] relative mt-[-130px]  mb-[-195px] md:mb-[-70px] mx-auto w-full  z-[500]">
            <div className="bg-white rounded-[0.9385rem] shadow-custom">
              {!loading ? (
                <div className="py-6 lg:py-[2.3125rem] [&>*]:md:px-8 md:flex text-center md:text-left ">
                  <p className="pb-6 md:pb-0 md:flex-1 text-primaryDark last:md:border-r-0 md:border-r lg:text-[1.625rem] lg:leading-[1.875rem] lg:tracking-[-0.0145rem] md:border-r-black/20 font-medium  text-xl leading-6 tracking-[-0.0111875rem]">
                    <span className=" block text-[0.625rem] lg:text-[0.75rem] opacity-50 tracking-[0.091125rem] lg:tracking-[0.109rem] leading-normal font-bold">
                      IP ADDRESS
                    </span>
                    {ipData?.ip}
                  </p>
                  <p className="pb-6 md:pb-0 md:flex-1 text-primaryDark last:md:border-r-0 md:border-r lg:text-[1.625rem] lg:leading-[1.875rem] lg:tracking-[-0.0145rem] md:border-r-black/20 font-medium  text-xl leading-6 tracking-[-0.0111875rem]">
                    <span className=" block text-[0.625rem] lg:text-[0.75rem]  opacity-50 tracking-[0.091125rem] lg:tracking-[0.109rem] leading-normal font-bold">
                      LOCATION
                    </span>
                    {ipInfo?.city}
                  </p>
                  <p className="pb-6 md:pb-0 md:flex-1 text-primaryDark last:md:border-r-0 md:border-r lg:text-[1.625rem] lg:leading-[1.875rem] lg:tracking-[-0.0145rem] md:border-r-black/20 font-medium  text-xl leading-6 tracking-[-0.0111875rem]">
                    <span className=" block text-[0.625rem] lg:text-[0.75rem]  opacity-50 tracking-[0.091125rem] lg:tracking-[0.109rem] leading-normal font-bold">
                      TIMEZONE
                    </span>
                    {ipData?.location?.timezone}
                  </p>
                  <p className="pb-6 md:pb-0 md:flex-1 text-primaryDark last:md:border-r-0 md:border-r lg:text-[1.625rem] lg:leading-[1.875rem] lg:tracking-[-0.0145rem] md:border-r-black/20 font-medium  text-xl leading-6 tracking-[-0.0111875rem]">
                    <span className=" block text-[0.625rem] lg:text-[0.75rem]  opacity-50 tracking-[0.091125rem] lg:tracking-[0.109rem] leading-normal font-bold">
                      ISP
                    </span>
                    {ipData?.isp}
                  </p>
                </div>
              ) : (
                <div className=" grid place-content-center py-10 ">
                  <img className=" w-20 h-20" src={loader} alt="loader" />
                </div>
              )}
            </div>
          </div>
        </div>

        {ipInfo && <Leaflet lng={ipInfo?.longitude} lat={ipInfo?.latitude} />}
      </div>

      {/* modal */}
      <Modal open={open}>
        <p className=" text-center pb-6 text-primaryDark uppercase lg:text-[1.625rem] lg:leading-[1.875rem] lg:tracking-[-0.0145rem] md:border-r-black/20 font-medium  text-xl leading-6 tracking-[-0.0111875rem]">
          Invalid input
        </p>
        <div className=" flex flex-col items-center justify-center gap-4 md:flex-row">
          <div className=" flex w-full justify-center">
            <button
              className="text-white px-10 rounded-md py-2 bg-black mx-auto  hover:bg-[#333] transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              Go back
            </button>
          </div>
          <div className=" flex w-full justify-center">
            <button
              className="text-white px-10 rounded-md py-2 whitespace-nowrap bg-black mx-auto  hover:bg-[#333] transition-all duration-200"
              onClick={() => {
                setIp(""), setOpen(false), setInputValue("");
              }}
            >
              My location
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;

//imports asssets
import Logo from "../assets/tkt_logo.svg";

export default function menu() {
  return (
    <>
      <div className="h-[190px] bg-[#F9F9F9] px-5 py-10">
        <div className="flex justify-between items-center">
          <img src={Logo} alt="TKT Logo" className="h-[20px]" />
          <div className="h-[42px] w-[42px] bg-gradient-to-b from-[#99ACFF] to-[#4E6EFC] rounded-full"></div>
        </div>
        <h1 className="text-[20px] mt-4">Welcome on TKT dashboard</h1>
      </div>
    </>
  );
}

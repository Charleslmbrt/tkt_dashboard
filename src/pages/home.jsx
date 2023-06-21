import { useState } from "react";

//imports packages
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

//imports components
import Menu from "../components/menu";

export default function home({ isLoading, businessList, sectors }) {
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const navigate = useNavigate();

  const handleSectorChange = (value) => {
    setSelectedSector(value);
    setSelectedCompany("all");
  };

  const handleCompanyChange = (value) => {
    setSelectedCompany(value);
    setSelectedSector("all");
  };

  const filteredBusinessList = businessList.filter(
    (business) =>
      (selectedSector === "all" || business.sector === selectedSector) &&
      (selectedCompany === "all" || business.name === selectedCompany)
  );

  const navigateToCompany = (companyId) => {
    navigate(`/company/${companyId}`);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <Menu />
      <div className="m-[20px]">
        <Select
          className="w-full"
          defaultValue="Sector*"
          size="large"
          onChange={handleSectorChange}
          options={[
            {
              value: "all",
              label: "All",
            },
            ...sectors.map((sector) => ({
              value: sector,
              label: sector,
            })),
          ]}
        />
        <Select
          className="w-full mt-[24px]"
          defaultValue="Company*"
          size="large"
          onChange={handleCompanyChange}
          options={[
            { value: "all", label: "All" },
            ...businessList.map((business) => ({
              value: business.name,
              label: business.name,
            })),
          ]}
        />
        <div className="flex justify-between mx-5 text-[#686868] text-[12px] font-medium my-7">
          <p>COMPANY</p>
          <p>N° SIREN</p>
          <p>CATEGORY</p>
        </div>
        {filteredBusinessList.map((company) => {
          return (
            <div
              key={company.id}
              onClick={() => navigateToCompany(company.id)}
              className="flex justify-between items-center border border-[#D6D6D6] rounded-lg p-5 text-[14px] mt-5 cursor-pointer"
            >
              <p className="grow uppercase max-w-[85px]">{company.name}</p>
              <p className="grow text-center">{company.siren}</p>
              <div className="grow-0 text-white bg-[#4E59FF] px-[8px] py-[6px] rounded-md uppercase ">
                {company.sector}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

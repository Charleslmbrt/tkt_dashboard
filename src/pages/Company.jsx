import { useState, useEffect } from "react";

//imports packages
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//imports asssets
import Arrow from "../assets/arrow.svg";

export default function Company({ isLoading, setIsLoading }) {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `https://test.wertkt.com/api/biz/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCompany(response.data);
        console.log("company", company);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCompanyData();
  }, [id, setIsLoading]);

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        const response = await axios.get(
          `https://test.wertkt.com//api/result/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setResult(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchResultData();
  }, [id, setIsLoading]);

  const navigateToBack = () => {
    navigate("/");
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      {company && result && (
        <>
          <div className="h-[190px] bg-[#F9F9F9] px-5 py-10">
            <div className="flex items-center">
              <button
                onClick={() => navigateToBack()}
                className="flex items-center justify-center h-[42px] w-[42px] bg-gradient-to-b from-[#99ACFF] to-[#4E6EFC] rounded-full"
              >
                <img src={Arrow} alt="Back" className="h-[20px]" />
              </button>
              <div className="ml-10">
                <h2>{company.name}</h2>
                <p>N° SIREN: {company.siren}</p>
              </div>
            </div>
          </div>

          <div className="mx-5">
            <div className="border border-[#D6D6D6] rounded-lg p-5 text-[14px] mt-5">
              <p>Chiffre d'affaire</p>
              <p>{result.ca}</p>
            </div>

            <div className="border border-[#D6D6D6] rounded-lg p-5 text-[14px] mt-5">
              <p>EBITDA</p>
              <p>{result.ebitda}</p>
            </div>

            <div className="border border-[#D6D6D6] rounded-lg p-5 text-[14px] mt-5">
              <p>LOSS</p>
              <p>{result.loss}</p>
            </div>

            <div className="border border-[#D6D6D6] rounded-lg p-5 text-[14px] mt-5">
              <p>MARGIN</p>
              <p>{result.margin}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

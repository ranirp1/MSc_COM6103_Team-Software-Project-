import { RxCross2 } from "react-icons/rx";
import ReportImage from "../../../assets/report.svg";
import { useState } from "react";
import { API_URL } from "../../../constants/constant";
import Tippy from "@tippyjs/react";

const ReportDialog = () => {
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  async function callGenerateReport(
    userId: string,
    startDate: string,
    endDate: string
  ) {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/generate_report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          start_date: startDate,
          end_date: endDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.pdf";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="modal-box">
      <form
        method="dialog"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          await callGenerateReport(userId, startDate, endDate);
        }}
      >
        <p className="py-2"></p>
        <img
          src={ReportImage}
          alt="report"
          className=" flex self-center place-content-center place-self-center w-full"
        />

        <div className="form-control">
          <label
            htmlFor="userID"
            className="block font-medium leading-6 text-black"
          >
            User ID
          </label>
          <div className="mt-2">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="input input-bordered w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="flex flex-row py-2">
          <div className=" pr-2 w-52 form-control">
            <label
              htmlFor="startDate"
              className="block font-medium leading-6 text-black"
            >
              Start Date
            </label>
            <div className="mt-2">
              <input
                type="date"
                value={startDate}
                required
                onChange={(e) => setStartDate(e.target.value)}
                className="input input-bordered w-full text-black rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className=" w-52">
            <label
              htmlFor="startDate"
              className="block font-medium leading-6 text-black"
            >
              End Date
            </label>
            <div className="mt-2">
              <input
                type="date"
                value={endDate}
                required
                onChange={(e) => setEndDate(e.target.value)}
                className="input input-bordered w-full text-black rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <button className="btn btn-primary w-full mt-4">
          {isLoading ? "Loading...." : "Generate Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportDialog;

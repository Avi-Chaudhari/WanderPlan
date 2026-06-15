import { useEffect, useState } from "react"
import api from "../../../api/api";
import { toast } from "react-toastify";
import CreateExpense from "./CreateExpenceCard";

export default function SummeryDetails(props: { tripId: string }) {

  interface SummaryType {
    totalBudget: number;
    totalSpent: number;
    remainingBudget: number;
    isOverBudget: boolean;
    expenseOverview: {
      id: string
      category: string;
      total: number;
      day: string;
      time: string;
    }[]
  }

  const [summary, setSummary] = useState<SummaryType>();

  function fetchSummery() {
    api.get(`trips/${props.tripId}/expenses/summery`)
      .then((response) => {
        setSummary(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        let msg = error.response.data.message || error.name || error.message
        toast.error(msg);
      })
  }

  function handleDeleteClick(e: any) {
    try {
      let id = e.target.id as string;

      api.delete(`/trips/${props.tripId}/expenses/${id}`)
        .then((response) => {
          if (response.data.success) {
            toast.info(response.data.message);
            const data = summary ? summary.expenseOverview.filter(e => (e.id !== id)) : [];

            setSummary({
              totalBudget: summary?.totalBudget || 0,
              totalSpent: summary?.totalSpent || 0,
              remainingBudget: summary?.remainingBudget || 0,
              isOverBudget: summary?.isOverBudget || false,
              expenseOverview: data
            })

          }
        }).catch((error: any) => {
          console.log(error);
          let msg = error.response.data.message || error.name || error.message
          toast.error(msg);
        })

    } catch (error: any) {
      console.log(error);
      let msg = error.response.data.message || error.name || error.message
      toast.error(msg);
    }
  }


  useEffect(() => {
    fetchSummery();
  }, [])

  return (
    <div  >
      <div className="shadow bg-white p-3 border border-2 border-dark-subtle rounded-2 row mb-3" style={{ fontSize: "70%" }}>
        <h5 className=" fw-bold text-center border-bottom border-3 pb-2">Expense Section</h5>
        <CreateExpense tripId={props.tripId} onCreate={fetchSummery} />
      </div>
      {
        !summary ? <> <i>Waiting to load summary data</i></> :
          <div style={{ fontSize: "80%" }}>
            <div className=" shadow bg-white p-1 border border-2 border-dark-subtle rounded-2 row">
              <div className=" col-6">
                <div className=" fw-semibold">Total Budget:</div>
                <div className=" fw-semibold">Total Spent:</div>
                <div className=" fw-semibold">Remaining:</div>
              </div>
              <div className="col-6 text-end">
                <div className=" fw-semibold">{summary?.totalBudget}</div>
                <div className=" fw-semibold">{summary?.totalSpent}</div>
                <div className=" fw-semibold">{summary?.remainingBudget}</div>
              </div>
              <div className=" d-flex justify-content-center">
                <span className=" fw-semibold me-2">Spent</span>
                <div className="progress w-100 m-2">
                  <div
                    className="progress-bar rounded-3"
                    role="progressbar" style={{ width: `${Number.parseInt(`${((summary?.totalSpent || 0) / (summary?.totalBudget || 0)) * 100}`)}%` }}
                  >
                    {Number.parseInt(`${((summary?.totalSpent || 0) / (summary?.totalBudget || 0)) * 100}`)}%
                  </div>
                </div>
                <span className=" fw-semibold ms-3">Limit</span>
              </div>
            </div>
            <div className=" shadow bg-light border border-2 border-dark-subtle rounded-2 mt-3 row overflow-auto " style={{ height: "300px" }}>

              <h5 className=" text-center border fw-bold mb-0 mt-1 text-decoration-underline ">Expense Item Ledger</h5>
              <div>
                {
                  summary.expenseOverview.map((e) =>
                    <div key={e.id} className="row mx-2 mt-0 p-2 border border-1 rounded-3 bg-white fw-semibold shadow">
                      <div className=" col-5">
                        <div>
                          <div>{e.day}, {e.time}</div>
                          <div>{e.category}</div>
                        </div>
                      </div>
                      <div className=" col-5">
                        <div>
                          {"INR"} {e.total}
                        </div>
                      </div>
                      <div className=" col-2  d-flex justify-content-center " id={e.id}>
                        <button onClick={handleDeleteClick} id={e.id} className=" btn btn-outline-secondary text-danger"> <span id={e.id} className="bi bi-trash-fill"></span></button>
                      </div>
                    </div>
                  )
                }
              </div>

            </div>
          </div>
      }
    </div>
  )
}
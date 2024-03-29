import { Width } from "devextreme-react/cjs/chart";
import { gregorian_to_jalali } from "../../../services/gregorian-to-jalali";
import useFetchComments from "../../costomHooks/useFetchComments";
import useFetchTickets from "../../costomHooks/tickets/useFetchTickets";
import useFetchEspesiallyTickets from "../../costomHooks/tickets/useFetchEspesiallyTickets";
import { useEffect } from "react";

const Comments = () => {

    const convertDate = (currentDate) => {
        var date_temp = currentDate;
        var date_converted = date_temp.split(" ");
        var date_request_temp = date_converted[0].split("-");
        var reg_date = gregorian_to_jalali(parseInt(date_request_temp[0]), parseInt(date_request_temp[1]), parseInt(date_request_temp[2]));
        var strDate = reg_date[0] + "-" + reg_date[1] + "-" + reg_date[2];
        return strDate;
    }

    const statusToFarsi = (priorities) => { 
        switch(priorities){
            case "open":
                return "باز";

            case "In Progress":
                return "در حال انجام";

            case "Wait For Response":
                return "منتظر جواب";

            case "Closed":
                return "بسته";
        }
    }

    const url = new URL(window.location.href);
    const ticketId = url.searchParams.get('ticket');


    // const userId = url.searchParams.get('usr');
    // const currentUserId = localStorage.getItem('userId');

    const spesiallyTicket = useFetchEspesiallyTickets(ticketId);
    const comments = useFetchComments(ticketId);

    return (
        <>
            <div className="p-2" dir="rtl">
                <form>
                    <div className="d-flex gap-2">
                        <label>موضوع:</label>
                        <input className="input-group p-1 rounded border-1 text-muted" readOnly value={spesiallyTicket && spesiallyTicket.ticket_title} type="text" style={{backgroundColor:"#f4df7f"}}/>
                        <label>تاریخ:</label>
                        <input className="rounded p-1 border-1 text-muted" readOnly value={spesiallyTicket && convertDate(spesiallyTicket.createdtime)} type="text" style={{ backgroundColor: "#f4df7f" }} />
                        <label>اولویت:</label>
                        <input className="rounded p-1 border-1 text-muted" readOnly value={spesiallyTicket && spesiallyTicket.ticketpriorities} type="text" style={{ backgroundColor: "#f4df7f" }} />
                        <label>وضعیت:</label>
                        <input className="rounded p-1 border-1 text-muted" readOnly value={spesiallyTicket && statusToFarsi(spesiallyTicket.ticketstatus)} type="text" style={{ backgroundColor: "#f4df7f" }} />
                    </div>
                    <div className="d-flex gap-4 mt-2">
                        <label>شرح:</label>
                        <textarea className="input-group p-1 rounded text-muted" readOnly value={spesiallyTicket && spesiallyTicket.description} type="text" style={{ backgroundColor: "#f4df7f" }}/>
                    </div>
                </form>
            </div>
            <hr />
            <hr />
            <hr />

            <div className="overflow-auto p-2 pt-0 fw-bold" style={{ maxHeight: "700px" }} dir="rtl">
                <div className="mt-0">
                    {
                        comments && comments.result && (
                            comments.result.map((comment, index) => {
                                return (
                                    // <div class="col-md-9 col-sm-9 col-sx-9 col-lg-9 mt-4 rounded" dir="rtl">
                                    <div class="col mt-4 rounded" dir="rtl">
                                        <div key={index} class="col navbar rounded-top fs-lg fw-bold p-1 text-light" style={{ backgroundColor: "#1f96a5" }}><span><span className="fw-normal">پشتیبان</span> || تاریخ ثبت: <span className="fw-normal" dir="rtl">{convertDate(comment.createdtime)}</span></span></div>
                                        <div key={index} class="col mt-0 rounded-bottom fs-lg p-2" style={{ backgroundColor: "#e2cae2" }}>{comment.commentcontent}</div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Comments;
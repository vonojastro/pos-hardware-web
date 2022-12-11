import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import ListTab from "../../../components/ListTab";
import ListTabDisplay from "../../../components/CashierDisplay";
import TransactionForm from "../../../components/TransactionForm";
import { getTransactionList } from "../../../redux/actions/transactionsActions";
import dayjs from "dayjs";

const CashierDashboard = () => {
  const [tab, setTab] = useState("");

  const date = dayjs(new Date()).format("YYYY-MM-DD");
  const [dateSearch, setDateSearch] = useState(date);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionList());
  }, [dispatch]);

  return (
    <div className="w-11/12 mx-auto z-0">
      <div className="grid grid-cols-3 h-[600px]">
        <div className="col-span-1 flex flex-col justify-center items-center">
          <TransactionForm />
        </div>
        <div className="col-span-2 border m-3 ">
          <div className="bg-white w-full h-full">
            <ListTab
              setTab={setTab}
              tab={tab}
              dateSearch={dateSearch}
              setDateSearch={setDateSearch}
              date={date}
            />
            <ListTabDisplay tab={tab} dateSearch={dateSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;

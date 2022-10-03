import e from 'cors';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionList } from '../redux/actions/transactionsActions';
import dayjs from 'dayjs';

const SearchList = () => {
const [search, setSearch] = useState("")


  const dispatch = useDispatch();

  const transactionList = useSelector((state) => state.transactionList);
  const { transactions } = transactionList;

  useEffect(() => {
    dispatch(getTransactionList());
  }, [dispatch]);

const transactionInitialValue = Array.isArray(transactions) ? transactions : []

const filtered = transactionInitialValue?.filter((item) => item.name.toLowerCase() == search.toLowerCase()) 



  return (
  <div className="w-11/12 mx-auto h-[600px] flex flex-col justify-center items-center p-5">

<form className='bg-green-500 m-3'>
    <input type='text' className='px-2 py-1 border' value={search} onChange={(e) => setSearch(e.target.value)}/>
</form>

      <div className="p-3 border w-full h-full">
        
        <table className="w-full text-center gap-5">
          <thead>
            <tr className="text-sm">
              <th className="py-3">Date </th>
              <th>Name </th>
              <th>Description </th>
              <th>Amount</th>
            </tr>
          </thead>

{filtered?.map((item, index) => (

<tbody>
            <tr key={index}>
                <td>{dayjs(item.createdAt).format("DD/MM/YYYY")}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.amount}</td>
            </tr>
        </tbody>

))}
        
        </table>
      </div>
    </div>
  )
}

export default SearchList
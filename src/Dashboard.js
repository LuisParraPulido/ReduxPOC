import styles from './Dashboard.module.css';
import { LoadingIcon } from './Icons';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './store/totalRevenueSlice';
import { fetchOrders } from './store/ordersSlice';


const SellerRanking = ({ position, sellerName, sellerRevenue }) => {
  return (
    <tr>
      <td>{position}</td>
      <td>{sellerName}</td>
      <td>${sellerRevenue}</td>
    </tr>    
  );
}

const Dashboard = () => {
  const [sellers, setSellers] = useState([])
  const totalRevenue = useSelector((state) => state.totalRevenue.value)
  const orders = useSelector((state) => state.orders.orders)
  const error = useSelector((state) => state.orders.error)
  const dispatch = useDispatch()
  useEffect(() => {
    requestOrders()
  },[])

  useEffect(() => {
    if(!error && orders.length) {
      handleOrders()
    }
  },[orders, error])

  const requestOrders = () => dispatch(fetchOrders());

  const handleOrders = () => {
      for(let i in orders) {
        if(orders[i].status === 'Confirmed'){
          dispatch(increment(orders[i].revenue))
          let seller = sellers.findIndex(item => item.sellerName === orders[i].sellerName)
          if(seller !== -1) {
            let sum = parseFloat(sellers[seller].sellerRevenue)  + orders[i].revenue
            sellers[seller].sellerRevenue = sum.toFixed(2);
          } else {
            sellers.push({
              sellerName : orders[i].sellerName,
              sellerRevenue: orders[i].revenue.toFixed(2)
            })
          }

        }
      }
      let positions = sellers.sort((a,b) => b - a)
      setSellers(positions)
  }



  return (
    <div>
      <header className={styles.header}>        
        <h1>Top Sellers</h1>        
      </header>
      <main>
        {orders.length === 0 || error ? <LoadingIcon /> : null}  
       { error && <div className={styles.errorContainer}>
          <div className={styles.errorMessage}>{error}</div>
          <button onClick={requestOrders}>Retry</button>
        </div>}
        <div>
          <p className={styles.summary}>
            <strong>Total revenue: </strong> 
            <span id="totalRevenue">${totalRevenue}</span>
            </p>       
        </div>
        <h2>Seller Rankings</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Position</th>
              <th>Seller Name</th>
              <th>Seller Revenue</th>
            </tr>
          </thead>
          <tbody>
          {sellers.map((seller, index) => {
            return <SellerRanking key={index} position={index +1} {...seller} />
          })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Dashboard;
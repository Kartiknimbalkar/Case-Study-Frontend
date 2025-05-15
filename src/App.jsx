import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Component/Home'
import About from './Component/About'
import Page404 from './Component/Page404'
import LogOut from './Component/LogOut'
// import PlaceOrder from './Component/PlaceOrder'
import PlaceOrder from './Component/Api-gateway-components/Order-Service/OrderAndPay'
// import OrderList from './Component/OrderList'
import ListOrders from './Component/Api-gateway-components/Order-Service/ListOrders'
// import SalesReport from './Component/SalesReport'
import SalesList from './Component/Api-gateway-components/Sales-Service/SalesList';
// import Drugs from './Component/Api-gateway-components/Drug-Service/Drugs';
import Drugs from './Component/Api-gateway-components/Drug-Service/Drugs'
import Login from './Component/Api-gateway-components/Login'
import OrderAndPay from './Component/Api-gateway-components/Order-Service/OrderAndPay'
import Success from './Component/Success';
import DrugsById from './Component/Api-gateway-components/Drug-Service/DrugsById'
import DeleteDrug from './Component/Api-gateway-components/Drug-Service/DeleteDrug'
import AddDrug from './Component/Api-gateway-components/Drug-Service/AddDrug'
import DrugsBar from './Component/Api-gateway-components/NavBars/DrugsBar'
import SupplierBar from './Component/Api-gateway-components/NavBars/SupplierBar'
import RestockHistory from './Component/Api-gateway-components/Supplier-Service/RestockHistory'
import DeleteSupplier from './Component/Api-gateway-components/Supplier-Service/DeleteSupplier'
import UpdateSupplier from './Component/Api-gateway-components/Supplier-Service/UpdateSupplier'
import SuppliersList from './Component/Api-gateway-components/Supplier-Service/SuppliersList'
import AddSupplier from './Component/Api-gateway-components/Supplier-Service/AddSupplier'
import SignUp from './Component/Api-gateway-components/SignUp'
import RestockDrugs from './Component/Api-gateway-components/Supplier-Service/RestockDrugs'
import OrderBar from './Component/Api-gateway-components/NavBars/OrderBar'
import VerifyOrder from './Component/Api-gateway-components/Order-Service/VerifyOrder'
import PickupOrder from './Component/Api-gateway-components/Order-Service/PickupOrder'
import PickedupOrders from './Component/Api-gateway-components/Order-Service/PickedupOrders'
import OrderById from './Component/Api-gateway-components/Order-Service/OrderById'
import AdminDashboard from './Component/Api-gateway-components/AdminDashboard'
import DoctorDashboard from './Component/Api-gateway-components/DoctorDashboard'
import SalesBar from './Component/Api-gateway-components/NavBars/SalesBar'
import Failure from './Component/Api-gateway-components/Failure'
import SaleHistory from './Component/Api-gateway-components/Sales-Service/SaleHistory'
import SaleReport from './Component/Api-gateway-components/Sales-Service/SaleReport'
import UpdateDrug from './Component/Api-gateway-components/Drug-Service/UpdateDrug'
import DrugListDC from './Component/Api-gateway-components/Drug-Service/DrugListDC'
import OrderListDC from './Component/Api-gateway-components/Order-Service/OrderListDC'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='logout' element={<LogOut />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
        <Route path='login' element={<Login />} />
        <Route path='about' element={<About />} />
        <Route path='success' element={<Success />} />
        <Route path='payment-failed' element={<Failure />} />
        <Route path='admin-dashboard' element={<AdminDashboard />} />

        <Route path='doctor-dashboard' element={<DoctorDashboard />}>
          <Route index element={<div>
                  <h1>Doctor Dashboard</h1>
                  <h2 style={{textAlign: 'center'}}>Welcome to Pharmacy Management System</h2>
                  </div>} />
          <Route path='drug-list-dc' element={<DrugListDC />} />
          <Route path='order-list-dc' element={<OrderListDC />} />
          <Route path='orderpay' element={<OrderAndPay />} />
          <Route path='drug-id' element={<DrugsById />} />
        </Route>

        <Route path='drug-inventory' element={<DrugsBar />}>
          <Route index element={<h1>Welcome to Drug Inventory</h1> } />
          <Route path='drugs' element={<Drugs />} />
          <Route path='drug-id' element={<DrugsById />} />
          <Route path='drug-delete' element={<DeleteDrug />} />
          <Route path='drug-add' element={<AddDrug />} />
          <Route path='drugs/drug-update' element={<UpdateDrug />} />
        </Route>

        <Route path='supplier-inventory' element={<SupplierBar />}>
          <Route index element={<SuppliersList />} />
          <Route path='suppliers' element={<SuppliersList />} />
          <Route path='add-supplier' element={<AddSupplier />} />
          <Route path='restock-drugs' element={<RestockDrugs />} />
          <Route path='update-suppliers' element={<UpdateSupplier />} />
          <Route path='delete-supplier' element={<DeleteSupplier />} />
          <Route path='history-supplier' element={<RestockHistory />} />
        </Route>

        <Route path='order-inventory' element={<OrderBar />}>
          <Route index element={<ListOrders />} />
          <Route path='orders' element={<ListOrders />} />
          <Route path='add-order' element={<PlaceOrder />} />
          <Route path='verify-order' element={<VerifyOrder />} />
          <Route path='pickup-order' element={<PickupOrder />} />
          <Route path='pickedup-orders' element={<PickedupOrders />} />
          <Route path='order-by-id' element={<OrderById />} />
        </Route>

        <Route path='sales-report' element={<SalesBar />}>
          <Route index element={<SalesList />} />
          <Route path='sales' element={<SalesList />} />
          <Route path='sales-history' element={<SaleHistory />} />
          <Route path='download-report' element={<SaleReport />} />
        </Route>

        <Route path='*' element={<Page404 />}></Route>
      </Routes>
    </>
  )
}

export default App

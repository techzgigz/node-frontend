import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import LeftNav from './components/leftNav';
import Home from './components/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SellProperty from './components/sellProperty';
import Preview from './components/preview';
import StripeContainer from './components/stripePayment/StripeContainer';

function App() {
  console.log(window)
  return (
    <BrowserRouter>
      <Header /> 
      {/* <div className='content'> */}
      <div className="row sm-gutters content" style={{ width: '100%', margin: '0' }}>
          <div className="col-sm-3 col-md-3" style={{ textAlign: 'center', padding: '0' }}>
            <LeftNav />
          </div>
        <div className="col-sm-9 col-md-9" style={{ padding: '24px 64px' }}>
          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/sellproperty' element={< SellProperty />}></Route>
            <Route exact path='/preview' element={<Preview />}></Route>
            <Route exact path="/payment" element={<StripeContainer />}></Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

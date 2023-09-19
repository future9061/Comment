import axios from 'axios';
import './App.css';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getList } from './store/store';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get("/api/read")
      .then((res) => {
        res.data.success && dispatch(getList(res.data.ItemList))
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="App">
      <Header />
      <Banner />
      <Main />
      <Footer />
    </div >
  );
}

export default App;

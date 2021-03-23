import './App.css';
import Logo from './logo.svg';
import DraggableList from './components/DraggableList/DraggableList'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
require('dotenv').config();
function App() {
  return (
    <div className="App">
      <Header title="TODO-APP" logo={Logo}/>
      <DraggableList />
      <Footer credit="© Shijin Raj" desc="Drag and Sort TO-DO-APP"/>
    </div>
  );
}

export default App;

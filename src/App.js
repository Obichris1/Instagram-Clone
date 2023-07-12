import Nav from './Components/NavBar/Nav';
import Bio from './Components/Bio';
import Gallery from './Components/Gallery';
import './App.css';

function App() {
  return (
    <div>
       <Nav />
       
       <div className="container">
          <Bio />
          <Gallery />
      </div>
    </div>
  );
}

export default App;

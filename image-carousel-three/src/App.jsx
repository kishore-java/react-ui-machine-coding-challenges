 
import './App.css'
import ImageCarousel from './components/ImageCarousel';
import { images } from './images';

 function App() {

     return <div className='wrapper'>
      <ImageCarousel data={images}/>
     </div>
 }


 export default App;
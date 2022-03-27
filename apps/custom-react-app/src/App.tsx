import { Button } from 'ui';
import image from './assets/images/react-js.png';
import { MyButton } from 'mylib';

const App = () => {
  return (
    <div className="grid">
      <h1>App</h1>
      <Button />
      <MyButton />
      <img src={image} alt="react" width={200} height={200} />
    </div>
  );
};

export default App;

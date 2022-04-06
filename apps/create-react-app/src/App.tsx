import { MyButton } from 'mylib';
import { MyComponent } from 'tsup';

function App() {
  return (
    <div className="grid justify-start">
      <h1 className="text-3xl font-bold underline">
        Hello world! My love website...
      </h1>
      <MyButton />
      <MyComponent />
    </div>
  );
}

export default App;

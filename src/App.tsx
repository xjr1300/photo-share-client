import { FC } from 'react';

const title = import.meta.env.VITE_APP_TITLE;

const App: FC = () => {
  return (
    <div className="App">
      <h1>{title}</h1>
    </div>
  );
};

export default App;

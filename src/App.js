import logo from './logo.svg';
import './App.css';
import SpyWordGame from './component/SpyWordGame';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <Analytics />
      <SpyWordGame />

    </>
  );
}

export default App;


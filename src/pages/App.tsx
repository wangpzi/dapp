import { useState } from 'react'

const App = () => {
  const [data, setData] = useState({ info: '进经静' });
  console.log("1111")
  return (
    <>
      <h1 className="text-8xl text-[#09F]" onClick={() => setData({ info: '进经静' })}>Hello world! {data.info}</h1>
    </>
  );
};

App.whyDidYouRender = true;
export default App;

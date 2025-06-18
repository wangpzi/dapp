// import { useState } from 'react'
// import { useImmer } from '@hooks/useImmer'

// const App = () => {
//   const [data, setData] = useImmer({ info: '哈哈哈哈' });
//   console.log("1111")
//   return (
//     <>
//       <h1 className="text-8xl text-[#09F]" 
//       onClick={
//         () => setData(draft => {
//           draft.info = '哈哈哈哈';
//           console.log('2222')
//         })
//       }>Hello world! {data.info}</h1>
//     </>
//   );
// };

// App.whyDidYouRender = true;
// export default App;


import { useRoutes } from 'react-router-dom';
import routes from '@/routes/index';

const App = () => {
  const routing = useRoutes(routes);
  return <>{routing}</>;
};
export default App;
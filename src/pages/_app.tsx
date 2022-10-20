import Home from './index';
import './styles.css';

// worker.start({
//   serviceWorker: {
//     url: '/infinite-scroll/mockServiceWorker.js',
//   },
// });

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}

const App = (): JSX.Element => {
  return <Home />;
};

export default App;

import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { LocationSharing } from './components/LocationSharing';
import { useEffect } from 'react';
import { connectWithSockerIOServer } from './utils/wss';
import { CreateConnection } from './components/createConnection/CreateConnection';
import { JoinConnection } from './components/joinConnectioin/JoinConnection';
import { Room } from './components/connectionRoom/Room';
import { JoiningRoom } from './components/connectionRoom/JoiningRoom';
import { OlaMap } from './components/ola-map/OlaMap';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store/store';
import { Home } from './components/Home';
const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/location' element={<LocationSharing />} />
    <Route path='/createConnection' element={<CreateConnection />} />
    <Route path='/joinConnection' element={< JoinConnection />} />
    <Route path='/room' element={< Room />} />
    <Route path='/joinedRoom' element={<JoiningRoom />} />
    <Route path='/map' element={<OlaMap />} />
    <Route path='/' element={<Home />} />
  </Route>
))

function App() {
  useEffect(() => {
    connectWithSockerIOServer();
  })
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;

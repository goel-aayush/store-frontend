
import './App.css';
import Login from './modules/auth/Login';
import Footer from './modules/core/components/Footer';
import Header from './modules/core/components/Header';
import Sidebar from './modules/core/components/Sidebar';
function App() {
  return (
    // <div className="flex flex-col min-h-screen">
    //   <Header />
    //   <div className="flex flex-1">
    //     <Sidebar />
    //     <main className="flex-grow">
    //       {/* Your content goes here */}
    //     </main>
    //   </div>
    //   <Footer  />
    // </div>
    <div>
      <Login/>
    </div>

  );
}

export default App;

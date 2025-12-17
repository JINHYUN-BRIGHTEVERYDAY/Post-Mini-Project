import Loading from "./components/common/Loading";
import MainLayout from "./components/common/MainLayout";
import Home from "./pages/home/Home";
import AuthRoute from "./routes/AuthRoute";

function App() {
    return <MainLayout>
        <AuthRoute />
        {/* <Loading /> */}
        {/* <Home /> */}
    </MainLayout>
}

export default App;
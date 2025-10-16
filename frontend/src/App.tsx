import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import Layout from "./Common/Layout";
import AddEvent from "./Pages/Events/AddEvent";
import theme from "./Theme";
import AttendeList from "./Pages/Events/AttendeList";
import { Provider } from "react-redux";
import { store } from "./app/store";
import EventLists from "./Pages/Events/EventLists";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<EventLists />} />
            <Route path="/Add-Events" element={<AddEvent />} />
            <Route path="/Attendee-List/:id" element={<AttendeList />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

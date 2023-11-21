import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import NotesPage from "./pages/NotesPage";
import Note from "./pages/Note";
import "./App.css";
import { useState } from "react";

function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	function handleColorModeToggle() {
		setIsDarkMode((prevMode) => !prevMode);
	}

	return (
		<Router>
			<div className={`container ${isDarkMode ? "dark" : ""}`}>
				<div className="app">
					<Header onColorModeToggle={handleColorModeToggle} />
					<Routes>
						<Route path="/" element={<NotesPage />} />
						<Route path="/note/:id" element={<Note />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;

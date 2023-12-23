import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import NotesPage from "./pages/NotesPage";
import Note from "./pages/Note";
import "./App.css";
import { useState } from "react";

function App() {
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [notesList, setNotesList] = useState(null);

	function handleColorModeToggle() {
		setIsDarkMode((prevMode) => !prevMode);
	}

	return (
		<Router>
			<div className={`container ${isDarkMode ? "dark" : "light"}`}>
				<div className="app">
					<Header
						onColorModeToggle={handleColorModeToggle}
						isDarkMode={isDarkMode}
					/>
					<Routes>
						<Route path="/" element={<NotesPage notesList={notesList}/>} />
						<Route path="/note/:id" element={<Note setNotesList={setNotesList} />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;

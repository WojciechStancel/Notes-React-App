import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import "./NotesPage.css";

const NotesPage = () => {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		getNotes();
	}, []);

	const getNotes = async () => {
		const response = await fetch("http://localhost:5000/notes");
		const data = await response.json();

		setNotes(data);
	};

	return (
		<div className="notes">
			<div className="notes-header">
				<h2 className="notes-title">&#9998; Notes</h2>
				<p className="notes-count">{notes.length}</p>
			</div>

			<div className="notes-list">
				{notes.map((note) => (
					<ListItem note={note} key={note.id} />
				))}
			</div>
		</div>
	);
};
export default NotesPage;

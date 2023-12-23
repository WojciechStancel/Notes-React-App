import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import "./NotesPage.css";
import AddButton from "../components/AddButton";

const { REACT_APP_DB_URL } = process.env;

const NotesPage = ({notesList}) => {
	const [notes, setNotes] = useState(null);

	useEffect(() => {
		getNotes();
	}, [notesList]);

	const getNotes = async () => {
		try {
			const response = await fetch(`${REACT_APP_DB_URL}/notes.json`);
			const data = await response.json();
			if (data && typeof data === "object") {
				const listFromResponse = Object.entries(data).map(([id, body]) => ({
					id,
					...body,
				}));
				setNotes(listFromResponse);
			} else {
				setNotes(null);
			}
		} catch (error) {
			console.error("Error fetching notes:", error);
		}
	};

	return (
		<div className="notes">
			<div className="notes-header">
				<h2 className="notes-title">&#9998; Notes</h2>
				<p className="notes-count">{notes ? notes.length : "No Notes"}</p>
			</div>

			<div className="notes-list">
				{notes && notes.map((note) => <ListItem note={note} key={note.id} />)}
			</div>
			<AddButton />
		</div>
	);
};
export default NotesPage;

import notes from "../assets/data";
import ListItem from "../components/ListItem";
import "./NotesPage.css";

const NotesPage = () => {
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

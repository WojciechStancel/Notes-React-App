import { Link, useParams, Navigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { useEffect, useState } from "react";

const { REACT_APP_DB_URL } = process.env;

const Note = ({ setNotesList }) => {
	const { id } = useParams();
	const [note, setNote] = useState(null);
	const [isRedirecting, setRedirecting] = useState(false);

	useEffect(() => {
		const getNote = async () => {
			if (id === "new") return;
			const res = await fetch(`${REACT_APP_DB_URL}/notes/${id}.json`);
			const data = await res.json();
			setNote(data);
		};
		getNote();
	}, [id]);

	useEffect(() => {
		document.querySelector("textarea").focus();
	}, []);

	const createNote = async () => {
		try {
			await fetch(`${REACT_APP_DB_URL}/notes.json`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					...note,
					updated: new Date(),
				}),
			});
			setRedirecting(true);
		} catch (error) {
			console.log(error);
		}
	};

	const updateNote = async () => {
		try {
			await fetch(`${REACT_APP_DB_URL}/notes/${id}.json`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...note, updated: new Date() }),
			});
			setNotesList((prevNote) => ({ ...prevNote, updated: new Date() }));
		} catch (error) {
			console.log(error);
		}
	};

	const deleteNote = async () => {
		try {
			await fetch(`${REACT_APP_DB_URL}/notes/${id}.json`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json",
				},
			});
		} catch (error) {
			console.log(error);
		}

		setRedirecting(true);
	};

	const handleSubmit = () => {
		if (id !== "new" && !note.body) {
			deleteNote();
		} else if (id !== "new") {
			updateNote();
		} else if (id === "new" && note !== null) {
			createNote();
		}
	};

	if (isRedirecting) {
		return <Navigate to={"/"} />;
	}

	return (
		<div className="note">
			<div className="note-header">
				<h3>
					<Link to={"/"}>
						{id !== "new" ? (
							<button onClick={handleSubmit}>Save changes</button>
						) : (
							<ArrowLeft />
						)}
					</Link>
				</h3>
				{id !== "new" ? (
					<button onClick={deleteNote}>Delete</button>
				) : (
					<button onClick={handleSubmit}>Add</button>
				)}
			</div>

			<textarea
				onChange={(e) => setNote({ ...note, body: e.target.value })}
				value={note?.body}></textarea>
		</div>
	);
};
export default Note;

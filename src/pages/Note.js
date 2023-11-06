import { Link, useParams, Navigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { useEffect, useState } from "react";

const Note = () => {
	const { id } = useParams();
	const [note, setNote] = useState(null);
	const [isRedirecting, setRedirecting] = useState(false);

	useEffect(() => {
		const getNote = async () => {
			if (id === "new") return;
			const res = await fetch(`http://localhost:5000/notes/${id}`);
			const data = await res.json();
			setNote(data);
		};
		getNote();
	}, [id]);

	const createNote = async () => {
		await fetch(`http://localhost:5000/notes/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...note, updated: new Date() }),
		});
		setRedirecting(true);
	};

	const updateNote = async () => {
		await fetch(`http://localhost:5000/notes/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...note, updated: new Date() }),
		});
	};

	const deleteNote = async () => {
		await fetch(`http://localhost:5000/notes/${id}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		});
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
						<ArrowLeft onClick={handleSubmit} />
					</Link>
				</h3>
				{id !== "new" ? (
					<button onClick={deleteNote}>Delete</button>
				) : (
					<button onClick={handleSubmit}>Done</button>
				)}
			</div>

			<textarea
				onChange={(e) => {
					setNote({ ...note, body: e.target.value });
				}}
				value={note?.body}></textarea>
		</div>
	);
};
export default Note;

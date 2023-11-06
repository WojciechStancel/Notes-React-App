import { Link, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { useEffect, useState } from "react";

const Note = () => {
	const { id } = useParams();
	const [note, setNote] = useState(null);

	useEffect(() => {
		getNote();
	}, [parseInt(id)]);

	const getNote = async () => {
		const res = await fetch(`http://localhost:5000/notes/${id}`);
		const data = await res.json();
		setNote(data);
	};

	return (
		<div className="note">
			<div className="note-header">
				<h3>
					<Link to={"/"}>
						<ArrowLeft />
					</Link>
				</h3>
			</div>

			<textarea value={note?.body}></textarea>
		</div>
	);
};
export default Note;

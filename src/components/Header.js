import colorModeImg from '../assets/brightness-half.svg'
const Header = ({onColorModeToggle}) => {
	return (
		<div className="app-header">
			<h1>Your Notes</h1>
			<button onClick={onColorModeToggle}><img src={colorModeImg} alt="change color mode icon" /></button>
		</div>
	);
};
export default Header;

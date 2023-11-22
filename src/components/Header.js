import colorModeImg from '../assets/brightness-black.svg'
import colorModeImgWhite from '../assets/brightness-white.svg'
const Header = ({onColorModeToggle, isDarkMode}) => {
	return (
		<div className="app-header">
			<h1>Your Notes</h1>
			<button onClick={onColorModeToggle}><img src={isDarkMode? colorModeImgWhite :colorModeImg} alt="change color mode icon" /></button>
		</div>
	);
};
export default Header;

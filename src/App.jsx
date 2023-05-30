import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import CustomModal from './components/Main/CustomModal';

function App() {
	return (
		<>
			<NavBar></NavBar>
			<CustomModal open={true}>Modal example</CustomModal>
		</>
	);
}

export default App;

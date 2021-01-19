import { Checkbox, TextInputMain } from './components/Inputs';
import Todolist from './pages/Todolist';

const { Button, AddButton, RoundButton } = require('./components/Buttons');

function App() {
	return (
		<div className='App'>
			<Todolist />
		</div>
	);
}

export default App;

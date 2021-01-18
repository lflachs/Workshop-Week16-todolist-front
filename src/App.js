import { Checkbox, TextInputMain } from './components/Inputs';

const { Button, AddButton, RoundButton } = require('./components/Buttons');

function App() {
	return (
		<div className='App'>
			<h1>Buttons</h1>
			<Button>Hello World!</Button>
			<RoundButton />
			<AddButton />
			<br />
			<span>----</span>
			<Checkbox />
			<TextInputMain />
		</div>
	);
}

export default App;

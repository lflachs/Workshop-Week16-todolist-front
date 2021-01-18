import { Checkbox, TextInputMain } from './components/Inputs';

const { Button, AddButton, RoundButton } = require('./components/Buttons');

function App() {
	return (
		<div className='App'>
			<h1>Buttons</h1>
			<div>
				<Button>Hello World!</Button>
				<RoundButton />
				<AddButton />
			</div>
			<div>
				<span>----</span>
				<Checkbox />
				<TextInputMain />
			</div>
		</div>
	);
}

export default App;

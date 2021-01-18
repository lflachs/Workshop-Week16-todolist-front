import { Checkbox, TextInputMain } from './components/input';

const { Button, AddButton, RoundButton } = require('./components/button');

function App() {
	return (
		<div className='App'>
			<h1>Buttons</h1>
			<Button>Hello World!</Button>
			<RoundButton />
			<AddButton />
			<span>----</span>
			<Checkbox />
			<TextInputMain />
		</div>
	);
}

export default App;

import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { TextInputMain, Item, TextInput, Checkbox } from '../components/Inputs';
import { TrashIcon } from '../components/Icons';
import useTodo from '../hooks/useTodo';
import { useParams } from 'react-router-dom';
import useCrud from '../hooks/useCrud';
import useInput from '../hooks/useInput';
import Modal from '../components/Modal';
import SettingModal from '../components/SettingModal';
export default function TodolistDetails() {
	const [openModal, setOpenModal] = useState(null);
	const { todolistId } = useParams();
	const [todolist, createTodo, updateTodo] = useCrud(
		`/api/todolist/${todolistId}`
	);
	const [title, setTitle] = useInput(todolist.title);

	const [tasks, addTask, updateTask, deleteTask, error] = useCrud(
		`/api/todolist/${todolistId}/tasks`
	);
	return (
		<>
			<TextInput
				type='text'
				style={{ fontSize: '30px', textAlign: 'center', color: 'black' }}
				value={title}
				onChange={setTitle}
				onBlur={() => {
					console.log('test');
					updateTodo('', { title });
				}}
			/>
			{error && <h1>{error}</h1>}

			{tasks.map((task) => {
				console.log(task);
				return (
					<>
						<Item key={task.id}>
							<TextInputMain
								style={{ border: 'none', boxShadow: 'none' }}
								initialValue={task.title}
								editable={false}
								onClick={() => setOpenModal(task.id)}
							></TextInputMain>
							<Checkbox
								checked={task.done}
								onClick={() => updateTask(task.id, { done: !task.done })}
							></Checkbox>
							<TrashIcon
								onClick={() => {
									deleteTask(task.id);
								}}
							/>
						</Item>

						<SettingModal
							data={{
								title: task.title,
								description: task.description,
								picture: task.picture,
							}}
							showModal={openModal === task.id}
							onSubmit={(data) => updateTask(task.id, data)}
							onClose={() => setOpenModal(null)}
						/>
					</>
				);
			})}
			<Footer onClick={() => addTask({ title: 'Hello' })} />
		</>
	);
}

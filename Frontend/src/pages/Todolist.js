import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { TextInputMain, Item } from '../components/Inputs';
import { TrashIcon } from '../components/Icons';
import useTodo from '../hooks/useTodo';
import useCrud from '../hooks/useCrud';
import { Link } from 'react-router-dom';

export default function Todolist() {
	const [todolists, addTodo, updateTodo, deleteTodo, error] = useCrud(
		'/api/todolist'
	);
	// const { error, onAdd, onDelete, onUpdate, todolists } = useTodo();
	return (
		<>
			<h1>Welcome to your todolist</h1>
			{error && <h1>{error}</h1>}
			{todolists.map((todolist) => {
				return (
					<Item key={todolist.id}>
						<Link to={`/todolist/${todolist.id}`}>
							<TextInputMain
								style={{ border: 'none', boxShadow: 'none' }}
								initialValue={todolist.title}
								editable={false}
								onClick={() => console.log('WIP')}
							></TextInputMain>
						</Link>
						<TrashIcon
							onClick={() => {
								deleteTodo(todolist.id);
							}}
						/>
					</Item>
				);
			})}
			<Footer onClick={() => addTodo({ title: 'hello, world' })} />
		</>
	);
}

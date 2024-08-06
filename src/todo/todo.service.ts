import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

let todos = [
  {
    id: 1,
    title: 'Sample Todo',
    description: 'This is a sample todo',
  },
  {
    id: 2,
    title: 'Sample Todo 2',
    description: 'This is a sample todo 2',
  },
  {
    id: 3,
    title: 'Sample Todo 3',
    description: 'This is a sample todo 3',
  }
]

@Injectable()
export class TodoService {
  create(createTodoDto: CreateTodoDto) {
    let id = todos[todos.length - 1].id + 1;
    if (!createTodoDto.title || !createTodoDto.description) {
      return {message: "Title and description are required"}
    }
    todos.push({
      id,
      ...createTodoDto
    });
    return {message: "Sucess", todos};
  }

  findAll() {
    return {message: "Success", todos};
  }

  findOne(id: number) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return {message: "Todo not found"}
    return {message: "Success", todo};
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    let todo = todos.find(t => t.id === id);
    if (!todo) return {message: "Todo not found"}
    todo.title = updateTodoDto.title ? updateTodoDto.title : todo.title;
    todo.description = updateTodoDto.description;

    return {message: "Success", todos}
  }

  remove(id: number) {
    todos = todos.filter(t => t.id != id);
    return {message: "Success", todos};
  }
}

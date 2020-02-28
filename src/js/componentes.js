import { Todo } from "../classes";
import { todoList } from '../index';

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const inputNewTodo = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ todo.completado ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

};

// Eventos
inputNewTodo.addEventListener('keyup', (e) => {

    if( e.keyCode === 13 && inputNewTodo.value.length > 0) {
        const nuevoTodo = new Todo(inputNewTodo.value);
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml(nuevoTodo);
        inputNewTodo.value='';
    }

});

divTodoList.addEventListener('click', (e) =>{

    const nombreElemento = e.target.localName;
    const todoElemento   = e.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');

    console.log(nombreElemento);
    if( nombreElemento.includes('input') ) {
        todoList.toggleTodo( todoId );
        todoElemento.classList.toggle('completed');
    } else if ( nombreElemento.includes('button') ) {
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild(todoElemento);
    }

});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length -1 ; i >= 0; i--) {
        
        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ) {
            divTodoList.removeChild(elemento);
        }
        
    }

});

ulFiltros.addEventListener( 'click', (e) => {

    const filtro = e.target.text;
    if(!filtro) { return; }

    for( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');
        const completada = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if( completada ) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if( !completada ) {
                    elemento.classList.add('hidden');
                }
                break;        
            default:
                break;
        }

    }

});
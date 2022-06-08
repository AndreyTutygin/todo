const todo = {
    action(e) {
        const target = e.target;
        const input = document.querySelector('.todo-add__input');

        if (target.classList.contains('todo__action')) {
            const action = target.dataset.todoAction;
            const elemItem = target.closest('.todo__item');

            if (elemItem.dataset.todoState === 'active') {
                elemItem.classList.add('is-order');
            } else if (elemItem.dataset.todoState === 'deleted' || elemItem.dataset.todoState === 'completed') {
                elemItem.classList.remove('is-order');
            }

            if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
                elemItem.remove();
            } else {
                elemItem.dataset.todoState = action;
            }

            this.save();

        } else if (target.classList.contains('todo-add__btn')) {
            this.add();
            this.save();
        }

        input.addEventListener('keydown', (e) => {
            if (e.code == 'Enter') {
                this.add();
                this.save();
            }
        });
    },
    add() {
        const elemText = document.querySelector('.todo-add__input');

        if (elemText.disabled || !elemText.value.length) {
            return;
        }

        document.querySelector('.todo__list').insertAdjacentHTML('beforeend', create(elemText.value));
        elemText.value = '';
    },
    init() {
        async function getAllTodos() {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
            const todos = await res.json();

            todos.forEach(todo => {
                document.querySelector('.todo__list').insertAdjacentHTML('beforeend', create(todo.title));
            });
        }

        getAllTodos();

        const fromStorage = localStorage.getItem('todo');

        if (fromStorage) {
            document.querySelector('.todo__list').innerHTML = fromStorage;
        }

        document.querySelector('.todo-options').addEventListener('change', this.update);
        document.addEventListener('click', this.action.bind(this));
    },
    update() {
        const option = document.querySelector('.todo-options').value;
        document.querySelector('.todo__list').dataset.todoOption = option;
        document.querySelector('.todo-add__input').disabled = option !== 'active';
    },
    save() {
        localStorage.setItem('todo', document.querySelector('.todo__list').innerHTML);
    }
};

function create(text) {
    return `<li class="todo__item" data-todo-state="active">
    <button class="btn-reset todo__action todo__action_restore" data-todo-action="active" aria-label="Восстоновить задачу"></button>
    <button class="btn-reset todo__action todo__action_complete" data-todo-action="completed" aria-label="Завершить задачу"></button>
    <span class="todo__txt">${text}</span>
    <button class="btn-reset todo__action todo__action_delete" data-todo-action="deleted" aria-label="Удалить задачу"></button></li>`;
}

todo.init();

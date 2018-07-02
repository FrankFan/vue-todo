<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus
      placeholder="What to do next?"
      @keyup.enter="addTodo"
    />
    <Item v-if="todos.length"
      :todo="todo"
      v-for="todo in filterTodos"
      :key="todo.id"
      @del="deleteTodo"
    />
    <p class="empty" v-else>Nothing left in the List.</p>
    <Tabs
      :todos="todos"
      :filter="filter"
      @toggle="todoFilter"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>

<script>
import Item from './item.vue';
import Tabs from './tabs.vue';

let id = 0;

export default {
  data() {
    return {
      todos: [],
      filter: 'all',
    }
  },
  components: {
    Item,
    Tabs,
  },
  computed: {
    filterTodos() {
      if (this.filter === 'all') {
        return this.todos;
      }
      const done = this.filter === 'completed';
      return this.todos.filter(todo => todo.done === done);
    }
  },
  methods: {
    addTodo(e) {
      const inputValue = e.target.value.trim();
      if (inputValue) {
        this.todos.unshift({
          id: id++,
          content: inputValue,
          done: false,
        });
        e.target.value = '';
      }
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.filter(todo => todo.id === id), 1);
    },
    todoFilter(state) {
      this.filter = state;
    },
    clearAllCompleted() {
      this.todos = this.todos.filter(todo => !todo.done);
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>
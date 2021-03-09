Vue.component('kanban-card', {
    template: `<div id="todo" class="drop rounded bg-indigo-400 mx-2 mt-4">
            <h4 class="font-bold text-center">To Do</h4>
            <div class="snapcontainer bg-indigo-100 h-6 w-5/6 h-16 rounded my-5 mx-auto"></div>
            <div class="snapcontainer bg-indigo-100 h-6 w-5/6 h-16 rounded my-5 mx-auto"></div>
            <div class="snapcontainer bg-indigo-100 h-6 w-5/6 h-16 rounded my-5 mx-auto"></div>
            <div class="snapcontainer bg-indigo-100 h-6 w-5/6 h-16 rounded my-5 mx-auto"></div>
            <div class="snapcontainer bg-indigo-100 h-6 w-5/6 h-16 rounded my-5 mx-auto"></div>
        </div>`
});

let cardcontainer = new Vue({
    el: '#cardcontainer'
});
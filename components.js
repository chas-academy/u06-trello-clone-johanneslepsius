Vue.component('kanban-card', {
    props: ['title'],
    template: `<div class="drop rounded bg-gray-200 mx-2 mt-4 p-2 w-11/12 md:w-1/6 2xl:w-1/12 min-h-20 overflow-auto">
            <h4 class="font-bold">{{title}}</h4>
            <ul class="sortable h-4/5"></ul>
            </div>`
});

let board = new Vue({
    el: '#board'
});
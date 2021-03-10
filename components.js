Vue.component('kanban-card', {
    props: ['title'],
    template: `<div class="drop flex-shrink-0 rounded bg-gray-200 mx-2 mt-4 p-2 w-11/12 sm:w-1/4 md:w-1/5 overflow-auto"">
                <h4 class="font-bold">{{title}}</h4>
                    <ul class="sortable h-2/3"></ul>
            </div>`
});

let board = new Vue({
    el: '#board'
});
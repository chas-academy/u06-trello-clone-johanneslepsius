Vue.component('kanban-card', {
    props: ['title'],
    template: `<div class="drop rounded bg-gray-200 mx-2 mt-4 p-2 w-11/12 max-h-full overflow-auto" style="min-height: 35px;">
                <h4 class="font-bold">{{title}}</h4>
                    <ul class="sortable h-4/6"></ul>
            </div>`
});

let board = new Vue({
    el: '#board'
});
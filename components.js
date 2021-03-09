Vue.component('kanban-card', {
    props: ['title'],
    template: `<div class="drop rounded bg-gray-200 mx-2 mt-4 w-5/12 sm:w-1/5 md:w-1/6 2xl:w-1/12 overflow-x-auto">
            <h4 class="font-bold text-center">{{title}}</h4>
            </div>`
});

let board = new Vue({
    el: '#board'
    // data: {
    //     cards: [
    //         {id: 'todo', title: 'To Do'},
    //         {id: 'doing', title: 'Doing'},
    //         {id: 'review', title: 'Review'},
    //         {id: 'Done', title: 'Done'},
    //     ]
    // }
});
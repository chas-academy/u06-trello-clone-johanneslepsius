// first of all, this code isn't exactly following DRY, since i had 
// to do the same things with both loaded and dynamically created elements

$(() => {
  // localStorage.clear();
  // choosing if you want to have a review board 
  $( "#review" ).hide();
  $("#showReview").click( () => {
    $("#review").toggle("show", "linear")
  });

  // a unique id-creator
  if(!localStorage.getItem("counter")){
    localStorage.setItem("counter", 1)
  };

  // reading locally stored todos
  if (Object.keys(localStorage)){
    let index = Object.keys(localStorage);
    index = index.length;
    do {
      const todo = localStorage.getItem(`todo${index}`);
      const deadline = localStorage.getItem(`date${index}`);
      $("#todo .sortable").append(todo);
      $(`todo${index} .deadline`).val(deadline);
    } while ( index-- );
  };
  

  $(".delete").on("click", function() {
          $(".dialog").dialog("close");
          const todo = $(this).data('id')
          localStorage.removeItem(todo);
          $(`#${todo}`).remove();
        });

  // this widget´s only purpose is to annoy the user. 
  // when active, it puts the todo in random places instead of following the cursor. 
  // Why, you ask? For the glory of learning of course!

  $.widget("wowmuchcustom.annoy",{
    options: {
        value: Math.floor(Math.random() * 500),
        value2: Math.floor(Math.random() * 500)
    },
    _create: function() {
        this.element.addClass( "annoying" );
        this._on(".sortable", {
          sort: "_refresh"
        });
        },
    _refresh: function(){
      this.random();
      this.element.css({
        top: this.options.value,
        left: this.options.value2
      });
    },
    random: function(){
      let position = {
      value: Math.floor(Math.random() * 500),
      value2: Math.floor(Math.random() * 500)
      }
      this.option(position)
    }
  });

  // activating/deactivating the annoying widget

  const annoyme = document.querySelector("#annoyme");

  $("#annoyme").on("click", () => {
    if(annoyme.checked){
      $(".todo").annoy();
    } else if (!annoyme.checked){
      $(".todo").annoy("destroy");
    };
  });
  
  // opening the todo dialog, but not after the user just moves it to a new place
  $( ".dialog" ).dialog({
    autoOpen: false
  });

  let dragged = false;
  $( ".todo" ).on("click", function(){
    $(".todo").on("drag", () => {
      dragged = true; 
    });
    
    if(!dragged){
      $(".dialog").dialog("close");
      let dialog = $(this).data('id');
      $( dialog ).dialog( "open" );
    }
    dragged = false;
  });

  $(".newtodo").on("click", function(){
    $(".dialog").dialog("close");
    $("form").dialog("open");
    $("form .deadline").datepicker({
    minDate: 0,
    dateFormat: "yy-mm-dd"
    });
  });

  $(".sortable").sortable({
    connectWith: ".sortable",
    receive: function(){
      $(this).closest(".drop").effect("bounce", "slow");
    }
  });

  

  $(".tabs").tabs();

  $(".deadline").datepicker({
    minDate: 0,
    dateFormat: "yy-mm-dd"
    });

  savelocally = function(todo, num, deadline){
    console.log(num);
    localStorage.setItem("date"+num, deadline)
    localStorage.setItem("todo"+num, todo);
    num++;
    localStorage.setItem("counter", num);
  };


  $("form").submit( function(event) {
      event.preventDefault();
      $(".dialog").dialog("close");
      // keeping track of how many todos exist to keep the todo-tabs and dialogs related
      // let todos = $(".todo");
      // todos = todos.length;
      let num = localStorage.getItem("counter");
      const info1 = $("input[name=info1]").val();
      const title = info1.substring(0, 15);
      const info2 = $("input[name=info2]").val();
      const info3 = $("input[name=info3]").val();
      const deadline = $("input[name=deadline]").val();
      const predeadline = deadline.substring(5);
      let appendtodo = `
          <li id="todo${num}" class="todo shadow rounded bg-white hover:bg-gray-100 my-2 p-2" data-id="#dialog${num}">
          <p>${title + "..."}</p>
          <div class="flex my-2">
          <img src="img/clock.svg" class="w-4 mr-2">
            <p>${predeadline}</p>
          </div>
              <div class="dialog rounded bg-white p-2" id="dialog${num}">
                  <div class="tabs" id="tabs${num}">
                      <ul>
                          <li><a href="#fragment-1.${num}">Info 1</a></li>
                          <li><a href="#fragment-2.${num}">Info 2</a></li>
                          <li><a href="#fragment-3.${num}">Info 3</a></li>
                      </ul>
                      <div id="fragment-1.${num}">${info1}</div>
                      <div id="fragment-2.${num}">${info2}</div>
                      <div id="fragment-3.${num}">${info3}</div>
                  </div>
                  <p>Deadline:<input type="text" class="deadline bg-gray-200"></input></p>
                  <button data-id="todo${num}" class="delete bg-indigo-200 hover:bg-indigo-300 my-2 px-2 rounded">Delete</button>
              </div>
          </li>`;

      $("#todo .sortable").append( appendtodo );
      
      $(`#todo${num} .deadline`).datepicker({
          minDate: 0,
          dateFormat: "yy-mm-dd"
          });
      
      // setting the user-defined deadline
      $(`#todo${num} .deadline`).val(deadline);
      
      // totally DRY... *not*

      $( `#dialog${num}` ).dialog({
        autoOpen: false
      });

      dragged = true;
      $( ".todo" ).on("click", function(){
      $(".todo").on("drag", () => {
        dragged = true; 
      });
    
      if(!dragged){
        $(".dialog").dialog("close");
        let dialog = $(this).data('id');
        $( dialog ).dialog( "open" );
      }
      dragged = false;
      });

      $(`#tabs${num}`).tabs();

      savelocally(appendtodo, num, deadline);

      // unbinding the previous event handler
      $(".delete").off();

      $(".delete").on("click", function() {
          $(".dialog").dialog("close");
          const todo = $(this).data('id')
          localStorage.removeItem(todo);
          $(`#${todo}`).remove();
        }); 
  });
  
});
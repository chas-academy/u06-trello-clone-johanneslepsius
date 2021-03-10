// first of all, this code isn't exactly following DRY, since i had 
// to do the same things with both loaded and dynamically created elements

$(() => {
  // choosing if you want to have a review board 
  $( "#review" ).hide();
  $("#showReview").click( () => {
    $("#review").toggle("show", "linear")
  });

  // reading locally stored todos
  readlocal = function(){
    let amount = Object.keys(localStorage);
    // + 4 since there are 3 hardcoded todos and the while loop subtracts before executing
    amount = amount.length + 5;
    let todo;
    while ( amount-- ){
      todo = localStorage.getItem(`todo${amount}`);
      // localStorage.removeItem(`todo${amount}`);
      $("#todo .sortable").append(todo);
    }
  };
  
  readlocal();

  $(".delete").on("click", function() {
          const todo = $(this).data('id')
          localStorage.removeItem(todo);
          $(`#${todo}`).remove();
        });

  // this widget´s only purpose is to annoy the user. 
  // when active, it puts the todo in a random place instead of where they drop it.

  $.widget("wowmuchcustom.annoy",{
    options: {
        value: Math.random() * 500,
        value2: Math.random() * 100
    },
    _create: function() {
        this.element.addClass( "annoying" );
        // unbind:a sortable off()
        // this._off(this.element);
        
        this._on(this.element, {
          mouseup: "_refresh"
        });
        },
    _refresh: function(){
      this.random();
      console.log(this);
      $(".sortable").sortable("destroy");
      $(".sortable").sortable({
        items: `li:not(${this.element})`
      });
      this.element.css({
        left: this.options.value,
        top: this.options.value2
      });
      // $(this).closest("ul").addClass("bg-red-100");
    },
    random: function(){
      let position = {
      value: Math.floor(Math.random() * 500),
      value2: Math.floor(Math.random() * 100)
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

  $( ".sortable" ).on( "sortstop", function( event, ui ) {
    alert("boo");
  } );
  // $("#test").annoy();
  
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

  savelocally = function(todo, length){
    localStorage.setItem(`todo${length + 1}`, todo);
  };


  $("form").submit( function(event) {
      event.preventDefault();
      // keeping track of how many todos exist to keep the todo-tabs and dialogs related
      let todos = $(".todo");
      todos = todos.length;
      const info1 = $("input[name=info1]").val();
      const title = info1.substring(0, 15);
      const info2 = $("input[name=info2]").val();
      const info3 = $("input[name=info3]").val();
      const deadline = $("input[name=deadline]").val();
      const predeadline = deadline.substring(5);
      let appendtodo = `
          <li id="todo${todos +1}" class="todo shadow rounded bg-white hover:bg-gray-100 my-2 p-2" data-id="#dialog${todos +1}">
          <p>${title + "..."}</p>
          <div class="flex my-2">
          <img src="img/clock.svg" class="w-4 mr-2">
            <p>${predeadline}</p>
          </div>
              <div class="dialog rounded bg-white p-2" id="dialog${todos +1}">
                  <div class="tabs" id="tabs${todos +1}">
                      <ul>
                          <li><a href="#fragment-1.${todos +1}">Info 1</a></li>
                          <li><a href="#fragment-2.${todos +1}">Info 2</a></li>
                          <li><a href="#fragment-3.${todos +1}">Info 3</a></li>
                      </ul>
                      <div id="fragment-1.${todos +1}">${info1}</div>
                      <div id="fragment-2.${todos +1}">${info2}</div>
                      <div id="fragment-3.${todos +1}">${info3}</div>
                  </div>
                  <p>Deadline:<input type="text" class="deadline bg-gray-200"></input></p>
                  <button data-id="todo${todos +1}" class="delete bg-indigo-200 hover:bg-indigo-300 my-2 px-2 rounded">Delete</button>
              </div>
          </li>`;

      $("#todo .sortable").append( appendtodo );
      
      $(`#todo${todos +1} .deadline`).datepicker({
          minDate: 0,
          dateFormat: "yy-mm-dd"
          });
      
      // setting the user-defined deadline
      $(`#todo${todos +1} .deadline`).val(deadline);
      
      // totally DRY... *not*

      $( `#dialog${todos +1}` ).dialog({
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

      $(`#tabs${todos +1}`).tabs();

      savelocally(appendtodo, todos);

      // unbinding the previous event handler
      $(".delete").off();

      $(".delete").on("click", function() {
          localStorage.removeItem($(this).data('id'));
          location.reload();
        });  
  });
  
});
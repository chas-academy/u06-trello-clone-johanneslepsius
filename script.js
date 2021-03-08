// first of all, this code isn't exactly following DRY, since i had 
// to do the same things with both hardcoded and dynamically created elements

$(() => {
  // choosing if you want to have a review board 
  $( "#review" ).hide();
  $("#showReview").click( () => {
    $("#review").toggle("show", "linear")
  });

  // just me being too lazy to write text three times into the html
  $(".todo").append("<p>click or drag me</p>");

  // reading locally stored todos
  readlocal = function(){
    let amount = Object.keys(localStorage);
    // + 4 since there are 3 hardcoded todos and the while loop subtracts before executing
    amount = amount.length + 5;
    let todo;
    while ( amount-- ){
      todo = localStorage.getItem(`todo${amount}`);
      // localStorage.removeItem(`todo${amount}`);
      $("#backlog").append(todo);
    }
  };
  
  readlocal();

  $(".delete").on("click", function(event) {
          localStorage.removeItem($(this).data('id'));
          location.reload();
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
        this._on(this.element, {
          mouseup: "_refresh"
        });
        },
    _refresh: function(){
      this.random();
      this.element.css({
        left: this.options.value,
        top: this.options.value2
      });
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
  
  // opening the todo dialog, but not after the user just moves it to a new place
  
  let dragged = true;
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
  
  
  $( ".todo" ).draggable({snap: ".snapcontainer", snapMode: "inner"});
  
  
  $( ".drop" ).droppable({
      drop: function(){
        $(this).not("#backlog").effect("bounce", "slow");
      }
    });

  $( ".dialog" ).dialog({
    autoOpen: false
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
      let appendtodo = `
          <div id="todo${todos +1}" class="todo rounded bg-white hover:bg-gray-100 my-5 mx-auto w-28 h-16 w-5/6" data-id="#dialog${todos +1}">
          <p>${title + "..."}</p>
              <div class="dialog rounded bg-white" id="dialog${todos +1}">
                  <div class="tabs" id="tabs${todos +1}">
                      <ul>
                          <li><a href="#fragment-1.${todos +1}">info 1</a></li>
                          <li><a href="#fragment-2.${todos +1}">info 2</a></li>
                          <li><a href="#fragment-3.${todos +1}">info 3</a></li>
                      </ul>
                      <div id="fragment-1.${todos +1}">${info1}</div>
                      <div id="fragment-2.${todos +1}">${info2}</div>
                      <div id="fragment-3.${todos +1}">${info3}</div>
                  </div>
                  <p>Deadline:<input type="text" class="deadline bg-gray-200"></input></p>
                  <button data-id="todo${todos +1}" class="delete bg-indigo-200">Delete</button>
              </div>
          </div>`;

      $("#backlog").append( appendtodo );
      
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


      $( `#todo${todos +1}` ).draggable({snap: ".snapcontainer", snapMode: "inner"});

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
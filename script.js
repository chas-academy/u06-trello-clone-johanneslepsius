$(() => {
  $( "#review" ).hide();
  $("#showReview").click( () => {
    $("#review").toggle("show", "linear")
  });

  $("form").submit( function(event) {
      event.preventDefault();
      let todos = $(".todo");
      todos = todos.length;
      const info1 = $("input[name=info1]").val();
      console.log(info1);
      const info2 = $("input[name=info2]").val();
      const info3 = $("input[name=info3]").val();
      const deadline = $("input[name=deadline]").val();
      let appendtodo = `
          <div id="todo${todos +1}" class="todo" data-id="#dialog${todos +1}">
              <div class="dialog" id="dialog${todos +1}">
                  <div class="tabs">
                      <ul>
                          <li><a href="#fragment-1.${todos +1}">info 1</a></li>
                          <li><a href="#fragment-2.${todos +1}">info 2</a></li>
                          <li><a href="#fragment-3.${todos +1}">info 3</a></li>
                      </ul>
                      <div id="fragment-1.${todos +1}">${info1}</div>
                      <div id="fragment-2.${todos +1}">${info2}</div>
                      <div id="fragment-3.${todos +1}">${info3}</div>
                  </div>
                  <p>Deadline:</p><input type="text" class="deadline"></input>
              </div>
          </div>`
      $("#backlog").append( appendtodo );
      
      // $(".deadline").datepicker({
      //     minDate: 0,
      //     dateFormat: "yy-mm-dd"
      //     });
          
      // $("#todo4 .deadline").val(deadline);
      // // $("#backlog").append( blah );
      // console.log(deadline);

      $( `#todo${todos +1}` ).dialog({
        autoOpen: false
      });
  });

  // const createParams = new URLSearchParams(window.location.search);

  // if(createParams.get("info 1") !== null){
  //     let todos = $(".todo");
  //     todos = todos.length;
  //     // console.log(todos.length);
  //     const info1 = createParams.get("info 1");
  //     const info2 = createParams.get("info 2");
  //     const info3 = createParams.get("info 3");
  //     const deadline = createParams.get("deadline");
  //     // let date = deadline.replace(/-/g, "/");
  //     // let date = $.datepicker.parseDate("yy-mm-dd", deadline);
  //     let appendtodo = `
  //         <div id="todo${todos +1}" class="todo" data-id="#dialog${todos +1}">
  //             <div class="dialog" id="dialog${todos +1}">
  //                 <div class="tabs">
  //                     <ul>
  //                         <li><a href="#fragment-1.${todos +1}">info 1</a></li>
  //                         <li><a href="#fragment-2.${todos +1}">info 2</a></li>
  //                         <li><a href="#fragment-3.${todos +1}">info 3</a></li>
  //                     </ul>
  //                     <div id="fragment-1.${todos +1}">${info1}</div>
  //                     <div id="fragment-2.${todos +1}">${info2}</div>
  //                     <div id="fragment-3.${todos +1}">${info3}</div>
  //                 </div>
  //                 <p>Deadline:</p><input type="text" class="deadline"></input>
  //             </div>
  //         </div>`
  //     $("#backlog").append( appendtodo );
  //     $(".deadline").datepicker({
  //         minDate: 0,
  //         dateFormat: "yy-mm-dd"
  //         });
          
  //     $("#todo4 .deadline").val(deadline);
  //     // $("#backlog").append( blah );
  //     console.log(deadline);
  // };
  $( ".todo" )
    .draggable({snap: ".snapcontainer", snapMode: "inner"})
    // why is this shit fucking up the draggable????            toggle class   css scale
    /*.on("mousedown", function(){
      $(this).effect("size", {
        to: {width: 53, height: 53}})           
    })
    .on("mouseup", function(){
      $(this).effect("size", {
        to: {width: 50, height: 50}})
    })*/
    ;

  $( ".drop" ).droppable({
      drop: function(){
        console.log($(this))
          $(this).not("#backlog").effect("bounce", "slow");
      }
    });

  $( ".dialog" ).dialog({
    autoOpen: false
  });

  $( ".todo" ).on("click", function(){
    
    console.log($(this))
    // $(this).parent().find(".dialog").dialog( "open" )

    $(".dialog").dialog("close");
    let dialog = $(this).data('id');
    $( dialog ).dialog( "open" );
    // finns ingen bra lösning med typ children eller find?? slippa hårdkoda id och data-id
  });
  $(".tabs").tabs();

  $(".deadline").datepicker({
    minDate: 0,
    dateFormat: "yy-mm-dd"
    });

  $(".todo").append("<p>click or drag me</p>");
  
  // document.querySelector("form").addEventListener("submit", (e) => {
  // // function getFormData() {
  //   // const formData = $("form").serializeArray();
  //   let data = e.formData;
  //   for (value of data.values()){
  //     console.log(value);
  //   }

  //   // let data = e.formData;
  //   // for (var value of data.values()) {
  //   // console.log(value);
  //   // }

  //   e.preventDefault();
  //   return false;
  //   // console.log(formData);
  //   });
  
  
  
});
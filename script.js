  $( function() {
    $( ".todo" ).draggable();
    $( ".drop" ).droppable({
        drop: function( event, ui ) {
            $( this )
            .addClass( "ui-state-highlight" );
        }
    })
  } );
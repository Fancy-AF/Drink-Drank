var $visitedBars
var $nonVisitedBars
var $form
var $searchTerm
var yelpInfo

//
// var yelp = new Yelp ({
//   app_id: process.env.YELP_ID,
//   app_secret: process.env.YELP_SECRET
// })
//

function addToList(bar) {
  return $(`<li id="bar-${bar._id}" class="index-items draggable">${bar.name}</li>`).draggable({
    snap: 'ul',
    stop: updateHandler
  })
}

function updateHandler() {
  var html = $(this)
  var id = html.attr('id').slice(4)


  $.ajax({
    type: 'PATCH',
    url: 'bar/' + encodeURIComponent(id),
    data: {}
  }).then(
    function(jsonBar) {
      html.remove()

      var barHTML = addToList(jsonBar)

      if(jsonBar.visited) {
        $visitedBars.append(barHTML)
      } else {
        $nonVisitedBars.append(barHTML)
      }

    }
  )
}


$(document).ready(function(){
  $visitedBars = $('#visitedBars')
  $nonVisitedBars = $('#nonVisitedBars')
  $searchButton = $('#search-button')
  // new droppable ul for visited bars
  $('#drank-list').droppable()
  // new droppable ul for unvisited bars
  $('#drink-list').droppable()

  $('.draggable').draggable({
    snap: 'ul',
    stop: updateHandler
  })

  $searchButton.on('click', function(e) {
    e.preventDefault()
    $searchTerm = $('#searchTerm').val()
    console.log($searchTerm)
    $.ajax({
      url: '/search?term=' + $searchTerm,
      method: 'get'
    })
      .done(function (data) {
        yelpInfo = data
        console.log(data)
        $('#bars').append('<li>' + data.name + '</li>')
      })

  })




})

// movie finder script
function searchMovie() {
	// fungsi handle ketika melakukan request pencarian movie

	$('#movie-list').html(''); // membersihkan daftar movie sebelumnya	
 	const movieSearch = $('#search-input').val();  
	$.ajax({ 
	 	type: 'POST', 
	 	url: '/api/movie', 
		data: {type: 'search-movie', item: movieSearch},
		// ketika sukses post item, ajax otomatis reload page
	 	success: function(result){ 
			console.log(result);
			if(result.type === true) {
				// data result valid
				const movies = result.data;
				$.each(movies, function(i, data) {
					$('#movie-list').append(`
						<div class="col-md-4">
							<div class="card mb-3">
								<img src="` +  data.Poster + `" class="card-img-top" alt="...">
								<div class="card-body">
									<h5 class="card-title">` + data.Title + `</h5>
									<h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
									<a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="` + data.imdbID + `">See Detail</a>
								</div>
							</div>
						</div>
					`);
				});
				$('#search-input').val(''); // membersihkan input search movie sebelumnya
			} else {
				// data result invalid
				$('#movie-list').html(`
					<div class="col">
						<h1 class="text-center"> Error </h1>
					</div>
				`);	
			}
	 	} 
	}); 
}
 

$('#search-button').on('click', function() { searchMovie() });

$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) searchMovie(); });


$('#movie-list').on('click', '.see-detail', function() {
  	// request ajax untuk mendapatkan detail dari movie berdasarkan id movie
	const movieId = $(this).data('id');
 	$.ajax({
  		type: 'POST', 
	 	url: '/api/movie', 
		data: {type: 'search-movie-detail' ,item: movieId },
		success: function(result) {
  			if(result.type === true) {
 				$('.modal-body').html(`
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-4">
								<img src="` + result.data.Poster + `" class="img-fluid">
							</div>
							<div class="col-md-8">
								<ul class="list-group">
								  	<li class="list-group-item"> <h3> Title    : ` + result.data.Title + `</h3> </li>
								  	<li class="list-group-item"> <h3> Released : ` + result.data.Released + `</h3> </li>
								  	<li class="list-group-item"> <h3> Genre    : ` + result.data.Genre + `</h3> </li>
								  	<li class="list-group-item"> <h3> Director : ` + result.data.Director + `</h3> </li>
								  	<li class="list-group-item"> <h3> Actors   : ` + result.data.Actors + `</h3> </li>
									<li class="list-group-item"> <h3> Plot     : ` + result.data.Plot + `</h3> </li>
								</ul>
							</div>
						</div>
					</div>
				`);
			}
		}
	});
});

function youtubeDownloader() {
 	const linkYoutubeToDownload = $('#search-input').val();  

    if(linkYoutubeToDownload.length === 0) {
    	$('#errorMessage').html('Link is empty :('); 
    } else {
    	$('#errorMessage').html('');
	    $('#hr').html(`<h1 class="mt-5">` + linkYoutubeToDownload + `</h1>`);	
	    // efect loading saat request ajax
		$('#youtubedownloader-info').html('`<center><img src="/public/assets/img/ajax-loader.gif" alt="ajax-loader" srcset"" width="50" height="50"></center>`');	
		$.ajax({ 
		 	type: 'POST', 
		 	url: '/api/youtube-downloader', 
			data: {type: 'youtubedownloader-link', item: linkYoutubeToDownload},
			// ketika sukses post item, ajax otomatis reload page
		 	success: function(result){ 
				if(result.type === true) {
					// data result valid
					const movies = result.data;
					$.each(movies, function(i, data) {
						$('#youtubedownloader-info').append(`
							<div class="col-md-4">
								<div class="card mb-3">
									<img src="` +  data.thumb + `" class="card-img-top" alt="...">
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
					$('#youtubedownloader-info').html(`
						<div class="col">
							<h1 class="text-center"> `+ result.error +` </h1>
						</div>
					`);	
				}
		 	}, 
		 	error: function(err) {
		 		console.log(`error -> ${err}`);
		 	}
		}); 
	}
}
 
$('#search-button').on('click', function() { youtubeDownloader() });
$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) youtubeDownloader(); });

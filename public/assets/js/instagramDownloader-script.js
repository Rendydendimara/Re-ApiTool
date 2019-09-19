function instagramDownloader() {
 	const linkInstagramToDownload = $('#search-input').val();  
    
    if(linkInstagramToDownload.length === 0) {
    	$('#errorMessage').html('Link is empty :('); 
    } else {
    	$('#errorMessage').html('');
    	// efect loading saat request ajax
    	$('#instagramdownloader-info').html(`<center><img src="/public/assets/img/ajax-loader.gif" alt="ajax-loader" srcset"" width="50" height="50"></center>`);
	 	$.ajax({ 
		 	type: 'POST', 
		 	url: '/api/instagram-downloader', 
			data: {type: 'instagramdownloader-link', item: linkInstagramToDownload},
			// ketika sukses post item, ajax otomatis reload page
		 	success: function(result){ 
		 		$('#instagramdownloader-info').html('');
				if(result.type === true) {
					$('#instagramdownloader-info').append(`
						<a style="width: 100%; height:100%;"  href="`+ result.data.instagramDownloaderLink +`" class="btn btn-success">`+ result.data.instagramDownloaderTitle +`</a>
					`)
					$('#search-input').val(''); // membersihkan input search movie sebelumnya
				} else {
					// data result invalid
					$('#instagramdownloader-info').html(`
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

$('#search-button').on('click', function() { instagramDownloader() });
$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) instagramDownloader(); });
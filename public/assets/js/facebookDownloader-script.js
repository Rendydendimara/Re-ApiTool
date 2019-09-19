function facebookDownloader() {
 	const linkFacebookToDownload = $('#search-input').val();  

    if(linkFacebookToDownload.length === 0) {
    	$('#errorMessage').html('Link is empty :('); 
    } else {
    	$('#errorMessage').html('');
	    // efect loading saat request ajax 
	    $('#facebookdownloader-info').html(`<center><img src="/public/assets/img/ajax-loader.gif" alt="ajax-loader" srcset"" width="50" height="50"></center>`);
		$.ajax({ 
		 	type: 'POST', 
		 	url: '/api/facebook-downloader', 
			data: {type: 'facebookdownloader-link', item: linkFacebookToDownload},
			// ketika sukses post item, ajax otomatis reload page
		 	success: function(result){ 
		 		$('#facebookdownloader-info').html('');
				console.log(result);
				if(result.type === true) {
					// data result valid
					$('#facebookdownloader-info').append(`
				        <div class="col-md-6">
				            <a href="`+ linkFacebookToDownload +`" target="_blank">
				              <video controls="controls" width="100%">
				              </video>
				            </a>
				         </div>
				        <div class="col-md-6">
				          <ul>
				            <li>
				              <p class="title">
				                <strong>Title: </strong>
				                `+ result.data.facebookDownloaderTitle +`
				              </p>
				            </li>
				            <li>
				              <p class="title">
				              <strong>URL: </strong>
				              <a style="font-size: 100%" target="_blank" href="` + linkFacebookToDownload + `">`+ linkFacebookToDownload +`</a>
				            </p>
				            </li>
				            <li>
				              <a href=" `+ result.data.facebookDownloaderLink + `" class="btn btn-primary">Download HD Quality (764.56kb)</a>                       
				            </li>
				          </ul>
				        </div>
					`);
					$('#search-input').val(''); // membersihkan input search movie sebelumnya
				} else {
					// data result invalid
					$('#facebookdownloader-info').html(`
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
 
$('#search-button').on('click', function() { facebookDownloader() });
$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) facebookDownloader(); });

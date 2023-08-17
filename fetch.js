var convertBtn = document.getElementById('dl-btn');
var input = document.getElementById('yt-link');


convertBtn.addEventListener('click', async () => {

	const link = input.value;

	//Get video ID from link for api call
	const videoID = link.split('v=')[1];
	if(videoID == null){
		alert("Invalid URL!");
		input.value = '';
		return;
	}

	
	const url = 'https://youtube-mp3-download1.p.rapidapi.com/dl?id=' + videoID;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'c3108d3d0fmsh7f954523d3df551p12af35jsnd2c68e78b823',
			'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
		}
	};


	try {
		const response = await fetch(url, options);
		const result = await response.text();
		const resultObj = JSON.parse(result);
		DownloadFile(resultObj["link"], resultObj["title"]);
		console.log(resultObj);

	} catch (error) {
		console.error(error);
	}
});


function DownloadFile(url, title) {
	const dlLink = document.getElementById('dl-link');
	const info = document.getElementById('info');
	const convertNextBtn = document.getElementById('convert-next-btn');

	convertNextBtn.hidden = false;
	convertNextBtn.addEventListener('click', () => {
		window.location = "index.html";
	});

	dlLink.href = url;
	dlLink.download = title + '.mp3';
	dlLink.innerHTML = 'Download MP3';

	info.hidden = false;
}





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

	const url = 'https://youtube-mp3-download-highest-quality1.p.rapidapi.com/ytmp3/ytmp3/custom/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D' + videoID + '&quality=320';
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'c3108d3d0fmsh7f954523d3df551p12af35jsnd2c68e78b823',
			'X-RapidAPI-Host': 'youtube-mp3-download-highest-quality1.p.rapidapi.com'
		}
	};


	try {
		document.getElementById('info').innerText = "Processing...";
		document.getElementById('dl-btn').disabled = true;
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
		const resultObj = JSON.parse(result);
		console.log(resultObj);
		DownloadFile(resultObj["link"], resultObj["title"], resultObj["size"]);
	} catch (error) {
		alert("An error occurred and the file cannot be downloaded!");
		console.error(error);
	}
});


function DownloadFile(url, title, size) {
	const dlLink = document.getElementById('dl-link');
	const info = document.getElementById('info');
	const convertNextBtn = document.getElementById('convert-next-btn');

	convertNextBtn.hidden = false;
	convertNextBtn.addEventListener('click', () => {
		window.location = "index.html";
	});

	dlLink.href = url;
	dlLink.innerHTML = 'Download MP3';

	info.innerHTML = title + " " + "(" + size + ")";
	
}





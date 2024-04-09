const url = 'https://streaming-availability.p.rapidapi.com/countries';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'db036f9a6amshfdc5efa0a9dbed8p1e4200jsn1ac6baaee515',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

fetch(url,{
    cache: 'reload',
})
    .then(function(res){
      return res.json();
        })
        .then(function (data){
            console.log(data);
        })
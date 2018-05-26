// $(document).ready(function() {
// 	$('.js-example-basic-single').select2();
// });

// console.log(countries);


function initMap() {
	// Create a map object and specify the DOM element for display.
	var my_map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 23.821077, lng: 121.002655 },
		zoom: 2,
		mapTypeControl: false,
	});
	
	my_map.addListener('zoom_changed', function(arg){
		console.log(my_map.getZoom());

		console.log('zoom');
		
		
	})


	let country_list = countries.features;
	let select_data = [];
	for(let i=0;i< country_list.length ; i++){
		let name = country_list[i].properties.name;
		let short_name = country_list[i].id;
		select_data.push({
			id: i,
			text: name,
			// text: name + ', ' + short_name,
		})
	}
	$('.js-example-basic-single').select2({
		data: select_data,
		placeholder: 'Select an country',
		allowClear: true,
		width: '200',
	 });
	 $('.js-example-basic-single').val(null).trigger('change');
	
	 $('.js-example-basic-single').on('change', function(){
		let selected_name = $('.js-example-basic-single option:selected' ).text();
		// console.log(selected_name);

		my_map.data.forEach(feature => {
			my_map.data.remove(feature);
		});
	
		let result_c = country_list.find(((item, idx)=>{
			return item["properties"]['name'] === selected_name
		}));
	
		if(result_c === undefined){
			//alert('找不到');
		}else{
			try{
				let features = my_map.data.addGeoJson(result_c);


				my_map.data.setStyle({
					draggable: true,
					strokeWeight: 1,
					fillColor: 'red',
				})
			}catch(e){
				console.log("err:", e);
			}
		}
	
	
	 })
	

	 



	// try{
	// 	my_map.data.addGeoJson(
	// 		{"type":"Feature","id":"TWN","properties":{"name":"Taiwan"},"geometry":{"type":"Polygon","coordinates":[[[121.777818,24.394274],[121.175632,22.790857],[120.74708,21.970571],[120.220083,22.814861],[120.106189,23.556263],[120.69468,24.538451],[121.495044,25.295459],[121.951244,24.997596],[121.777818,24.394274]]]}}
	// );
	// }catch(e){
	// 	console.log("err:", e);
	// }

}
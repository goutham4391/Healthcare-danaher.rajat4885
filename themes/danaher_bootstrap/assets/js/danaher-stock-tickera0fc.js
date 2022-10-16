(function($){
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=DHR",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "yh-finance.p.rapidapi.com",
			"x-rapidapi-key": "5100af7f3emsh4a01cc532cb4cbdp1e1f7ajsnbd7973eaff2b"
		}
	}
	
    $(document).ready(function() {
		$.ajax(settings).done(function (response) {
			if(response!=null && response!=undefined){
				var signMarketChange = "";
				var regularMarketChange = "";
				
				if(Math.sign(response.quoteResponse.result[0].regularMarketChange)==1){
					signMarketChange = "&#129045;"
					regularMarketChange = "<span style='color:green;'>$"+Math.abs(response.quoteResponse.result[0].regularMarketChange).toFixed(2)+"</span>";
				}else if(Math.sign(response.quoteResponse.result[0].regularMarketChange)==-1){
					signMarketChange = "&#129047;"
					regularMarketChange = "-$"+Math.abs(response.quoteResponse.result[0].regularMarketChange).toFixed(2);
				}
				var stock_query = "<div style='background: transparent;font-weight: 300;color: #FFF;'>NYSE:DHR $" + response.quoteResponse.result[0].regularMarketPrice.toFixed(2) +"  "+signMarketChange+regularMarketChange+"</div>";
				$("#stock-json").html(stock_query);
			}
		});			
	});
	
    //-------------------------------------------------------------------
})(jQuery);
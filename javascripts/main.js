!function (d) {
	
	/// 汚いコードを気にしたら負け。
	var $projects = d.getElementById("projects");
	
	
	var getAction = function (url, query, callback ) {
		
		if(typeof url === 'undefined' || typeof url !== 'string' || url.indexOf('?')!==-1) {
			return false;
		} 
		var xhr = new XMLHttpRequest();
		
		
		if(typeof query === 'string' && !query.length) {
			url = url + '?' + query;
		} else if(typeof query === 'object') {
			url = url + '?';
			for(key in query) {
				if(query.hasOwnProperty(key)) {
					url + key + '=' + query[key];
				}
			}
		}
		xhr.onload =function(ev) {
			callback(this.responseText);
		};
		xhr.onerror = function (e) {console.error(e)};
		xhr.open('GET', url);
		xhr.send()
	};
		
		var reqGithubApi = function (endpoint, query,callback) {
			var baseUri = 'https://api.github.com';
			var res = getAction(baseUri + endpoint , query,function (response){
				try {
					var json = JSON.parse(response);
					callback(json);
				} catch (e) {
					callback({error:-1});
				}
			});
			if (res === false) {
				return "your request is invalid or nonsupport browser:(";
			}

		}
		
		var getRepos = function(orgName,callback) {
			var res =  reqGithubApi ('/orgs/'+ orgName + '/repos',{type:"all"},function(json){
				if (typeof json !== "object" || json.hasOwnProperty("error") || !(json instanceof Array)  ) {
					return;
				}
				callback(json);
				
				
			})
			
		}
		
		getRepos("syaroshico",function(Arr){
			try{
				var html = '';
				var obj = {};
				for(var i=0;i<Arr.length;i++) {
					obj = Arr[i];
					html += '<li class="item item-'+obj.id+'"><a href="'+obj.html_url+'">'+obj.name+'</a></li>';
				}
				$projects.innerHTML=html;
			} catch (e){console.error(e);}
		});
		
	
	
	
	
}(document)
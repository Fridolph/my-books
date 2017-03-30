//global variable for my database handler
var myDb;
var $firstNameField;
var $lastNameField;
var resultTemplate;
var $results;

$(document).ready(function() {

	myDb = new Dexie("employee_database");
	myDb.version(1).stores({
		employees:"++id,&email,name.first,name.last"
	});
	myDb.open();
	
	$firstNameField = $("#firstname");
	$lastNameField = $("#lastname");
	$results = $("#resultsDisplay");

	//Do we have the data?
	haveData().then(function(hasData) {
		
		if(!hasData) {
			console.log("I need to setup the db.");	
			setupData().then(appReady);
		} else {
			appReady();
		}
		
	});
	
	//used for result templates
	var source   = $("#result-template").html();
	resultTemplate = Handlebars.compile(source);

});

/*
I handle UI/UX/etc stuff for when the data is ready to be searched.
*/
function appReady() {
	console.log('appReady fired, lets do this');	
	//show the search form
	$("#searchFormDiv").show();
	$("#searchForm").on("submit", doSearch);
}

function doSearch(e) {
	e.preventDefault();
	var fName = $.trim($firstNameField.val());
	var lName = $.trim($lastNameField.val());

	$results.empty();
	console.log('search for -'+fName+'- -'+lName);
	
	var fnEmps = [];
	var lnEmps = [];
	myDb.transaction('r', myDb.employees, function() {
		
		if(fName !== '') {
			myDb.employees.where("name.first").startsWithIgnoreCase(fName)
			.each(function(emp) {
				fnEmps.push(emp);	
			});
		}
		
		if(lName !== '') {
			myDb.employees.where("name.last").startsWithIgnoreCase(lName)
			.each(function(emp) {
				lnEmps.push(emp);
			});
		}
		
	}).then(function() {
		console.log('done');
		var results = [];

		//just a first name
		if(fName !== '' && lName === '') {
			console.log('first');
			fnEmps.forEach(function(emp) { results.push(emp); });
		//just a last name
		} else if(lName !== '' && fName === '') {
			lnEmps.forEach(function(emp) { results.push(emp); });
		//both
		} else {

			//only return items where ob exists in both
			//to make it simpler, we'll make an index of
			//email values in lnEmps so we can check them
			//quicker while going over fnEmps
			var lnEmails = [];
			lnEmps.forEach(function(emp) { lnEmails.push(emp.email); });
			
			/*
			fnEmps.forEach(function(emp) {
				if(lnEmails.indexOf(emp.email) >= 0) results.push(emp);
			});
			*/
			results = fnEmps.filter(function(emp) {
				return lnEmails.indexOf(emp.email) >= 0;
			});
		}

		//Begin rendering the results.
		if(results.length) {
			results.forEach(function(r) { 
				console.log(r.name.first+' '+r.name.last); 
				var result = resultTemplate(r);
				$results.append(result);
			});
		} else {
			$results.html("Sorry, nothing matched your search.");	
		}
		
	}).catch(function(err) {
		console.log('error', err);
	});

}

/*
I determine if we have data. Basically if I return true, we are
ready to start searching. I use promises even though this isn't
an asynch process.
*/
function haveData() {
	var def = $.Deferred();

	var lastFetch = Lockr.get("lastDataSync");
	
	if(lastFetch) def.resolve(true);
	else def.resolve(false);

	return def.promise();	
}

function setupData() {
	var def = $.Deferred();

	//setup modal options
	$("#setUpModal").modal({
		keyboard: false
	});
	
	//now show it
	$("#setupModal").modal("show");

	//now, fetch the remote data
	$.get("data/users.json", function(data) {
		console.log("Loaded JSON, have "+data.results.length+" records.");
		console.dir(data.results[0].user);

		myDb.transaction("rw", myDb.employees, function() {
			
			data.results.forEach(function(rawEmp) {
				
				/*
				We aren't copying the data as is, we modify it a bit.
				Specifically the raw data has some dupes on email/username
				so I make an email based on the compation of both
				*/
				var emp = {
					cell:rawEmp.user.cell,
					dob:rawEmp.user.dob,
					email:rawEmp.user.email.split("@")[0]+"." 
					+ rawEmp.user.username + "@gmail.com",
					gender:rawEmp.user.gender,
					location:rawEmp.user.location,
					name:rawEmp.user.name,
					phone:rawEmp.user.phone,
					picture:rawEmp.user.picture
				};

				myDb.employees.add(emp);
			});

		}).then(function() {

			//hide the modal
			$("#setupModal").modal("hide");
			
			//store that we synced
			Lockr.set("lastDataSync", new Date());
			
			def.resolve();
			
		}).catch(function(err) {
			console.log("error in transaction", err);
		});
		
	}, "json");
	
	return def.promise();	

}
$(document).ready(function(){
	$('#newTaskForm').hide();
	var listo = [];
	var Task = function(task) {
		this.task = task;
		this.id = "new";
	}
	var addTask = function(task) {
		if (task) {
			task = new Task(task);
			listo.push(task);

			$('#newItemInput').val('');
			$('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></a>');
		
		}
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');

	};
	var save = function() {
		localStorage.listo = JSON.stringify(listo);
	};
	$('#saveNewItem').on('click', function(e){
		e.preventDefault();
		var task = $('#newItemInput').val().trim();
		addTask(task);
	});

	// Opens Form
	$('#newListItem').on('click', function(){
		$('#newListItem, #newTaskForm').fadeToggle('fast', 'linear');
	});
	// Closes Form
	$('#cancel').on('click', function(e){
		e.preventDefault();
		$('#newListItem, #newTaskForm').fadeToggle('fast', 'linear');
	});
	var advanceTask = function(task) {
	    var modified = task.innerText.trim()
		    for (var i = 0; i < listo.length; i++) {
		        if (listo[i].task === modified) {
		            if (listo[i].id === 'new') {
		                listo[i].id = 'inProgress';
		            } else if (listo[i].id === 'inProgress') {
		                listo[i].id = 'archived';
		            } else {
		                listo.splice(i, 1);
	            }
	            save();
	            break;
	        }
		}
		task.remove();
	};
	$(document).on('click', '#item', function(e){
		e.preventDefault();
		var task = this;
		advanceTask(task);
		this.id = 'inProgress';
		$('#currentList').append(this.outerHTML);
	});
	$(document).on('click', '#inProgress', function(e){
		e.preventDefault();
		var task = this;
		task.id = 'archived';
		var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
		advanceTask(task);
		$('#archivedList').append(changeIcon);
	});
	$(document).on('click', '#archived', function(e){
		e.preventDefault();
		var task = this;
		advanceTask(task);
	});







})
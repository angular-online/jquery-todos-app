var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

$(document).ready(function(){
    var idEdit = false;
    var id = getUrlParameter('id');
    console.log(id);
    idEdit = (id && id !== '0') ? true : false ;

    var loadingImg = $('.loading-img img');
    var todoErrorMsg = $('.todos-fail-message');
    var saveTodoFailMessage = $('.save-todo-fail-message');
    saveTodoFailMessage.hide();

    // Init date picker
    $("#targetDate").datepicker();

    // Load todo data
    if(idEdit) {
        loadingImg.show();

        var url = 'https://todos-api-dev.herokuapp.com/todos/'+id;
        $.ajax({
            url: url,
            type: 'GET',
            success: function(todo){
                console.log(todo);
            },
            error: function(error) {
                todoErrorMsg.show();
            },
            complete: function() {
                loadingImg.hide();
            }
        });
    }

    // Load Tags
    $.ajax({
        url: 'https://todos-api-dev.herokuapp.com/tags',
        type: 'GET',
        success: function(tags){
            var tagsHtml = '';
            tags.forEach(tag => {
                tagsHtml = tagsHtml + '<div class="form-check form-check-inline">';
                tagsHtml = tagsHtml + '<input class="form-check-input" type="checkbox" name="tags" value="'+tag._id+'"/>'; 
                tagsHtml = tagsHtml + '<label class="form-check-label">'+tag.name+'</label>';      
                tagsHtml = tagsHtml + '</div>';    
            });  
            $('.tags-checkboxes').html(tagsHtml);  
        }
    });

    // Load Categories
    $.ajax({
        url: 'https://todos-api-dev.herokuapp.com/categories',
        type: 'GET',
        success: function(categories){
            var categoriesHtml = '<option value="">Select Category</option>';
            categories.forEach(category => {
                categoriesHtml = categoriesHtml + '<option value="'+category._id+'">'+category.name+'</option>';
            });  
            $('.category').html(categoriesHtml);  
        }
    });
});
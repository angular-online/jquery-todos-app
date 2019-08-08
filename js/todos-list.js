$(document).ready(function() {

    var loadingImg = $('.loading-img img');
    var todosErrorMsg = $('.todos-fail-message');
    var noTodosMsg = $('.no-todos-message');
    var todosList = $('.todo-list');

    function loadTodos(searchTerm) {
        console.log(searchTerm);
        loadingImg.show();
        todosErrorMsg.hide();
        noTodosMsg.hide();
        todosList.empty();

        var url = 'https://todos-api-dev.herokuapp.com/todos';
        if(searchTerm) {
            url = url + '?search='+searchTerm;
        }
        
        $.ajax({
            url: url,
            type: 'GET',
            success: function(todos){
                console.log(todos); 
                if(todos && todos.length) {
                    var todosHtml = '';
                    todos.forEach(todo => {
                        var compleatedClass = todo.isCompleted ? 'compleated' : '';
                        var tags = '';
                        if(todo.tags && todo.tags.length) {
                            todo.tags.forEach(function(tagObj) {
                                tags = tags + tagObj.name + ', '    
                            });
                            tags = tags.trim();
                            tags = tags.substr(0, tags.length-1);
                        }
                        console.log(tags);
                        var formattedDate = new Date(todo.targetDate);
                        formattedDate = formattedDate.getDate() + '/' + (formattedDate.getMonth()+1) + '/' + formattedDate.getFullYear();
                        console.log(formattedDate);
                        todosHtml = todosHtml + '<li class="list-group-item">';
                        todosHtml = todosHtml + '<span class="align-left '+compleatedClass+'">'+todo.title+'</span>';
                        todosHtml = todosHtml + '<span class="badge badge-primary badge-pill"><span>'+tags+'</span></span>';
                        todosHtml = todosHtml + '<span class="badge badge-primary badge-pill">'+todo.category.name+'</span>';
                        todosHtml = todosHtml + '<span class="badge badge-primary badge-pill">'+formattedDate+'</span>';
                        todosHtml = todosHtml + '<span><a href="./add-edit-todo.html?id='+todo._id+'">Edit</a></span>';
                        todosHtml = todosHtml + '<span class="text-danger delete-btn" todo-id="'+todo._id+'">Delete</span>';
                        todosHtml = todosHtml + '</li>';
                    });
                    todosList.html(todosHtml);
                }else{
                    noTodosMsg.show();
                }
            },
            error: function(error) {
                todosErrorMsg.show();
            },
            complete: function() {
                loadingImg.hide();
            }
        });
    }
    
    // Get todos on page load
    loadTodos();

    // Search
    $('.search-box').on('keyup', function() {
        var searchTerm = $(this).val();
        loadTodos(searchTerm);
    });

});
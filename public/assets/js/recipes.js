//Wait to attach the handlers until the DOM is fully loaded
$(document).ready(function() {
    console.log("running the recipe.js function")

    var newIngredient = $("#ingredient");
    var ingredientList = $(".tbody");
    var ingredientContainer = $(".ingredient-form");

    //create a new ingredient (I will probably need to get rid of this, and have typehead.js look through available ingredients)
    $(document).on("submit", "#ingredient-form", handleIngredientSubmission);
    $(document).on("click", ".delete-ingredient", handleDeleteButtonPress);

    //Getting a list of Ingredients
    getIngredients();

    //A Function to handle what happens when I want to add an Ingredient to the database
    function handleIngredientSubmission(event) {
        event.preventDefault();
        //Tell the user fuck off if they don't put anything in the input field
        if(!newIngredient.val().trim().trim()) {
            return;
        }
        insertIngredient({
            name: newIngredient
            .val()
            .trim()
        });
    }

    //function for putting a mother fucking ingredient in the mother fuckin' database
    function insertIngredient(ingredientData) {
        $.post("/api/ingredients", ingredientData).then(getIngredients);
    }

    function getIngredient(){
        let ingredientName = "";

        $.ajax({
            url: "/recipes/",
            data: {
                ingredient: ingredientName
            },
            type: "POST"
        }).then(ingredientWithRecipes => {
            // ingredientWithRecipes.Recipes
        })  
    }

    // //Function for showing a list of ingredients
    // function createIngredientsRow(ingredientData) {
    //     var newTr = $("<tr>");
    //     newTr.data("ingredient", ingredientData);
    //     newTr.append("<td>" + ingredientData.name + "</td>");
    //     newTr.append("<td><a style='cursor:pointer;color:red' class='delete-ingredient'>Delete Author</a></td>");
    //     return newTr;
    // }

    // // //Getting Ingredients, and rendering them to the Page
    // function getIngredients() {
    //     $.get("/api/ingredients", function(data) {
    //         var rowsToAdd = [];
    //         for (var i = 0; i < data.length; i++) {
    //             rowsToAdd.push(createIngredientRow(data[i]));
    //         }
    //         renderIngredientList(rowsToAdd);
    //         newIngredient.val("");
    //     });
    // }
    
    //  // A function for rendering the list of authors to the page
    // function renderIngredientList(rows) {
    //     ingredientList.children().not(":last").remove();
    //     ingredientContainer.children(".alert").remove();
    //     if (rows.length) {
    //         console.log(rows);
    //         ingredientList.prepend(rows);
    //     }
    //     else {
    //         renderEmpty();
    //     }
    // }

    // function renderEmpty() {
    //     var alertDiv = $("<div>");
    //     alertDiv.addClass("alert alert-danger");
    //     alertDiv.text("You must submit and Ingredient");
    //     ingredientContainer.append(alertDiv);
    // }
 
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        var listItemData = $(this);
        var id = listItemData.id;
        $.ajax({
            method: "DELETE",
            url: "/api/ingredients/" + id
        })
        .then(getIngredients);
    }




});
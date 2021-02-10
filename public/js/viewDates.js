$(document).ready(function () {
    console.log("dates.js loaded");

    // Get request to grab the user info and check if they are logged in
    $.get("/api/user_data").then(function (data) {
        $("#member-name").text(`Welcome, ${data.email}`);

        const id = data.id;
        $("#userId").append(id);
        console.log(id);
    });

    // Event Listener that lets user view their dates
    const viewDatesLink = $(".viewDates");
    viewDatesLink.on("click", function (event) {
        window.location.reload();
    });

    // Event Listener that lets user update their date to be completed
    const completeDateBtns = document.querySelectorAll(".update");
    if (completeDateBtns) {
        // Since their are multiple buttons with the class of update, QuerySelectorAll and a ForEach will give each of them the put method
        completeDateBtns.forEach((button) => {
            button.addEventListener("click", (event) => {
                const dateId = event.target.getAttribute("id");

                // PUT request to update dates
                fetch(`/dates/update/${dateId}`, {
                    method: "PUT",
                    body: {
                        completed: true,
                    }
                }).then((response) => {
                    if (response.ok) {
                        alert("Date has been completed! Hope you had fun!");
                        console.log(`Updated date with id: ${dateId}`);
                        window.location.reload();
                    } else {
                        alert("Ahh rats");
                    }

                });
            });
        });
    }


    // Event Listener that lets the user delete their saved date
    const deleteDateBtns = document.querySelectorAll(".delete");
    if (deleteDateBtns) {
        // Since their are multiple buttons with the class of update, QuerySelectorAll and a ForEach will give each of them the delete method
        deleteDateBtns.forEach((button) => {
            button.addEventListener("click", (event) => {
                const dateId = event.target.getAttribute("id");

                // DELETE request to delete dates
                fetch(`/dates/${dateId}`, {
                    method: "DELETE",
                }).then((response) => {
                    alert("Date has been deleted!")
                    console.log(`Deleted date with id: ${dateId}`);
                    window.location.reload();
                });
            });
        });
    }
});
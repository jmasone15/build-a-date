$(document).ready(function () {
    console.log("dates.js loaded");

    $.get("/api/user_data").then(function (data) {
        $("#member-name").text(`Welcome, ${data.email}`);

        const id = data.id;
        $("#userId").append(id);
        console.log(id);
    });

    const viewDatesLink = $(".viewDates");
    viewDatesLink.on("click", function (event) {
        window.location.reload();
    });

    const completeDateBtns = document.querySelectorAll(".update");
    if (completeDateBtns) {
        completeDateBtns.forEach((button) => {
            button.addEventListener("click", (event) => {
                const dateId = event.target.getAttribute("id");

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


    const deleteDateBtns = document.querySelectorAll(".delete");
    if (deleteDateBtns) {
        deleteDateBtns.forEach((button) => {
            button.addEventListener("click", (event) => {
                const dateId = event.target.getAttribute("id");

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
$(document).ready(function () {
    console.log("dates.js loaded");

    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.email);

        const id = data.id
        $("#userId").append(id);
        console.log(id);
    });


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
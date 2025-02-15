function ShowInpAndBtn() {
    let input = document.getElementById("AddInput");
    let button = document.getElementById("AddButton");
    if (input.style.display == "block") {
        input.style.display = "none";
        button.style.display = "none";
    }
    else {
        input.style.display = "block";
        button.style.display = "block";
    }
}
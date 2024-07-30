function myFunction() {
    var myDiv = document.getElementById('light');

    // Function to change the background image
    function changeBackgroundImage(newImageURL) {

        console.log(myDiv);
        myDiv.style.backgroundImage = 'url(' + newImageURL + ')';

        if (myDiv.style.backgroundImage = 'url(assets/dark.png)') {
            newImageURL = 'assets/upper.png';

        } else {
            newImageURL = 'assets/dark.png';
        }

    }

    // Example usage:
    var newImageURL = 'assets/upper.png';
    newImageURL = 'assets/dark.png';

    console.log(newImageURL);
    changeBackgroundImage(newImageURL);



}
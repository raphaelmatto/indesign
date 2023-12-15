// Author: Raphael Matto
// Date: Dec 15, 2023
// Use this script to update paths for moved InDesign Documents in an InDesign Book.

main();

function main() {
    var newRoot = new Folder(prompt("New folder path", ""));

    if (!newRoot.exists) {
        alert(newRoot + " does not exist.");
        exit();
    }

    var book = app.activeBook;

    var userConfirmation = confirm(
        "This script will replace any missing Document paths with Document paths that exist at " + 
        newRoot + " for the book " + book.name + "." + " Do you want to continue?", true, "Please confirm");
    if (!userConfirmation) {
        exit();
    }

    for (var i = 0; i < book.bookContents.length; i++) {
        var doc = book.bookContents[i];

        if (!new File(doc.fullName).exists) {
            newPath = new File(newRoot.fsName + "/" + doc.name);

            if (newPath.exists) {
                doc.replace(new File(newRoot.fsName + "/" + doc.name));
            } else {
                alert(newPath + " does not exist, skipping ...")
            }
        }
    }
}
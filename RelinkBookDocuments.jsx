// Author: Raphael Matto
// Date: Dec 15, 2023
// This script updates paths for moved InDesign Documents in an InDesign Book.
// Tested on MacOs, might work on Windows.

main();

function main() {

    // If there are no Books open, app.activeBook fails.
    try {
        var book = app.activeBook;
    } catch(e) {
        alert(e);
        exit();
    }

    alert("In the next dialog, select the folder where you've moved the Book's Document files to.")

    var newRoot = Folder.selectDialog("New Documents folder");

    if (!newRoot) {
        alert("No folder selected, exiting ...");
        exit();
    }

    var confirmed = confirm(
        "This script will replace all missing Document paths with Document paths that exist at " +
        newRoot + " for the Book " + book.name + "." + " Do you want to continue?", true, "Please confirm");
    if (!confirmed) {
        exit();
    }

    var count = 0;

    for (var i = 0; i < book.bookContents.length; i++) {
        var doc = book.bookContents[i];

        if (!new File(doc.fullName).exists) {
            newPath = new File(newRoot.fsName + "/" + doc.name);

            if (newPath.exists) {
                doc.replace(newPath);
                count++;
            } else {
                alert(newPath + " does not exist, skipping ...")
            }
        }
    }

    alert("Paths updated for " + count + " Documents in " + book.name + ".")
}

; $(function () {
    // Attach to the submit button.
    $("#btnUploadFile").click(function (evt) {
        var fd = new FormData();
        fd.append('file', document.getElementById("inFile").files[0]);
        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        $("#Progress").val(percentComplete)
                        if (console) { console.log(percentComplete); }
                        if (percentComplete === 100) {
                            document.location = "complete.html";
                        }
                    }
                }, false);
                return xhr;
            },
            url: "http://storage.googleapis.com/elko",
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function (result) {
                console.log(result);
            }
        });
    });
});
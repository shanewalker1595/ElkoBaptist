; $(function () {
    $("#btnUploadFile").click(function (evt) {  
        var file = document.getElementById("inFile").files[0]
        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        $("#Progress").val(percentComplete)
                        if (console) { console.log(percentComplete); }
                    }
                }, false);
                xhr.upload.addEventListener("error", function (evt) {
                    alert('There was an error uploading this file.');
                });
                xhr.upload.addEventListener("load", function (evt) {
                    document.location = "complete.html"
                })
                return xhr;
            },
            url: "https://storage.googleapis.com/elko/user_uploads/" + file.name,
            type: "PUT",
            data: file,
            processData: false,
            contentType: file.type,
            success: function (result) {
                console.log(result);
            }
        });        
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Function to handle file input change and display the selected image
    function handleFileSelect(event) {
        var input = event.target;
        var file = input.files ? input.files[0] : null;
        var img = document.getElementById('profile-pic-preview');
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    img.src = e.target.result;
                    img.style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        }
    }
    // Attach the event listener to the file input
    var profilePicInput = document.getElementById('profile-pic');
    profilePicInput.addEventListener('change', handleFileSelect);
    // Edit Button Functionality
    var editButton = document.getElementById('edit-btn');
    if (editButton) {
        editButton.addEventListener('click', function () {
            var inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(function (input) {
                var element = input;
                element.removeAttribute('readonly');
                element.style.backgroundColor = ''; // Optionally reset background color
            });
            // Focus on the First Name input
            var firstNameInput = document.getElementById('first-name');
            if (firstNameInput) {
                firstNameInput.focus();
            }
        });
    }
    // Save Button Functionality
    var saveButton = document.getElementById('save-btn');
    if (saveButton) {
        saveButton.addEventListener('click', function () {
            var data = {
                profilepic: document.getElementById('profile-pic').value,
                firstName: document.getElementById('first-name').value,
                middleName: document.getElementById('middle-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                dob: document.getElementById('dob').value,
                address: document.getElementById('address').value,
                passport: document.getElementById('passport').value,
                drivingLicense: document.getElementById('driving-license').value,
                skills: document.getElementById('skills').value,
                experience: document.getElementById('experience').value,
                education: document.getElementById('education').value
            };
            var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            alert('File Saved. You can download it now.');
            // Uncomment the following lines if you want to trigger a download:
            // a.href = url;
            // a.download = 'resume.json';
            // a.click();
            // URL.revokeObjectURL(url);
        });
    }
    // Download Button Functionality (as JSON)
    var downloadButton = document.getElementById('download-btn');
    if (downloadButton) {
        downloadButton.addEventListener('click', function () {
            var data = {
                profilepic: document.getElementById('profile-pic').value,
                firstName: document.getElementById('first-name').value,
                middleName: document.getElementById('middle-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                dob: document.getElementById('dob').value,
                address: document.getElementById('address').value,
                passport: document.getElementById('passport').value,
                drivingLicense: document.getElementById('driving-license').value,
                skills: document.getElementById('skills').value,
                experience: document.getElementById('experience').value,
                education: document.getElementById('education').value
            };
            var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'resume.json';
            a.click();
            URL.revokeObjectURL(url);
        });
    }
    // Print Button Functionality
    var printButton = document.getElementById('print-btn');
    if (printButton) {
        printButton.addEventListener('click', function () {
            window.print();
        });
    }
    // Function to gather form data
    function gatherFormData() {
        var profilePicInput = document.getElementById('profile-pic');
        var profilePicFile = profilePicInput.files && profilePicInput.files.length > 0
            ? URL.createObjectURL(profilePicInput.files[0])
            : '';
        return {
            profilepic: profilePicFile,
            firstName: document.getElementById('first-name').value,
            middleName: document.getElementById('middle-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            dob: document.getElementById('dob').value,
            address: document.getElementById('address').value,
            passport: document.getElementById('passport').value,
            drivingLicense: document.getElementById('driving-license').value,
            skills: document.getElementById('skills').value,
            experience: document.getElementById('experience').value,
            education: document.getElementById('education').value
        };
    }
    // Open Tab Button Functionality
    var openTabButton = document.getElementById('open-tab-btn');
    if (openTabButton) {
        openTabButton.addEventListener('click', function () {
            var formData = gatherFormData();
            var newWindow = window.open('', '_blank');
            if (newWindow) {
                newWindow.document.write("\n                    <html>\n                    <head>\n                        <title>Resume</title>\n                        <style>\n                            body {\n                                font-family: Arial, sans-serif;\n                                background-color: #c9ebce;\n                                color: #000;\n                            }\n                            .container {\n                                width: 80vw;\n                                padding: 5vw;\n                                background: #dffae3;\n                                margin: auto;\n                                border-radius: 8px;\n                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n                            }\n                            .header {\n                                text-align: left;\n                                margin-bottom: 20px;\n                            }\n                            .profile img {\n                                width: 8vw;\n                                height: 11vw;\n                            }\n                            .profile h1 {\n                                font-size: 28px;\n                                color: #333;\n                                margin: 10px 0 0;\n                            }\n                            .section {\n                                margin-bottom: 20px;\n                                padding: 10px;\n                                border-radius: 5px;\n                                background: #f9f9f9;\n                            }\n                            .section h2 {\n                                background-color: #a1c1a6;\n                                color: #fff;\n                                padding: 10px;\n                                border-radius: 5px;\n                                font-size: 20px;\n                            }\n                            .section div {\n                                margin-bottom: 10px;\n                            }\n                            .section label {\n                                display: block;\n                                font-weight: bold;\n                            }\n                            .section p {\n                                margin: 8px 0;\n                                padding: 8px;\n                                border-radius: 4px;\n                                border: 1px solid #ddd;\n                                box-sizing: border-box;\n                                background: #fff;\n                            }\n                        </style>\n                    </head>\n                    <body>\n                        <div class=\"container\">\n                            <header class=\"header\">\n                                <div class=\"profile\">\n                                    <div class=\"profile-pic\">\n                                        ".concat(formData.profilepic ? "<img src=\"".concat(formData.profilepic, "\" alt=\"Profile Picture\">") : '<p>No profile picture available</p>', "\n                                    </div>\n                                    <h1>").concat(formData.firstName, " ").concat(formData.middleName ? formData.middleName + ' ' : '').concat(formData.lastName, "</h1>\n                                </div>\n                            </header>\n                            <main class=\"main-content\">\n                                <div class=\"section\">\n                                    <h2>Personal Information</h2>\n                                    <div>\n                                        <label>Email:</label>\n                                        <p>").concat(formData.email, "</p>\n                                    </div>\n                                    <div>\n                                        <label>Date of Birth:</label>\n                                        <p>").concat(formData.dob, "</p>\n                                    </div>\n                                    <div>\n                                        <label>Address:</label>\n                                        <p>").concat(formData.address, "</p>\n                                    </div>\n                                    <div>\n                                        <label>Passport:</label>\n                                        <p>").concat(formData.passport, "</p>\n                                    </div>\n                                    <div>\n                                        <label>Driving License:</label>\n                                        <p>").concat(formData.drivingLicense, "</p>\n                                    </div>\n                                </div>\n                                <div class=\"section\">\n                                    <h2>Skills</h2>\n                                    <p>").concat(formData.skills, "</p>\n                                </div>\n                                <div class=\"section\">\n                                    <h2>Experience</h2>\n                                    <p>").concat(formData.experience, "</p>\n                                </div>\n                                <div class=\"section\">\n                                    <h2>Education</h2>\n                                    <p>").concat(formData.education, "</p>\n                                </div>\n                            </main>\n                        </div>\n                    </body>\n                    </html>\n                "));
                newWindow.document.close();
            }
        });
    }
});

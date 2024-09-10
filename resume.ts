import { PDFDocument, rgb } from 'pdf-lib';

document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('save') as HTMLButtonElement;
    const downloadButton = document.getElementById('download') as HTMLButtonElement;
    const editButton = document.getElementById('edit') as HTMLButtonElement;
    const copyLinkButton = document.getElementById('copyLink') as HTMLButtonElement;

    const firstNameInput = document.getElementById('firstName') as HTMLInputElement;
    const middleNameInput = document.getElementById('middleName') as HTMLInputElement;
    const lastNameInput = document.getElementById('lastName') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const skillsInput = document.getElementById('skills') as HTMLTextAreaElement;
    const experienceInput = document.getElementById('experience') as HTMLTextAreaElement;
    const educationInput = document.getElementById('education') as HTMLTextAreaElement;

    const fullNameDisplay = document.getElementById('fullName') as HTMLParagraphElement;
    const emailDisplay = document.getElementById('emailDisplay') as HTMLParagraphElement;
    const phoneDisplay = document.getElementById('phoneDisplay') as HTMLParagraphElement;
    const skillsDisplay = document.getElementById('skillsDisplay') as HTMLParagraphElement;
    const experienceDisplay = document.getElementById('experienceDisplay') as HTMLParagraphElement;
    const educationDisplay = document.getElementById('educationDisplay') as HTMLParagraphElement;
    const profilePictureDisplay = document.getElementById('profilePictureDisplay') as HTMLImageElement;
    const profilePicturePreview = document.getElementById('profilePicturePreview') as HTMLImageElement;
    const shareLinkInput = document.getElementById('shareLink') as HTMLInputElement;

    let uniqueId: string = '';

    // Generate a unique ID for the resume
    function generateUniqueId(): string {
        return 'resume-' + Math.random().toString(36).substr(2, 9);
    }

    // Update the resume display with the current input values
    function updateResume() {
        const fullName = `${firstNameInput.value} ${middleNameInput.value} ${lastNameInput.value}`;
        fullNameDisplay.textContent = `Full Name: ${fullName}`;
        emailDisplay.textContent = `Email: ${emailInput.value}`;
        phoneDisplay.textContent = `Phone Number: ${phoneInput.value}`;
        skillsDisplay.textContent = `Skills: ${skillsInput.value}`;
        experienceDisplay.textContent = `Work Experience: ${experienceInput.value}`;
        educationDisplay.textContent = `Education: ${educationInput.value}`;
        
        if (profilePictureInput.files && profilePictureInput.files.length > 0) {
            const file = profilePictureInput.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                profilePicturePreview.src = event.target?.result as string;
                profilePicturePreview.style.display = 'block';
                profilePictureDisplay.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    // Save the resume and generate a unique URL
    saveButton.addEventListener('click', () => {
        if (!uniqueId) {
            uniqueId = generateUniqueId();
        }
        updateResume();
        const baseURL = window.location.origin;
        shareLinkInput.value = `${baseURL}/${uniqueId}`;
    });

    // Download the resume as PDF
    downloadButton.addEventListener('click', async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);
        const { height } = page.getSize();
        
        const titleFontSize = 24;
        const regularFontSize = 12;
        
        // Add title
        page.drawText('Resume', {
            x: 50,
            y: height - 50,
            size: titleFontSize,
            color: rgb(0, 0, 0),
        });
        
        // Add resume content
        page.drawText(`Full Name: ${fullNameDisplay.textContent}`, {
            x: 50,
            y: height - 100,
            size: regularFontSize,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Email: ${emailDisplay.textContent}`, {
            x: 50,
            y: height - 120,
            size: regularFontSize,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Phone Number: ${phoneDisplay.textContent}`, {
            x: 50,
            y: height - 140,
            size: regularFontSize,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Skills: ${skillsDisplay.textContent}`, {
            x: 50,
            y: height - 160,
            size: regularFontSize,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Work Experience: ${experienceDisplay.textContent}`, {
            x: 50,
            y: height - 180,
            size: regularFontSize,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Education: ${educationDisplay.textContent}`, {
            x: 50,
            y: height - 200,
            size: regularFontSize,
            color: rgb(0, 0, 0),
        });

        // Serialize the PDF document to bytes
        const pdfBytes = await pdfDoc.save();

        // Trigger the download
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Re-edit button functionality
    editButton.addEventListener('click', () => {
        firstNameInput.focus();
    });

    // Copy the shareable link to the clipboard
    copyLinkButton.addEventListener('click', () => {
        shareLinkInput.select();
        document.execCommand('copy');
        alert('Shareable link copied to clipboard!');
    });

    // Update the resume display initially
    updateResume();
});

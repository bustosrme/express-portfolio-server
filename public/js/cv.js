let resumeButton = document.getElementById('resume-button')
let scrollBtn = document.getElementById('scrollBtn')

scrollBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

resumeButton.addEventListener('click', () => {
    window.location.href = "/download/cv";
})
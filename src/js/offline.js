const alert = (message = "Message :", color = "green") =>{
    document.querySelector(".alert").style.display = "block"
    document.querySelector(".alert").innerText = message
    document.querySelector(".alert").style.backgroundColor = `var(--${color})`

    setTimeout(() => {
        document.querySelector(".alert").innerText = message
        document.querySelector(".alert").style.display = "none"
        document.querySelector(".alert").style.backgroundColor = `var(--${color})`
    }, 3000)

}

console.log('Initially ' + (window.navigator.onLine ? 'on' : 'off') + 'line');
window.addEventListener('online', () => {
    console.log('Became online')
    alert("You Are Online")
});
window.addEventListener('offline', () => {
    console.log('Became offline')
    alert("You Are Offline")
    window.location.href = "./offline.html"
});

const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const generateBtn = document.querySelector("button")
const passwordEl1 = document.getElementById("password-el-1")
const passwordEl2 = document.getElementById("password-el-2")

function generateRandomPassword() {
    let lengthInput = document.getElementById("length-input")
    let passwordLength = parseInt(lengthInput.value)

    let password = ""
    for (let i = 0; i < passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length)
        password += characters[randomIndex]
    }
    return password
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log("Password copied to clipboard!")
    }).catch(function(error) {
        console.log("Failed to copy: ", error)
    })
}

generateBtn.addEventListener("click", function() {
    let passwordOne = generateRandomPassword()
    let passwordTwo = generateRandomPassword()
    
    passwordEl1.textContent = passwordOne
    passwordEl2.textContent = passwordTwo
})

passwordEl1.addEventListener("click", function() {
    copyToClipboard(passwordEl1.textContent)
})

passwordEl2.addEventListener("click", function() {
    copyToClipboard(passwordEl2.textContent)
})

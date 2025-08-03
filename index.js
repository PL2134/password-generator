/* ================================
   CHARACTER SETS FOR PASSWORD GENERATION
   ================================ */

// Letters (uppercase and lowercase) - always included in passwords
const letterCharacters = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
]

// Numbers 0-9 - optional (controlled by toggle)
const numberCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

// Special symbols - optional (controlled by toggle)
const symbolCharacters = [
    "~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=",
    "{","[","}","]",",","|",":",";","<",">",".","?","/"
]

/* ================================
   DOM ELEMENT REFERENCES
   ================================ */

// Get references to all interactive elements (done once for efficiency)
const generateBtn = document.querySelector("button")                    // Generate button
const passwordEl1 = document.getElementById("password-el-1")            // First password box
const passwordEl2 = document.getElementById("password-el-2")            // Second password box
const lengthInput = document.getElementById("length-input")             // Length input field

/* ================================
   CORE FUNCTIONALITY - PASSWORD GENERATION
   ================================ */

/**
 * Generates a random password based on user preferences
 * @returns {string} A randomly generated password
 */
function generateRandomPassword() {
    // Get desired password length from user input
    let passwordLength = parseInt(lengthInput.value)
    
    // Start with letters (always included for security)
    let availableCharacters = [...letterCharacters] // Create copy to avoid modifying original
    
    // Add numbers if user has enabled the toggle
    if (document.getElementById("include-numbers").checked) {
        availableCharacters = availableCharacters.concat(numberCharacters)
    }
    
    // Add symbols if user has enabled the toggle
    if (document.getElementById("include-symbols").checked) {
        availableCharacters = availableCharacters.concat(symbolCharacters)
    }
    
    // Build password character by character
    let password = ""
    for (let i = 0; i < passwordLength; i++) {
        // Get random index within available characters array
        let randomIndex = Math.floor(Math.random() * availableCharacters.length)
        // Add the randomly selected character to password
        password += availableCharacters[randomIndex]
    }
    
    return password
}

/* ================================
   CLIPBOARD FUNCTIONALITY
   ================================ */

/**
 * Copies text to user's clipboard with fallback support
 * @param {string} text - The text to copy to clipboard
 */
function copyToClipboard(text) {
    // Try modern Clipboard API first (works in secure contexts)
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(function() {
                console.log("Password copied to clipboard!")
            })
            .catch(function(error) {
                console.log("Clipboard API failed, trying fallback...")
                fallbackCopy(text) // Use backup method if modern API fails
            })
    } else {
        // Use fallback method for older browsers or insecure contexts
        fallbackCopy(text)
    }
}

/**
 * Fallback clipboard copy method for broader browser support
 * @param {string} text - The text to copy to clipboard
 */
function fallbackCopy(text) {
    // Create temporary text area element
    const textArea = document.createElement("textarea")
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select() // Select all text in the temporary element
    
    try {
        // Use older execCommand method to copy
        document.execCommand('copy')
        console.log("Password copied using fallback method!")
    } catch (error) {
        console.log("Copy failed:", error)
    }
    
    // Clean up - remove temporary element
    document.body.removeChild(textArea)
}

/* ================================
   EVENT LISTENERS - USER INTERACTIONS
   ================================ */

// Generate button click handler
generateBtn.addEventListener("click", function() {
    // Generate two different random passwords
    let passwordOne = generateRandomPassword()
    let passwordTwo = generateRandomPassword()
    
    // Display passwords in their respective boxes
    passwordEl1.textContent = passwordOne
    passwordEl2.textContent = passwordTwo
})

// First password box click handler - copy to clipboard
passwordEl1.addEventListener("click", function() {
    // Only copy if there's actually a password to copy
    if (passwordEl1.textContent) {
        copyToClipboard(passwordEl1.textContent)
    }
})

// Second password box click handler - copy to clipboard
passwordEl2.addEventListener("click", function() {
    // Only copy if there's actually a password to copy
    if (passwordEl2.textContent) {
        copyToClipboard(passwordEl2.textContent)
    }
})
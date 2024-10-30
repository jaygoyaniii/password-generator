import { useState } from "react"; // Import useState hook from React
import "./App.css"; // Import the CSS for styling
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast for notifications
import "react-toastify/dist/ReactToastify.min.css"; // Import Toastify CSS
import { UC, LC, NC, SC } from "./Data/PassChar"; // Import character sets for password generation

function App() {
  // State variables to track user's selections and generated password
  let [uppercase, setUppercase] = useState(false); // Track if uppercase letters are included
  let [lowercase, setLowercase] = useState(false); // Track if lowercase letters are included
  let [numbers, setNumbers] = useState(false); // Track if numbers are included
  let [symbols, setSymbols] = useState(false); // Track if symbols are included
  let [passLength, setPassLength] = useState(10); // Track password length, default is 10
  let [finalPass, finalsetPass] = useState(""); // Track the final generated password

  // Function to generate the password based on user's selections
  let generatePassword = () => {
    let generatedPass = ""; // Initialize the generated password
    let charSet = ""; // Initialize the character set based on user selections

    // Check if at least one checkbox is selected
    if (uppercase || lowercase || numbers || symbols) {
      // Append selected character types to charSet
      if (uppercase) charSet += UC; // Add uppercase letters if selected
      if (lowercase) charSet += LC; // Add lowercase letters if selected
      if (numbers) charSet += NC; // Add numbers if selected
      if (symbols) charSet += SC; // Add symbols if selected

      // Generate password by randomly selecting characters from charSet
      for (let i = 0; i < passLength; i++) {
        generatedPass += charSet.charAt(
          Math.floor(Math.random() * charSet.length)
        ); // Randomly select a character
      }
      finalsetPass(generatedPass); // Set the generated password to finalPass
    } else {
      // Notify the user to select at least one option
      toast.info("Please select at least one option", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Function to copy the generated password to the clipboard
  let copyPass = () => {
    navigator.clipboard.writeText(finalPass); // Copy finalPass to clipboard
    // Notify the user that the password has been copied
    toast.success("Password copied to clipboard!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer /> {/* Render ToastContainer for notifications */}
      <div className="passwordBox">
        <h3>Random Password Generator</h3>
        <div className="passwordBoxIn">
          <input type="text" readOnly value={finalPass} />{" "}
          {/* Display the generated password */}
          <button onClick={copyPass}>Copy</button>{" "}
          {/* Button to copy the password */}
        </div>
        <div className="passLength">
          <label>Password Length</label>
          <input
            type="number"
            max={20} // Maximum length of password
            min={10} // Minimum length of password
            value={passLength} // Controlled input for password length
            onChange={(e) => setPassLength(e.target.value)} // Update passLength state on change
          />
        </div>
        <div className="passLength">
          <label>Include uppercase letters</label>
          <input
            type="checkbox"
            checked={uppercase} // Controlled checkbox for uppercase
            onChange={(e) => setUppercase(!uppercase)} // Toggle uppercase state
          />
        </div>
        <div className="passLength">
          <label>Include lowercase letters</label>
          <input
            type="checkbox"
            checked={lowercase} // Controlled checkbox for lowercase
            onChange={(e) => setLowercase(!lowercase)} // Toggle lowercase state
          />
        </div>
        <div className="passLength">
          <label>Include Numbers</label>
          <input
            type="checkbox"
            checked={numbers} // Controlled checkbox for numbers
            onChange={(e) => setNumbers(!numbers)} // Toggle numbers state
          />
        </div>
        <div className="passLength">
          <label>Include Symbols</label>
          <input
            type="checkbox"
            checked={symbols} // Controlled checkbox for symbols
            onChange={(e) => setSymbols(!symbols)} // Toggle symbols state
          />
        </div>
        <button className="btn" onClick={generatePassword}>
          {" "}
          {/* Button to generate password */}
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App; // Export the App component

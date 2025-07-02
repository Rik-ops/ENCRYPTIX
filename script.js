let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;

        if (value === '=') {
            try {
                // Avoid eval for empty string or invalid ends
                if (string.trim() === "" || /[\+\-\*\/\.]$/.test(string)) {
                    input.value = "Error";
                    string = "";
                } else {
                    string = eval(string).toString();  // Eval used for simplicity
                    input.value = string;
                }
            } catch (err) {
                input.value = "Error";
                string = "";
            }
        } else if (value === 'AC') {
            string = "";
            input.value = string;
        } else if (value === 'DEL') {
            string = string.slice(0, -1);
            input.value = string;
        } else {
            // Prevent consecutive operators or multiple dots
            const lastChar = string.slice(-1);
            if (
                (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(value)) ||
                (lastChar === '.' && value === '.')
            ) {
                return; // skip invalid input
            }

            string += value;
            input.value = string;
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search");
    const resultsContainer = document.getElementById("results");
    const errorContainer = document.getElementById("error");

    // Fetch the JSON data
    fetch('answers.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Store data in a variable
            const questionsAndAnswers = data;

            // Function to display results
            function displayResults(results) {
                resultsContainer.innerHTML = '';
                results.forEach(result => {
                    const resultDiv = document.createElement('div');
                    resultDiv.classList.add('result');
                    
                    const questionDiv = document.createElement('div');
                    questionDiv.classList.add('question');
                    questionDiv.textContent = result.Question;
                    
                    const answerDiv = document.createElement('div');
                    answerDiv.classList.add('answer');
                    answerDiv.textContent = result.Answer;
                    
                    resultDiv.appendChild(questionDiv);
                    resultDiv.appendChild(answerDiv);
                    resultsContainer.appendChild(resultDiv);
                });
            }

            // Event listener for search input
            searchInput.addEventListener('input', function() {
                const query = searchInput.value.toLowerCase();
                const filteredResults = questionsAndAnswers.filter(qa => 
                    qa.Question.toLowerCase().includes(query) || 
                    qa.Answer.toLowerCase().includes(query)
                );
                displayResults(filteredResults);
            });

            // Display all results initially
            displayResults(questionsAndAnswers);
        })
        .catch(error => {
            errorContainer.innerText = 'Failed to fetch data: ' + error.message;
            console.error('Error fetching the JSON data:', error);
        });
});
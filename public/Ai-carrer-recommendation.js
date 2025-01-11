const API_KEY = 'AIzaSyAqnedwm6RPYv0OO4Q5FBNDDCIyHWmfyJU';
document.getElementById('career-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get form data
    const educationLevel = document.getElementById('education-level').value;
    const fieldOfStudy = document.getElementById('field-of-study').value;
    const careerStage = document.getElementById('career-stage').value;
    const goals = document.getElementById('goals').value;
    const constraints = document.getElementById('constraints').value;

    // Prepare request data for the Gemini API
    const requestData = {
        contents: [{
            parts: [{
                text: `Provide career recommendations based on the following details:\n
                    Education Level: ${educationLevel}\n
                    Field of Study: ${fieldOfStudy}\n
                    Career Stage: ${careerStage}\n
                    Goals: ${goals}\n
                    Constraints: ${constraints}`
            }]
        }]
    };

    console.log('Request Data:', requestData); // Log the data being sent to API

    try {
        // Make the request to the Gemini API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        // Handle the response
        if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data); // Log the API response

            // Check if the response contains career recommendations
            if (data.candidates && data.candidates.length > 0) {
                // Extract the recommendation text
                let recommendationText = data.candidates[0].content.parts[0].text || 'No content available';

                
                recommendationText = recommendationText.replace(/\*/g, ''); // Remove stars

                // Display the sanitized recommendation text
                document.getElementById('recommendation-text').textContent = recommendationText;
            } else {
                document.getElementById('recommendation-text').textContent = 'No recommendations available at this time.';
            }
        } else {
            const errorData = await response.json();
            console.log('Error Data:', errorData); // Log error details
            document.getElementById('recommendation-text').textContent = 'Sorry, we could not fetch recommendations at this time.';
        }
    } catch (error) {
        console.log('Error:', error); // Log any network error
        document.getElementById('recommendation-text').textContent = 'An error occurred while fetching recommendations.';
    }
});

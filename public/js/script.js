document.getElementById('courseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const topics = document.getElementById('topics').value.split(',').map(topic => topic.trim());
    const outputElement = document.getElementById('courseContent');
    
    outputElement.innerHTML = '<p>Generating course...</p>';
    
    try {
        const response = await fetch('/api/generate-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topics }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let content = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            content += decoder.decode(value, { stream: true });
            outputElement.innerHTML = content;
        }
    } catch (error) {
        outputElement.innerHTML = '<p class="error">An error occurred while generating the course.</p>';
        console.error('Error:', error);
    }
});
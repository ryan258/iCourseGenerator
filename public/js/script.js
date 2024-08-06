document.getElementById('courseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const topics = document.getElementById('topics').value.split(',').map(topic => topic.trim());
    const outputElement = document.getElementById('courseContent');
    
    outputElement.textContent = 'Generating course...';
    
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
            outputElement.textContent = content;
        }
    } catch (error) {
        outputElement.textContent = 'An error occurred while generating the course.';
        console.error('Error:', error);
    }
});
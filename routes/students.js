const Student = require('../models/Student');

// Helper function to format ID
function formatId(num) {
    return 'STU-' + String(num).padStart(3, '0');
}

async function handleStudentRoutes(req, res) {
    const url = req.url;
    const method = req.method;
    
    console.log(" API Route check:", method, url);

    // GET all students
    if (url === '/api/students' && method === 'GET') {
        console.log(" Fetching all students...");
        try {
            const students = await Student.find().sort({ id: 1 });
            console.log(` Found ${students.length} students`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(students));
        } catch (error) {
            console.error(" Error fetching students:", error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
        return true;
    }

    // POST new student
    if (url === '/api/students' && method === 'POST') {
        console.log(" Adding new student...");
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const studentData = JSON.parse(body);
                console.log(" Student data:", studentData);
                
                // Get the highest current ID
                const lastStudent = await Student.findOne().sort({ id: -1 });
                const nextId = lastStudent ? lastStudent.id + 1 : 1;
                console.log(" Next ID:", nextId);
                
                const student = new Student({
                    ...studentData,
                    id: nextId,
                    idString: formatId(nextId)
                });
                
                const newStudent = await student.save();
                console.log(" Student saved:", newStudent.idString);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newStudent));
            } catch (error) {
                console.error(" Error saving student:", error);
                if (error.code === 11000) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Duplicate student ID' }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: error.message }));
                }
            }
        });
        return true;
    }

    // DELETE student by ID
    if (url.startsWith('/api/students/') && method === 'DELETE') {
        const id = parseInt(url.split('/')[3]);
        console.log(" Deleting student with ID:", id);
        try {
            const student = await Student.findOneAndDelete({ id: id });
            if (!student) {
                console.log(" Student not found:", id);
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Student not found' }));
            } else {
                console.log(" Student deleted:", student.idString);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Student deleted successfully' }));
            }
        } catch (error) {
            console.error(" Error deleting student:", error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
        return true;
    }

    return false; // Not an API route
}

module.exports = { handleStudentRoutes };
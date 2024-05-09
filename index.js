const http = require('http');
const fs = require('fs');
const { log } = require('console');



http.createServer(
  (req,res)=>{
    if(req.url == '/addStudent' && req.method == 'POST'){                     //^------>  add new student
       let parsedData = '';

       req.on('data',(chunk)=>{
        parsedData = JSON.parse(chunk);
       });

       req.on('end',()=>{
        const students = JSON.parse(fs.readFileSync('./files/student.json'));
        const isEmailExists = students.find((student)=> student.email == parsedData.email);
        const isIDExists = students.find((student)=> student.id == parsedData.id);

        if(isEmailExists && isIDExists){
            res.write('ID or Email already exists');
            return res.end();
        }
        //! data valdition
        if(parsedData.id && parsedData.email && parsedData.name && parsedData.password && parsedData.departmentID){        
            students.push(parsedData);
            fs.writeFileSync('./files/student.json',JSON.stringify(students));
            res.write('Added Successfully');
            res.end();
        }else{
            res.end("initialize all fields");
        }
       
       })

       
    }else if(req.url == '/getAllStudents' && req.method == 'GET'){            //^------>  get all students 
        const students = fs.readFileSync('./files/student.json');
        res.end(JSON.stringify(JSON.parse(students)));         
    }else if(req.url == '/deleteStudent' && req.method == 'DELETE'){          //^------>  delete student by it's ID
        let parsedData = '';

        req.on('data',(chunk)=>{
         parsedData = JSON.parse(chunk);
        });

        req.on('end',()=>{
            const students = JSON.parse(fs.readFileSync('./files/student.json'));
            const isIDExists = students.find((student)=> student.id == parsedData.id);

            if(isIDExists){
                let index=0;
                for(i=0;i<students.length;i++){
                    if(students[i].id == parsedData.id){
                        index=i;
                        break;
                    }
                }
                
                students.splice(i,1);
                fs.writeFileSync('./files/student.json',JSON.stringify(students));
                res.write('Deleted Successfully');
                res.end();
                    
            }else {
                res.write("Can't find Student by this Email or ID");
                return res.end();
            }
            
           })
 
    }else if(req.url == '/updateStudent' && req.method == 'PUT'){             //^------>  update student data by it's ID
        let parsedData = '';

        req.on('data',(chunk)=>{
            parsedData = JSON.parse(chunk);
        })

        req.on('end',()=>{
            const students = JSON.parse(fs.readFileSync('./files/student.json'));
            const isIDExists = students.find((student)=> student.id == parsedData.id);

            if(isIDExists){
                let index=0;
                for(i=0;i<students.length;i++){
                    if(students[i].id == parsedData.id){
                        index=i;
                        break;
                    }
                }
                if(parsedData.id && parsedData.name && parsedData.email && parsedData.password && parsedData.daprtmentID){

                    students[index].id = parsedData.id;
                    students[index].name = parsedData.name;
                    students[index].email = parsedData.email;
                    students[index].password = parsedData.password;
                    students[index].daprtmentID = parsedData.daprtmentID;
                    
                    fs.writeFileSync('./files/student.json',JSON.stringify(students));
                    res.write('Updated Successfully');
                    res.end();
                }else{
                    return res.end("initialize all fields");
                }
                
            }else {
                return res.end("this ID doesn't Exists");
            }
        })

    }else if(req.url == '/searchForStudentByID' && req.method == 'GET'){      //^------>  search for a student by it's ID
        let parsedData = '';

        req.on('data',(chunk)=>{
            parsedData = JSON.parse(chunk);
        });

        req.on('end',()=>{
            const students = JSON.parse(fs.readFileSync('./files/student.json'));
            const isIDExists = students.find((student)=> student.id == parsedData.id);
            
            if(isIDExists){
                let index=0;
                for(i=0;i<students.length;i++){
                    if(students[i].id == parsedData.id){
                        index=i;
                        break;
                    }
                }
                  res.end(JSON.stringify(students[index]));
            }else{
                  res.end("Can't find this ID");
            }
        });
        
        
    }
    else if(req.url == '/addCourse' && req.method == 'POST'){                 //^------>  add new course 
        let parsedData = '';

       req.on('data',(chunk)=>{
        parsedData = JSON.parse(chunk);
       });

       req.on('end',()=>{
        const courses = JSON.parse(fs.readFileSync('./files/courses.json'));
        const isNameExists = courses.find((course)=> course.name == parsedData.name);
        const isIDExists = courses.find((course)=> course.id == course.id);

        if(isNameExists && isIDExists){
            res.write('ID or Name already exists');
            return res.end();
        }
        //! data Validation
        if(parsedData.id && parsedData.name && parsedData.content && parsedData.departmentID){                             
            courses.push(parsedData);
            fs.writeFileSync('./files/courses.json',JSON.stringify(courses));
            res.write('Added Successfully');
            res.end();
        }else{
            res.end('initialize all fields');
        }
        
       })

    }else if(req.url == '/getAllCourses' && req.method == 'GET'){             //^------>  get all courses
        const courses = fs.readFileSync('./files/courses.json');
        res.end(JSON.stringify(JSON.parse(courses)));
    }else if(req.url == '/deleteCourse' && req.method == 'DELETE'){           //^------>  delete course by it's ID
        let parsedData = '';

        req.on('data',(chunk)=>{
         parsedData = JSON.parse(chunk);
        });

        req.on('end',()=>{
            const courses = JSON.parse(fs.readFileSync('./files/courses.json'));
            const isIDExists = courses.find((course)=> course.id == parsedData.id);

            if(isIDExists){
                let index=0;
                for(i=0;i<courses.length;i++){
                    if(courses[i].id == parsedData.id){
                        index=i;
                        break;
                    }
                }
                courses.splice(i,1);
                fs.writeFileSync('./files/courses.json',JSON.stringify(courses));
                res.write('Deleted Successfully');
                res.end();
                    
            }else {
                res.write("Can't find Course by this Name or ID");
                return res.end();
            }
            
           })
 
    }else if(req.url == '/updateCourse' && req.method == 'PUT'){              //^------>  update course data by it's ID
        let parsedData = '';

        req.on('data',(chunk)=>{
            parsedData = JSON.parse(chunk);
        })

        req.on('end',()=>{
            const courses = JSON.parse(fs.readFileSync('./files/courses.json'));
            const isIDExists = courses.find((course)=> course.id == course.id);

            if(isIDExists){
                let index=0;
                for(i=0;i<courses.length;i++){
                    if(courses[i].id == parsedData.id){
                        index=i;
                        break;
                    }
                }
                if(parsedData.id && parsedData.name && parsedData.content && parsedData.daprtmentID){

                    courses[index].id = parsedData.id;
                    courses[index].name = parsedData.name;
                    courses[index].content = parsedData.content;
                    courses[index].daprtmentID = parsedData.daprtmentID;
                    
                    fs.writeFileSync('./files/courses.json',JSON.stringify(courses));
                    res.write('Updated Successfully');
                    res.end();
                }else{
                    return res.end("initialize all fields");
                }
                
            }else {
                return res.end("this ID doesn't Exists");
            }
        })

    }else if(req.url == '/searchForCourseByID' && req.method == 'GET'){       //^------>  search for a course by it's ID
        let parsedData = '';

        req.on('data',(chunk)=>{
            parsedData = JSON.parse(chunk);
        });

        req.on('end',()=>{
            const courses = JSON.parse(fs.readFileSync('./files/courses.json'));
            const isIDExists = courses.find((course)=> course.id == parsedData.id);
            
            if(isIDExists){
                let index=0;
                for(i=0;i<courses.length;i++){
                    if(courses[i].id == parsedData.id){
                        index=i;
                        break;
                    }
                }
                  res.end(JSON.stringify(courses[index]));
            }else{
                  res.end("Can't find this ID");
            }
        });
        
        
    }
    else if(req.url == '/addDepartment' && req.method == 'POST'){             //^------>  add new department 
        let parsedData = '';

       req.on('data',(chunk)=>{
        parsedData = JSON.parse(chunk);
       });

       req.on('end',()=>{
        const departments = JSON.parse(fs.readFileSync('./files/department.json'));
        const isNameExists = departments.find((department)=> department.name == parsedData.name);
        const isIDExists = departments.find((department)=> department.id == parsedData.id);

        if(isNameExists && isIDExists){
            res.write('ID or Name already exists');
            return res.end();
        }
        //! data Validation
        if(parsedData.id && parsedData.name){                             
            departments.push(parsedData);
            fs.writeFileSync('./files/department.json',JSON.stringify(departments));
            res.write('Added Successfully');
            res.end();
        }else{
            res.end('ID & Name must be initialized');
        }
        
       })

    }else if(req.url == '/getAllDepartments' && req.method == 'GET'){         //^------>  get all departments 
        const departments = fs.readFileSync('./files/department.json');
        res.end(JSON.stringify(JSON.parse(departments)));
    }else if(req.url == '/deleteDepartment' && req.method == 'DELETE'){       //^------>  delete department by it's ID
        let parsedData = '';

        req.on('data',(chunk)=>{
         parsedData = JSON.parse(chunk);
        });

        req.on('end',()=>{
            const departments = JSON.parse(fs.readFileSync('./files/department.json'));
            const isIDExists = departments.find((department)=> department.id == parsedData.id);

            if(isIDExists){
                let index=0;
                for(i=0;i<departments.length;i++){
                    if(departments[i].id == parsedData.id){
                        index=i;
                        break;
                    }
                }}
                departments.splice(i,1);
                fs.writeFileSync('./files/department.json',JSON.stringify(departments));
                res.write('Deleted Successfully');
                res.end();
        });
    }else if(req.url == '/updateDepartment' && req.method == 'PUT'){          //^------>  update department data by it's ID
        let parsedData = '';

        req.on('data',(chunk)=>{
            parsedData = JSON.parse(chunk);
        })

        req.on('end',()=>{
            const departments = JSON.parse(fs.readFileSync('./files/department.json'));
            const isIDExists = departments.find((department)=> department.id == department.id);

            if(isIDExists){
                let index=0;
                for(i=0;i<departments.length;i++){
                    if(departments[i].id == parsedData.id){
                        index=i;
                        break;
                    }
                }
                if(parsedData.id && parsedData.name){

                    departments[index].id = parsedData.id;
                    departments[index].name = parsedData.name;
             
                    
                    fs.writeFileSync('./files/dapartment.json',JSON.stringify(departments));
                    res.write('Updated Successfully');
                    res.end();
                }else{
                    return res.end("initialize all fields");
                }
                
            }else {
                return res.end("this ID doesn't Exists");
            }
        })

    }else if(req.url == '/searchForDepartmentByID' && req.method == 'GET'){   //^------>  search for a department by it's ID
        let parsedData = '';

        req.on('data',(chunk)=>{
            parsedData = JSON.parse(chunk);
        });

        req.on('end',()=>{
            const departments = JSON.parse(fs.readFileSync('./files/department.json'));
            const isIDExists = departments.find((department)=> department.id == parsedData.id);
            
            if(isIDExists){
                let index=0;
                for(i=0;i<departments.length;i++){
                    if(departments[i].id == parsedData.id){
                        index=i;
                        break;
                    }
                }
                  res.end(JSON.stringify(departments[index]));
            }else{
                  res.end("Can't find this ID");
            }
        });
        
        
    }                                                                         //^------>  get all students with
                                                                              //^         their departments & courses
    else if(req.url == '/getAllStudentsWithTheirDepartment&Courses' && req.method == 'GET'){
        const students = JSON.parse(fs.readFileSync('./files/student.json')); 
        const courses =  JSON.parse(fs.readFileSync('./files/courses.json')); 
        const departments = JSON.parse(fs.readFileSync('./files/department.json')); 

        const result= students;
        for(i=0;i<students.length;i++){
           const departmentDetails = departments.find((e)=> e.id == students[i].departmentID);
           const courseDetails = courses.filter((e)=> e.departmentID == students[i].departmentID);
          
           result[i] = {
             "id":students[i].id,
             "name":students[i].name,
             "email":students[i].email,
             "password":students[i].password,
             "department": departmentDetails,
             "courses": courseDetails
           };
        }
        res.end(JSON.stringify(result)); 
    }                        
    else {
        res.write('Not found');
        res.end();
    }
  }
).listen(3000, ()=> console.log('Server is running on port 3000')); //local host

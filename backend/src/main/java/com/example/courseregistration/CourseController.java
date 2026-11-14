package com.example.courseregistration;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {
    private final CourseRepository courses;
    public CourseController(CourseRepository courses) { this.courses = courses; }

    @GetMapping
    public List<Course> all() { return courses.findAll(); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course add(@Valid @RequestBody Course course) {
        course.setName(course.getName().trim());
        course.setDuration(course.getDuration().trim());
        return courses.save(course);
    }
}

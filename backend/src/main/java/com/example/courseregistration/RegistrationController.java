package com.example.courseregistration;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {
    private final RegistrationRepository registrations;
    private final CourseRepository courses;

    public RegistrationController(RegistrationRepository registrations, CourseRepository courses) {
        this.registrations = registrations; this.courses = courses;
    }

    @GetMapping
    public List<StudentRegistration> all() { return registrations.findAll(); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StudentRegistration register(@Valid @RequestBody RegistrationRequest request) {
        Course course = courses.findById(request.getCourseId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Selected course was not found"));
        return registrations.save(new StudentRegistration(
            request.getStudentName().trim(), request.getEmail().trim(), course));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancel(@PathVariable Long id) {
        if (!registrations.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Registration was not found");
        }
        registrations.deleteById(id);
    }
}

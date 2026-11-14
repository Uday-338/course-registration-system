package com.example.courseregistration;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_registrations")
public class StudentRegistration {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String email;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(nullable = false)
    private LocalDateTime registeredAt = LocalDateTime.now();

    public StudentRegistration() {}
    public StudentRegistration(String studentName, String email, Course course) {
        this.studentName = studentName; this.email = email; this.course = course;
        this.registeredAt = LocalDateTime.now();
    }
    public Long getId() { return id; }
    public String getStudentName() { return studentName; }
    public String getEmail() { return email; }
    public Course getCourse() { return course; }
    public LocalDateTime getRegisteredAt() { return registeredAt; }
}

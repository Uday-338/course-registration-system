package com.example.courseregistration;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Course {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Course name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Course duration is required")
    @Column(nullable = false)
    private String duration;

    public Course() {}
    public Course(String name, String duration) { this.name = name; this.duration = duration; }
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
}

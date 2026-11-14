package com.example.courseregistration;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<StudentRegistration, Long> {}

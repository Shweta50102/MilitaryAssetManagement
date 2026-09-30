package com.military.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.military.assetmanagement.entity.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

}

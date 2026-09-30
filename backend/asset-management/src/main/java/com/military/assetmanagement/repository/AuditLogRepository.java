package com.military.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.military.assetmanagement.entity.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}
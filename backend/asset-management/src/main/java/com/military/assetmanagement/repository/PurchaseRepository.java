package com.military.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.military.assetmanagement.entity.Purchase;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

}

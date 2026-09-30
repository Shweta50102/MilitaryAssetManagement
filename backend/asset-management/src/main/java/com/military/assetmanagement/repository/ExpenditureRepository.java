package com.military.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.military.assetmanagement.entity.Expenditure;

public interface ExpenditureRepository extends JpaRepository<Expenditure, Long> {

}

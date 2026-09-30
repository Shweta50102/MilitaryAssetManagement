package com.military.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.military.assetmanagement.entity.Base;

public interface BaseRepository extends JpaRepository<Base, Long> {

}

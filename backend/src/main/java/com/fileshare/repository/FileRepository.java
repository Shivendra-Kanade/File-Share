package com.fileshare.repository;

import com.fileshare.model.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {
    Optional<FileEntity> findByShareCode(String shareCode);
    List<FileEntity> findByUploadedByOrderByUploadedAtDesc(String uploadedBy);
    List<FileEntity> findAllByOrderByUploadedAtDesc();
}

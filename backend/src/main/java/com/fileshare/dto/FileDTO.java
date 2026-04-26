package com.fileshare.dto;

import java.time.LocalDateTime;

public class FileDTO {
    private Long id;
    private String originalFileName;
    private String fileType;
    private Long fileSize;
    private String shareCode;
    private LocalDateTime uploadedAt;
    private LocalDateTime expiresAt;
    private int downloadCount;
    private String uploadedBy;
    private String shareUrl;

    // Constructors
    public FileDTO() {}

    public FileDTO(Long id, String originalFileName, String fileType, Long fileSize,
                   String shareCode, LocalDateTime uploadedAt, LocalDateTime expiresAt,
                   int downloadCount, String uploadedBy, String shareUrl) {
        this.id = id;
        this.originalFileName = originalFileName;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.shareCode = shareCode;
        this.uploadedAt = uploadedAt;
        this.expiresAt = expiresAt;
        this.downloadCount = downloadCount;
        this.uploadedBy = uploadedBy;
        this.shareUrl = shareUrl;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOriginalFileName() { return originalFileName; }
    public void setOriginalFileName(String originalFileName) { this.originalFileName = originalFileName; }

    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }

    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }

    public String getShareCode() { return shareCode; }
    public void setShareCode(String shareCode) { this.shareCode = shareCode; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }

    public int getDownloadCount() { return downloadCount; }
    public void setDownloadCount(int downloadCount) { this.downloadCount = downloadCount; }

    public String getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(String uploadedBy) { this.uploadedBy = uploadedBy; }

    public String getShareUrl() { return shareUrl; }
    public void setShareUrl(String shareUrl) { this.shareUrl = shareUrl; }
}

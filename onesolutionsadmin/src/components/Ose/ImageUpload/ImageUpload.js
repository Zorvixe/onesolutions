import React, { useState } from "react";

const API_URL = "https://your-backend-domain.com/api/upload-image";

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setUploadedUrl(data.url);
    } else {
      alert("Upload failed");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uploadedUrl);
    setCopyMessage("Copied!");
    setTimeout(() => setCopyMessage(""), 1500);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />

      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload
      </button>

      {uploadedUrl && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={uploadedUrl}
            alt="preview"
            style={{
              width: "200px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />

          <div>
            <input
              type="text"
              value={uploadedUrl}
              readOnly
              style={{ width: "60%", padding: "5px" }}
            />

            <button onClick={copyToClipboard} style={{ marginLeft: "10px" }}>
              Copy Link
            </button>

            {copyMessage && <span style={{ marginLeft: "10px" }}>{copyMessage}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

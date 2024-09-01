import React, { useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAlert } from "../../providers/AlertContext"; 

const ProfilePictureModal = ({
  isOpen,
  onClose,
  userProfile,
  onProfilePictureUpdated,
}) => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const { showAlert } = useAlert(); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showAlert("يرجى تحميل ملف صورة صالح.", "warning");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        handleCrop(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = (imageSrc) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const minDim = Math.min(img.width, img.height); 
      const offsetX = (img.width - minDim) / 2;
      const offsetY = (img.height - minDim) / 2;
      canvas.width = minDim;
      canvas.height = minDim;
      ctx.drawImage(
        img,
        offsetX,
        offsetY,
        minDim,
        minDim,
        0,
        0,
        minDim,
        minDim,
      );
      const croppedImageUrl = canvas.toDataURL("image/png");
      setCroppedImage(croppedImageUrl);
    };

    img.src = imageSrc;
  };

  const handleSave = () => {
    if (!croppedImage) {
      showAlert(
        "كانت هناك مشكلة في اقتصاص الصورة. يرجى المحاولة مرة أخرى.",
        "warning",
      );
      return;
    }

    
    const updatedProfile = { ...userProfile, profile_picture: croppedImage };
    onProfilePictureUpdated(updatedProfile); 

    showAlert(`تم تحديث صورة الملف الشخصي بنجاح!`, "success");
    onClose(); 
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="profile-picture-modal-title"
      aria-describedby="profile-picture-modal-description"
    >
      <Box sx={styles.modal} style={{ direction: "ltr" }}>
        <Box sx={styles.header}>
          <Typography variant="h6" id="profile-picture-modal-title">
            تحديث صورة الملف الشخصي
          </Typography>
          <IconButton onClick={onClose} sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={styles.body}>
          {image && (
            <div
              style={{ position: "relative", width: "100%", height: "300px" }}
            >
              <img
                src={image}
                alt="Upload"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
              {croppedImage && (
                <img
                  src={croppedImage}
                  alt="Cropped"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Box>
        <Box sx={styles.footer}>
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            sx={styles.button}
          >
            إلغاء
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={styles.button}
          >
            حفظ
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    color: "text.secondary",
  },
  body: {
    mt: 2,
    textAlign: "center",
  },
  footer: {
    mt: 2,
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    ml: 1,
  },
};

export default ProfilePictureModal;

import { useState } from 'react';
import { Upload, User, X } from 'lucide-react';
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 8px;
  padding: 32px;
  margin-left: 15rem;
`;

const Title = styled.h3`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  margin-left: 6rem;
`;

const UploadArea = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.$hasImage ? 'transparent' : '#2a3647'};
  border: 2px solid #3d4f6b;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: #6366f1;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarPlaceholder = styled.div`
  color: #6b7a94;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ef4444;
  border: 2px solid #1a2332;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
    transform: scale(1.1);
  }
`;

const UploadContent = styled.div`
  flex: 1;
`;

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid #3d4f6b;
  border-radius: 6px;
  color: #e5e7eb;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 12px;

  &:hover {
    border-color: #6366f1;
    background: #2a3647;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadText = styled.p`
  color: #9ca3af;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  margin-left: 3.5rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props => props.$variant === 'primary' ? `
    background: #6366f1;
    color: white;

    &:hover {
      background: #5558e3;
    }

    &:disabled {
      background: #4b5563;
      cursor: not-allowed;
      opacity: 0.6;
    }
  ` : `
    background: transparent;
    color: #e5e7eb;
    border: 1px solid #3d4f6b;

    &:hover {
      background: #2a3647;
    }
  `}
`;

const ProfilePictureUpload = ({file, setFile, initialPreview}) => {
    const [preview, setPreview] = useState(initialPreview);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }

            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            const url = reader.readAsDataURL(selectedFile);
            console.log('File URL: ', url);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        setFile(null);
    };

    const handleCancel = () => {
        setPreview(null);
        setFile(null);
    };

    const handleUpdate = () => {
        if (file) {            
          // Add your upload logic here
            alert('Profile picture updated successfully!');
        }
    };

    return (
        <Container>
            <Title>Update profile picture</Title>

            <UploadArea>
                <AvatarContainer>
                    <Avatar $hasImage={!!preview}>
                        {preview ? (
                            <AvatarImage src={preview} alt="Profile preview" />
                        ) : (
                            <AvatarPlaceholder>
                                <User size={48} strokeWidth={1.5} />
                            </AvatarPlaceholder>
                        )}
                    </Avatar>
                    {preview && (
                        <RemoveButton onClick={handleRemove} type="button">
                            <X size={18} />
                        </RemoveButton>
                    )}
                </AvatarContainer>

                <UploadContent>
                    <UploadButton htmlFor="profile-upload">
                        <Upload size={18} />
                        Choose Image
                    </UploadButton>
                    <HiddenInput
                        id="profile-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handleFileChange}
                    />
                    <UploadText>
                        JPG, PNG or JPEG. Max size of 5MB.<br />
                        Recommended size: 400x400 pixels.
                    </UploadText>
                </UploadContent>
            </UploadArea>

            <ButtonGroup>
                <Button type="button" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button
                    type="button"
                    $variant="primary"
                    onClick={handleUpdate}
                    disabled={!file}
                >
                    Update picture
                </Button>
            </ButtonGroup>
        </Container>
    );
};

export default ProfilePictureUpload;
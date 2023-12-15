import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import { FaEdit, FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import './Banner.css';
const BannerTemplate = () => {
  const [modal, setModal] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerText, setBannerText] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [bannerWidth, setBannerWidth] = useState('auto');
  const [bannerHeight, setBannerHeight] = useState(80);
  const [bannerImage, setBannerImage] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [uploadedGifUrl, setUploadedGifUrl] = useState('https://media.tenor.com/NSohNhV84D8AAAAM/devarmadom-tharavad-tharavad.gif');

  const banners = [
    { text: 'Banner 1 Text', backgroundColor: '#007BFF', textColor: '#FFFFFF', width: 1000, height: 40 },
    { text: 'Banner 2 Text', backgroundColor: '#FF6347', textColor: '#FFFFFF', width: 1000, height: 40 },
    { text: 'Banner 3 Text', backgroundColor: '#32CD32', textColor: '#FFFFFF', width: 1000, height: 40 },
  ];

  const toggle = () => setModal(!modal);

  const handleEditClick = (index) => {
    setBannerIndex(index);
    setBannerText(banners[index].text);
    setBackgroundColor(banners[index].backgroundColor);
    setTextColor(banners[index].textColor);
    setBannerWidth(banners[index].width);
    setBannerHeight(banners[index].height);
    setBannerImage('');
    setUploadedImageUrl('');
    setUploadedGifUrl('');
    toggle();
  };

  const handleSaveChanges = () => {
    toggle();
  };

  const handleDownload = (format) => {
    const bannerElement = document.getElementById('banner');

    html2canvas(bannerElement).then((canvas) => {
      const dataUrl = canvas.toDataURL(format === 'gif' ? 'image/gif' : 'image/png');

      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = `banner.${format === 'gif' ? 'gif' : 'png'}`;
      document.body.appendChild(downloadLink);

      downloadLink.click();

      document.body.removeChild(downloadLink);
    });
  };

  const handlePrevBanner = () => {
    setBannerIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : banners.length - 1));
  };

  const handleNextBanner = () => {
    setBannerIndex((prevIndex) => (prevIndex < banners.length - 1 ? prevIndex + 1 : 0));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageUrl(reader.result);
        setBannerImage('');
        setUploadedGifUrl('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGifUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedGifUrl(reader.result);
        setBannerImage('');
        setUploadedImageUrl('');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div
        className="banner"
        id="banner"
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
          textAlign: 'center',
          padding: '10px',
          width: bannerWidth + 'px',
          height: bannerHeight + 'px',
          backgroundImage: uploadedImageUrl ? `url(${uploadedImageUrl})` : uploadedGifUrl ? `url(${uploadedGifUrl})` : bannerImage ? `url(${bannerImage})` : 'none',
          backgroundSize: 'cover',
        }}
      >
        <p style={{ margin: '0', fontSize: '16px' }}>{bannerText}</p>
      </div>
  

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Banner</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Enter new text for the banner"
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
          />
          <Input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
          <Input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Enter width (px)"
            value={bannerWidth}
            onChange={(e) => setBannerWidth(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Enter height (px)"
            value={bannerHeight}
            onChange={(e) => setBannerHeight(e.target.value)}
          />

          <FormGroup>
            <Label for="imageUpload">Upload Image:</Label>
            <Input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
          </FormGroup>

          <FormGroup>
            <Label for="gifUpload">Upload GIF:</Label>
            <Input type="file" id="gifUpload" accept="image/gif" onChange={handleGifUpload} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>


      <div className="banner-buttons ">
      <Button onClick={() => handleEditClick(bannerIndex)}>
        <FaEdit /> Edit Banner
      </Button>
        <Button onClick={() => handleDownload('png')}>
          <FaDownload /> Image Format
        </Button>
        <Button onClick={() => handleDownload('gif')}>
          <FaDownload /> GIF Format
        </Button>
      </div>
    </div>
  );
};

export default BannerTemplate;

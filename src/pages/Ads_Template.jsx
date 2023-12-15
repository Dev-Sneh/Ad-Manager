import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './AdsTemplate.css';
import BannerTemplate from './BannerTemplate';

const Ads_Template = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('card');
  const [cardData, setCardData] = useState([
    { id: 1, imageUrl: 'https://picsum.photos/200/300', title: 'Card Title 1', text: 'Card 1 Text' },
    { id: 2, imageUrl: 'https://picsum.photos/200/301', title: 'Card Title 2', text: 'Card 2 Text' },
    { id: 3, imageUrl: 'https://picsum.photos/200/302', title: 'Card Title 3', text: 'Card 3 Text' },
    { id: 4, imageUrl: 'https://picsum.photos/200/303', title: 'Card Title 4', text: 'Card 4 Text' },
  ]);

  const [editModal, setEditModal] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);
  const [editedCardData, setEditedCardData] = useState({ title: '', text: '', imageUrl: '' });

  const cardRef = useRef(null);

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  const handleCardTextChange = (id, newText) => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.id === id ? { ...card, text: newText } : card
      )
    );
  };

  const handleCardTitleChange = (id, newTitle) => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.id === id ? { ...card, title: newTitle } : card
      )
    );
  };

  // const handleEditClick = (id) => {
  //   const selectedCard = cardData.find((card) => card.id === id);
  //   setEditingCardId(id);
  //   setEditedCardData({ title: selectedCard.title, text: selectedCard.text, imageUrl: selectedCard.imageUrl });
  //   setEditModal(true);
  // };

  const handleEditClick = (id) => {
    const selectedCard = cardData.find((card) => card.id === id);
    setEditingCardId(id);
    setEditedCardData({ title: selectedCard.title, text: selectedCard.text, imageUrl: selectedCard.imageUrl });
    setEditModal(true);
  };

  const handleCancelEdit = () => {
    setEditModal(false);
    setEditingCardId(null);
    setEditedCardData({ title: '', text: '', imageUrl: '' });
  };
  const handleDownload = (id) => {
    const cardElement = document.querySelector(`#card-${id}`);

    if (cardElement) {
      html2canvas(cardElement).then((canvas) => {
        const dataUrl = canvas.toDataURL('image/png');
        saveAs(dataUrl, `template_${selectedTemplate}_${id}.png`);
      });
    }
  };

  const handleSaveEdit = () => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.id === editingCardId
          ? { ...card, title: editedCardData.title, text: editedCardData.text, imageUrl: editedCardData.imageUrl }
          : card
      )
    );
    setEditModal(false);
  };

  // const handleCancelEdit = () => {
  //   setEditModal(false);
  //   setEditedCardData({ title: '', text: '', imageUrl: '' }); 
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedCardData({ ...editedCardData, imageUrl: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-content">
   
      <div>
        <h2 className="templates-heading text-center">Card Templates</h2>
        <div className="ads-designs">
          {cardData.map((card) => (
            <div key={card.id} className="card-container">
              <div className="card" style={{ marginTop: '15px' }} id={`card-${card.id}`}>
                <div className="card-front">
                  <img className="card-img-top" src={card.imageUrl} alt={`Card ${card.id}`} />
                  <div className="card-body">
                    <h5 className="card-title">
                      {editingCardId === card.id ? (
                        <Input
                          type="text"
                          value={editedCardData.title}
                          onChange={(e) => setEditedCardData({ ...editedCardData, title: e.target.value })}
                        />
                      ) : (
                        card.title
                      )}
                    </h5>
                    <p className="card-text">
                      {editingCardId === card.id ? (
                        <Input
                          type="text"
                          value={editedCardData.text}
                          onChange={(e) => setEditedCardData({ ...editedCardData, text: e.target.value })}
                        />
                      ) : (
                        card.text
                      )}
                    </p>
                    <div className="button-container">
                      <Button onClick={() => handleEditClick(card.id)} className="btn btn-primary edit-button">
                        <i className="fas fa-pencil-alt"></i> Edit
                      </Button>
                      <Button onClick={() => handleDownload(card.id)} className="btn btn-primary download-button">
                        <i className="fas fa-download"></i> Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 className="banner-heading text-center">Banner Templates</h2>
        <BannerTemplate />
      </div>
      <Modal isOpen={editModal} toggle={handleCancelEdit}>
        <ModalHeader toggle={handleCancelEdit}>Edit Card</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={editedCardData.title}
            onChange={(e) => setEditedCardData({ ...editedCardData, title: e.target.value })}
          />
          <Input
            type="text"
            value={editedCardData.text}
            onChange={(e) => setEditedCardData({ ...editedCardData, text: e.target.value })}
          />
          {selectedTemplate === 'card' && (
            <Input type="file" onChange={handleImageUpload} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveEdit}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={handleCancelEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Ads_Template;

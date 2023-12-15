import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import './AdsTemplate.css';

const Ads_Template = () => {
  const [showDesigns, setShowDesigns] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('card'); // Default to 'card'
  const [cardData, setCardData] = useState([
    { id: 1, imageUrl: 'https://picsum.photos/200/300', title: 'Card Title 1', text: 'Card 1 Text' },
    { id: 2, imageUrl: 'https://picsum.photos/200/301', title: 'Card Title 2', text: 'Card 2 Text' },
    // Add more card templates as needed
  ]);

  const [editModal, setEditModal] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);
  const [editedCardData, setEditedCardData] = useState({ title: '', text: '', imageUrl: '' });

  const cardRef = useRef(null);

  const handleButtonClick = () => {
    setShowDesigns(!showDesigns);
  };

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

  const handleEditClick = (id) => {
    const selectedCard = cardData.find((card) => card.id === id);
    setEditingCardId(id);
    setEditedCardData({ title: selectedCard.title, text: selectedCard.text, imageUrl: selectedCard.imageUrl });
    setEditModal(true);
  };

  const handleDownload = (id) => {
    const selectedCard = cardData.find((card) => card.id === id);

    const downloadContainer = document.createElement('div');
    downloadContainer.style.width = '12rem';

    const imageElement = document.createElement('img');
    imageElement.src = selectedCard.imageUrl;
    imageElement.alt = `Card ${id}`;

    const titleElement = document.createElement('h5');
    titleElement.innerText = selectedCard.title;

    const textElement = document.createElement('p');
    textElement.innerText = selectedCard.text;

    downloadContainer.appendChild(imageElement);
    downloadContainer.appendChild(titleElement);
    downloadContainer.appendChild(textElement);

    document.body.appendChild(downloadContainer);

    html2canvas(downloadContainer).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      saveAs(dataUrl, `template_${selectedTemplate}_${id}.png`);

      document.body.removeChild(downloadContainer);
    });
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
    setEditingCardId(null);
    setEditedCardData({ title: '', text: '', imageUrl: '' });
  };

  const handleCancelEdit = () => {
    setEditModal(false);
    setEditingCardId(null);
    setEditedCardData({ title: '', text: '', imageUrl: '' });
  };

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
    <div className='page-content'>
      <h1 className="ads-heading text-center">Your Heading</h1>
      <div>
        <Button style={{ marginTop: '15px' }} onClick={handleButtonClick} color="primary">
          Show Designs
        </Button>

        <Button onClick={() => handleTemplateChange('card')} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
          Card Template
        </Button>

        <Button onClick={() => handleTemplateChange('banner')} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
          Banner Template
        </Button>

        {showDesigns && (
          <Row className="ads-designs">
            {cardData.map((card) => (
              <Col key={card.id} sm="4" md="3">
                <div className="card" style={{ width: '12rem', marginTop: '15px' }} ref={cardRef}>
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
                    <Button onClick={() => handleEditClick(card.id)} className="btn btn-primary">
                      Edit
                    </Button>
                    <Button onClick={() => handleDownload(card.id)} className="btn btn-primary">
                      Download
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        {/* Edit Modal */}
        <Modal isOpen={editModal} toggle={handleCancelEdit}>
          <ModalHeader toggle={handleCancelEdit}>Edit {selectedTemplate === 'card' ? 'Card' : 'Banner'}</ModalHeader>
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
            <Input type="file" onChange={handleImageUpload} />
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
    </div>
  );
};

export default Ads_Template;

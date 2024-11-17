const App = () => {
    const [showCards, setShowCards] = React.useState(false);
    const [cardVisible, setCardVisible] = React.useState(Array(6).fill(false));
    const [buttonsVisible, setButtonsVisible] = React.useState(true);
    const [showGallery, setShowGallery] = React.useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);

    // Placeholder images for testing
    const photos = [
        'https://via.placeholder.com/250x150.png?text=Photo+1',
        'https://via.placeholder.com/250x150.png?text=Photo+2',
        'https://via.placeholder.com/250x150.png?text=Photo+3',
        'https://via.placeholder.com/250x150.png?text=Photo+4',
        'https://via.placeholder.com/250x150.png?text=Photo+5',
        'https://via.placeholder.com/250x150.png?text=Photo+6'
    ];

    const showCustomAlert = (message) => {
        const alertBox = document.createElement('div');
        alertBox.className = 'custom-alert';
        alertBox.innerHTML = `
            <div class="alert-content">${message}</div>
            <div class="alert-close">×</div>
            <div class="alert-progress"></div>
        `;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.classList.add('show');
        }, 10);

        const progressBar = alertBox.querySelector('.alert-progress');
        let progress = 0;
        const intervalId = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(intervalId);
                alertBox.classList.remove('show');
                setTimeout(() => alertBox.remove(), 300);
            }
        }, 30);

        alertBox.querySelector('.alert-close').addEventListener('click', () => {
            clearInterval(intervalId);
            alertBox.classList.remove('show');
            setTimeout(() => alertBox.remove(), 300);
        });
    };

    const copyKey = () => {
        navigator.clipboard.writeText('Collapse');
        showCustomAlert('Key copied to clipboard!');
    };

    const downloadCollapse = () => {
        const link = document.createElement('a');
        link.href = 'collapse.zip';
        link.download = 'collapse.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showCustomAlert('Download started!');
    };

    const openDiscord = () => {
        const newWindow = window.open('about:blank', '_blank', 'width=800,height=600');
        
        newWindow.document.write('<iframe src="https://example.com" style="width:100%;height:100%;border:none;"></iframe>');
        
        const closeButton = newWindow.document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.position = 'fixed';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.zIndex = '10000';
        
        closeButton.onclick = () => newWindow.close();
        
        newWindow.document.body.appendChild(closeButton);
        
        showCustomAlert('Opening Discord...');
    };

    
// Scroll down button functionality
const scrollToBottom = () => {
      setShowCards(true);
      cardVisible.forEach((_, index) => {
          setTimeout(() => {
              setCardVisible(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
              });
          }, index * 300);
      });

      // Show gallery after all cards are visible
      setTimeout(() => {
          setShowGallery(true);
      }, (cardVisible.length * 300) + 500);
};

const nextPhoto = () => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
};

const prevPhoto = () => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
};

// Mouse dot effect
React.useEffect(() => {
      const dot = document.createElement('div');
      dot.id = 'cursor-dot';
      document.body.appendChild(dot);

      let dotX = 0;
      let dotY = 0;

      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
      };

      document.addEventListener('mousemove', handleMouseMove);

      function updateDotPosition() {
          const dx = mouseX - dotX;
          const dy = mouseY - dotY;

          dotX += dx * 0.08;
          dotY += dy * 0.08;

          dot.style.left = `${dotX}px`;
          dot.style.top = `${dotY}px`;

          requestAnimationFrame(updateDotPosition);
      }

      updateDotPosition();

      return () => document.body.removeChild(dot);
}, []);

const cards = [
      { image: 'https://via.placeholder.com/250x150.png?text=Fortnite', tip: 'Supports multiple games' },
      { image: 'https://via.placeholder.com/250x150.png?text=Roblox', tip: 'Customizable design' },
      { image: 'https://via.placeholder.com/250x150.png?text=CS2', tip: 'Customer support available' },
      { image: 'https://via.placeholder.com/250x150.png?text=Game+5', tip: 'Supports all devices' },
      { image: 'https://via.placeholder.com/250x150.png?text=Game+6', tip: 'Aimbot and Trigger lock' },
      { image: 'https://via.placeholder.com/250x150.png?text=Game+7', tip: 'Check our discord for help' },
];

return (
      <div className="container">
          <img src="https://i.ibb.co/JnZFJfH/logo.png" alt="Logo" className="logo" />
          
          <div className={`button-container ${buttonsVisible ? '' : 'fade-out'}`}>
              <button className="button key-button" onClick={copyKey}>Key</button>
              <button className="button download-button large-button" onClick={downloadCollapse}>Download Collapse</button>
              <button className="button discord-button" onClick={openDiscord}>Discord</button>
          </div>

          <div className={`divider ${showCards ? 'visible' : ''}`} />

          <button className="scroll-button" onClick={scrollToBottom}>↓ Scroll Down</button>

          <div className="scrollable-content">
              {showCards && (
                  <div className="card-container">
                      {cards.map((card, index) => (
                          <div key={index} className={`card ${cardVisible[index] ? 'visible' : ''}`}>
                              <img src={card.image} alt={`Tip ${index + 1}`} />
                              <p>{card.tip}</p>
                          </div>
                      ))}
                  </div>
              )}
              
              {showGallery && (
                  <>
                      <div className="divider visible" />
                      <div className="gallery">
                          <button className="gallery-button" onClick={prevPhoto}>←</button>
                          <img src={photos[currentPhotoIndex]} alt={`Gallery Photo ${currentPhotoIndex + 1}`} className="gallery-image" />
                          <button className="gallery-button" onClick={nextPhoto}>→</button>
                      </div>
                  </>
              )}
          </div>
      </div>
);

};

ReactDOM.render(<App />, document.getElementById('root'));
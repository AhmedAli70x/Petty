document.addEventListener('DOMContentLoaded', () => {
    //card options
    const cardArray = [
      {
        name: 'act1',
        img: 'quizImages/1.jpg'
      },
      {
        name: 'act2',
        img: 'quizImages/2.jpg'
      },
      {
        name: 'act3',
        img: 'quizImages/3.jpg'
      },
      {
        name: 'act4',
        img: 'quizImages/4.jpg'
      },
      {
        name: 'act5',
        img: 'quizImages/5.jpg'
      },
      {
        name: 'act6',
        img: 'quizImages/6.jpg'
      },
      {
        name: 'act1',
        img: 'quizImages/1.jpg'
      },
      {
        name: 'act2',
        img: 'quizImages/2.jpg'
      },
      {
        name: 'act3',
        img: 'quizImages/3.jpg'
      },
      {
        name: 'act4',
        img: 'quizImages/4.jpg'
      },
      {
        name: 'act5',
        img: 'quizImages/5.jpg'
      },
      {
        name: 'act6',
        img: 'quizImages/6.jpg'
      }
    ]
  
    cardArray.sort(() => 0.5 - Math.random())
  
    const grid = document.querySelector('.grid')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
  
    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'quizImages/blank.jpg')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
      }
    }

    //check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'quizImages/blank.jpg')
        cards[optionTwoId].setAttribute('src', 'quizImages/blank.jpg')
        document.querySelector(".msg").innerHTML =  "<h4>You have clicked the same image!</h4>"
        // alert('You have clicked the same image!')
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        document.querySelector(".msg").innerHTML =  "<h4>You found a match ^_^</h4>"

        cards[optionOneId].setAttribute('src', 'quizImages/white.png')
        cards[optionTwoId].setAttribute('src', 'quizImages/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
      } else {
        cards[optionOneId].setAttribute('src', 'quizImages/blank.jpg')
        cards[optionTwoId].setAttribute('src', 'quizImages/blank.jpg')
        document.querySelector(".msg").innerHTML =  "<h4>Sorry, try again -_- </h4>"
     
      }
      cardsChosen = []
      cardsChosenId = []
      console.log(cardsWon.length)
      if  (cardsWon.length === cardArray.length/2) {
        document.querySelector(".msg").innerHTML =  "<h4>Congratulations! You found them all!</h4>"
      }
    }
  
    //flip your card
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 500)
      }
    }
  
    createBoard()
  })
  
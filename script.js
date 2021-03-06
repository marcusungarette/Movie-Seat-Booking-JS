const container = document.querySelector('.container');
// Only select the available seats in the row
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = parseInt(movieSelect.value);

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
// Put the selected seats into a nodelist called selectedSeats
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  // ****Store in the localstorage**** (spread Operator)
  // Copy selected seats into array
  // Map through array
  // Return a new array indexes

  const seatsIndex = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

// Get data from localStorage and Populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      //Greater then -1 that means its there
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie Select Event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat Click Event
container.addEventListener('click', e => {
  // Make sure when click on the available seats works
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // Turn the seats available into selected seats
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total saves when page refresh
updateSelectedCount();

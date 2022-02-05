'run strict';
console.log('Star Wars Project');
// Loader

const loader = document.querySelector('#loader');
loader.style.display = 'none';

// Calling html elements

let peopleBtn = document.getElementById('peopleBtn');
let shipsBtn = document.getElementById('shipsBtn');

// Pagination main div

const paginationButtonContainer = document.createElement('div');
paginationButtonContainer.className = 'pagination-buttons hidden ';

// Calling html to remove or add class list

let peopleHidden = document.querySelector('.people_hidden');
let shipsHidden = document.querySelector('.ship_hidden');
let paginationHidden = document.querySelector('.pagination-button hidden');

// For Ships List
// Calling click events
shipsBtn.addEventListener('click', function() {
    shipsHidden.classList.remove('ship_hidden');
    tbody_ships.innerHTML = '';
    peopleHidden.classList.add('people_hidden');
    getShips('https://swapi.dev/api/starships/?page=1');
    paginationButtonContainer.classList.remove('hidden');
    paginationButtonContainer.style.marginTop = '180px';
    document.querySelector('#loader').style.display = 'block';
});

// Calling API For Ships
function getShips(apiParameter) {
    let shipsUrl = apiParameter;
    fetch(shipsUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('The request seceded');
            console.log(data);
            loopingApi(data);
            document.querySelector('#loader').style.display = 'none';
        })
        .catch(function(err) {
            console.log('The request has failed');
            console.log(err);
        });

    function loopingApi(data) {
        for (let i = 0; i < data.results.length; i++) {
            printResultShips(
                data.results[i].name,
                data.results[i].model,
                data.results[i].manufacturer,
                data.results[i].cost_in_credits,
                data.results[i].passengers,
                data.results[i].starship_class,
                data.results[i].crew
            );
            console.log(data.results.length);
        }
    }
}

// Creating the table
let table_ships = document.createElement('table');
let thead_ships = document.createElement('thead');
let tbody_ships = document.createElement('tbody');

// Table ships styles

table_ships.appendChild(thead_ships);
table_ships.appendChild(tbody_ships);

// Adding the table to the "div with id result"
document.getElementById('result_ships').appendChild(table_ships);

// Creating the table inner Header

let row_1_ships = document.createElement('tr');
let heading_1_ships = document.createElement('th');
let heading_2_ships = document.createElement('th');
let heading_3_ships = document.createElement('th');
let heading_4_ships = document.createElement('th');
let heading_5_ships = document.createElement('th');
let heading_6_ships = document.createElement('th');

// Adding the table tr of Header to the HTML

row_1_ships.appendChild(heading_1_ships);
row_1_ships.appendChild(heading_2_ships);
row_1_ships.appendChild(heading_3_ships);
row_1_ships.appendChild(heading_4_ships);
row_1_ships.appendChild(heading_5_ships);
row_1_ships.appendChild(heading_6_ships);
thead_ships.appendChild(row_1_ships);

// Naming the Headers

heading_1_ships.innerHTML += 'Name';
heading_2_ships.innerHTML += 'Model';
heading_3_ships.innerHTML += 'Manufacturer';
heading_4_ships.innerHTML += 'Cost';
heading_5_ships.innerHTML += 'People Capacity';
heading_6_ships.innerHTML += 'Class';

// Creating columns

const printResultShips = function(
    name,
    modal,
    manufacturer,
    cost_in_credits,
    passengers,
    starship_class,
    crew
) {
    tbody_ships.innerHTML += '';
    tbody_ships.innerHTML += `
            <td>${name}</td>
            <td>${modal}</td>
            <td>${manufacturer}</td>
            <td> ${cost_in_credits} credits</td>
            <td>Passengers: ${passengers} - Crew: ${crew}</td>
            <td>${starship_class}</td>
        `;
};

// Calling click events for people
peopleBtn.addEventListener('click', function() {
    tbody.innerHTML = '';
    shipsHidden.classList.add('ship_hidden');
    peopleHidden.classList.remove('people_hidden');
    getPeople('https://swapi.dev/api/people/?page=1');
    paginationButtonContainer.classList.remove('hidden');
    paginationButtonContainer.style.marginTop = '20px';
    document.querySelector('#loader').style.display = 'block';
});

// Calling API For People
function getPeople(apiParameter) {
    let peopleUrl = apiParameter;
    fetch(peopleUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('The request seceded');
            console.log(data);
            loopingApi(data);
            document.querySelector('#loader').style.display = 'none';
        })
        .catch(function(err) {
            console.log('The request has failed');
            console.log(err);
        });

    function loopingApi(data) {
        for (let i = 0; i < data.results.length; i++) {
            printResult(
                data.results[i].name,
                data.results[i].height,
                data.results[i].mass,
                data.results[i].gender,
                data.results[i].birth_year,
                data.results[i].films.length
            );
        }
    }
}

// Creating the table
let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

// Adding the table to the "div with id result"
document.getElementById('result').appendChild(table);

// Creating the table inner Header

let row_1 = document.createElement('tr');
let heading_1 = document.createElement('th');
let heading_2 = document.createElement('th');
let heading_3 = document.createElement('th');
let heading_4 = document.createElement('th');
let heading_5 = document.createElement('th');
let heading_6 = document.createElement('th');

// Adding the table tr of Header to the HTML

row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
row_1.appendChild(heading_4);
row_1.appendChild(heading_5);
row_1.appendChild(heading_6);
thead.appendChild(row_1);

// Naming the Headers

heading_1.innerHTML += 'Name';
heading_2.innerHTML += 'Height';
heading_3.innerHTML += 'Mass';
heading_4.innerHTML += 'Gender';
heading_5.innerHTML += 'Birth Year';
heading_6.innerHTML += 'Appearances';

// Creating columns

const printResult = function(name, height, mass, gender, birth_year, films) {
    tbody.innerHTML += '';
    tbody.innerHTML += `
            <td>${name}</td>
            <td>${height} cm</td>
            <td>${mass} kg</td>
            <td>${gender}</td>
            <td>${birth_year}</td>
            <td>${films}</td>
        `;
};

// Pagination

const pageNumbers = (total, max, current) => {
    const half = Math.floor(max / 2);
    let to = max;

    if (current + half >= total) {
        to = total;
    } else if (current > half) {
        to = current + half;
    }

    let from = Math.max(to - max, 0);

    return Array.from({ length: Math.min(total, max) }, (_, i) => i + 1 + from);
};

function PaginationButton(totalPages, maxPagesVisible = 9, currentPage = 1) {
    let pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
    let currentPageBtn = null;
    const buttons = new Map();
    const disabled = {
        start: () => pages[0] === 1,
        prev: () => currentPage === 1 || currentPage > totalPages,
        end: () => pages.slice(-1)[0] === totalPages,
        next: () => currentPage >= totalPages,
    };
    const frag = document.createDocumentFragment();

    const createAndSetupButton = (
        label = '',
        cls = '',
        disabled = false,
        handleClick
    ) => {
        const buttonElement = document.createElement('button');

        buttonElement.textContent = label;
        buttonElement.className = `page-btn ${cls}`;
        buttonElement.disabled = disabled;
        buttonElement.addEventListener('click', e => {
            handleClick(e);
            this.update();
            paginationButtonContainer.value = currentPage;
            paginationButtonContainer.dispatchEvent(
                new CustomEvent('change', { detail: { currentPageBtn } })
            );
        });

        return buttonElement;
    };

    const onPageButtonClick = e =>
        (currentPage = Number(e.currentTarget.textContent));

    const onPageButtonUpdate = index => btn => {
        btn.textContent = pages[index];

        if (pages[index] === currentPage) {
            currentPageBtn.classList.remove('active');
            btn.classList.add('active');
            currentPageBtn = btn;
            currentPageBtn.focus();
        }
    };

    buttons.set(
        createAndSetupButton(
            'start',
            'start-page',
            disabled.start(),
            () => (currentPage = 1)
        ),
        btn => (btn.disabled = disabled.start())
    );

    buttons.set(
        createAndSetupButton(
            'prev',
            'prev-page',
            disabled.prev(),
            () => (currentPage -= 1)
        ),
        btn => (btn.disabled = disabled.prev())
    );

    pages.map((pageNumber, index) => {
        const isCurrentPage = currentPage === pageNumber;
        const button = createAndSetupButton(
            pageNumber,
            isCurrentPage ? 'active' : '',
            false,
            onPageButtonClick
        );

        if (isCurrentPage) {
            currentPageBtn = button;
        }

        buttons.set(button, onPageButtonUpdate(index));
    });

    buttons.set(
        createAndSetupButton(
            'next',
            'next-page',
            disabled.next(),
            () => (currentPage += 1)
        ),
        btn => (btn.disabled = disabled.next())
    );

    buttons.set(
        createAndSetupButton(
            'end',
            'end-page',
            disabled.end(),
            () => (currentPage = totalPages)
        ),
        btn => (btn.disabled = disabled.end())
    );

    buttons.forEach((_, btn) => frag.appendChild(btn));
    paginationButtonContainer.appendChild(frag);

    this.render = (container = document.body) => {
        container.appendChild(paginationButtonContainer);
    };

    this.update = (newPageNumber = currentPage) => {
        currentPage = newPageNumber;
        pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
        buttons.forEach((updateButton, btn) => updateButton(btn));
    };

    this.onChange = handler => {
        paginationButtonContainer.addEventListener('change', handler);
    };
}

const paginationButtons = new PaginationButton(9, 5);

paginationButtons.render();

paginationButtons.onChange(e => {
    console.log('-- changed', e.target.value);
    if (e.target.value === 1) {
        tbody.innerHTML = '';
        tbody_ships.innerHTML = '';
        getPeople('https://swapi.dev/api/people/?page=1');
        getShips('https://swapi.dev/api/starships/?page=1');
        document.querySelector('#loader').style.display = 'block';
    }
    if (e.target.value === 2) {
        tbody.innerHTML = '';
        tbody_ships.innerHTML = '';
        getPeople('https://swapi.dev/api/people/?page=2');
        getShips('https://swapi.dev/api/starships/?page=2');
        document.querySelector('#loader').style.display = 'block';
    }
    if (e.target.value === 3) {
        tbody.innerHTML = '';
        tbody_ships.innerHTML = '';
        getPeople('https://swapi.dev/api/people/?page=3');
        getShips('https://swapi.dev/api/starships/?page=3');
        document.querySelector('#loader').style.display = 'block';
    }
    if (e.target.value === 4) {
        tbody.innerHTML = '';
        tbody_ships.innerHTML = '';
        getPeople('https://swapi.dev/api/people/?page=4');
        getShips('https://swapi.dev/api/starships/?page=4');
        document.querySelector('#loader').style.display = 'block';
    }
    if (e.target.value === 5) {
        tbody.innerHTML = '';
        tbody_ships.innerHTML = '';
        getPeople('https://swapi.dev/api/people/?page=5');
        document.querySelector('#loader').style.display = 'block';
    }
    if (e.target.value === 6) {
        tbody.innerHTML = '';
        tbody_ships.innerHTML = '';
        getPeople('https://swapi.dev/api/people/?page=6');
        document.querySelector('#loader').style.display = 'block';
    }
    if (e.target.value === 7) {
        tbody.innerHTML = '';
        tbody_ships.innerHTML = '';
        getPeople('https://swapi.dev/api/people/?page=7');
        document.querySelector('#loader').style.display = 'block';
    }
    if (e.target.value === 8) {
        tbody.innerHTML = '';
        tbody_ships.innerHTML = '';
        getPeople('https://swapi.dev/api/people/?page=8');
        document.querySelector('#loader').style.display = 'block';
    }
    if (e.target.value === 9) {
        tbody.innerHTML = '';
        tbody_ships.innerHTML = '';
        getPeople('https://swapi.dev/api/people/?page=9');
        document.querySelector('#loader').style.display = 'block';
    }
});

/* ── State ── */
let allWords     = [];
let displayWords = [];
let isSearching  = false;

/* ── Load words on page load ── */
document.addEventListener('DOMContentLoaded', function () {
    loadAllWords();
});

/* use fetch to load all words from DB */
function loadAllWords() {
    fetch("./api/admin/getAllWords.php", { method: "GET" })
    .then(res => res.json())
    .then(words => {
        allWords     = words;
        displayWords = words.slice(0, 5);
        isSearching  = false;
        renderTable();
    })
    .catch(function () {
        document.getElementById("message").innerText = "Could not load words.";
    });
}

/* render table */
function renderTable() {
    let tbody = document.getElementById('wordTableBody');

    if (displayWords.length === 0) {
        let msg = isSearching ? 'Word not found in the database.' : 'No words yet.';
        tbody.innerHTML = '<tr class="empty-row"><td colspan="3">' + msg + '</td></tr>';
        return;
    }

    let rows = '';
    for (let i = 0; i < displayWords.length; i++) {
        let w = displayWords[i];
        rows += '<tr id="row-' + w.id + '">'
            + '<td style="color:#aaa; width:36px;">' + (i + 1) + '</td>'
            + '<td>' + escapeHtml(w.word_name) + '</td>'
            + '<td style="width:120px;">'
            +   '<button class="deleteTableWord" onclick="deleteWord(' + w.id + ')">Delete</button>'
            + '</td>'
            + '</tr>';
    }
    tbody.innerHTML = rows;
}

/* search */
function searchWord() {
    let query = document.getElementById('searchInput').value.trim().toLowerCase();

    if (query === '') {
        document.getElementById("message").innerText = "Please type a word to search.";
        return;
    }

    isSearching  = true;
    displayWords = allWords.filter(function (w) {
        return w.word_name.toLowerCase().indexOf(query) !== -1;
    });

    renderTable();

    if (displayWords.length === 0) {
        document.getElementById("message").innerText = "Word not found in the database.";
    }
}

/* clear search */
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById("message").innerText = '';
    isSearching  = false;
    displayWords = allWords.slice(0, 5);
    renderTable();
}

/* delete word */
function deleteWord(id) {
    if (!confirm('Are you sure you want to delete this word?')) return;

    fetch('./api/admin/deleteGameWords.php', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("message").innerText = data.message;

        // remove from both arrays and re-render
        allWords     = allWords.filter(function (w) { return w.id !== id; });
        displayWords = displayWords.filter(function (w) { return w.id !== id; });

        renderTable();
    })
    .catch(function () {
        document.getElementById("message").innerText = "Failed to delete word.";
    });
}

/* helpers */
function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
    return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}